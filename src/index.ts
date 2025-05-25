import { compileQuery, matches, type Environment, type EvaluateResult, type SimplePerm } from "media-query-fns";

type MediaState = { [key in keyof Environment as key extends `${infer Key}Px` ? Key : key]?: Environment[key] };

const DEFAULT_ENV: Parameters<typeof matches>[1] = {
    widthPx: 0,
    deviceWidthPx: 0,
    heightPx: 0,
    deviceHeightPx: 0,
    dppx: 1,
};

const PIXEL_FEATURES = ["width", "height", "deviceWidth", "deviceHeight"];
const convertStateToEnv = (state: MediaState): Parameters<typeof matches>[1] => {
    const env = { ...DEFAULT_ENV };

    for (const [key, value] of Object.entries(state)) {
        if (PIXEL_FEATURES.includes(key)) {
            env[key + "Px"] = value;
        } else {
            env[key] = value;
        }
    }

    return env;
};

let state: MediaState = {};

type Feature = keyof MediaState;

const now = Date.now();

// Event was added in node 15, so until we drop the support for versions before it, we need to use this
class EventLegacy {
    type: "change";
    timeStamp: number;

    bubbles = false;
    cancelBubble = false;
    cancelable = false;
    composed = false;
    target = null;
    currentTarget = null;
    defaultPrevented = false;
    eventPhase = 0;
    isTrusted = false;
    initEvent = () => {};
    composedPath = () => [];
    preventDefault = () => {};
    stopImmediatePropagation = () => {};
    stopPropagation = () => {};
    returnValue = true;
    srcElement = null;
    // See https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
    NONE = 0;
    CAPTURING_PHASE = 1;
    AT_TARGET = 2;
    BUBBLING_PHASE = 3;
    constructor(type: "change") {
        this.type = type;
        this.timeStamp = Date.now() - now; // See https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp#value
    }
}

// @ts-expect-error
const EventCompat: typeof Event = typeof Event === "undefined" ? EventLegacy : Event;

const getFeaturesFromQuery = (query: EvaluateResult): Set<Feature> => {
    const features = new Set<Feature>();
    query.simplePerms.forEach((perm) => {
        Object.keys(perm).forEach((feature) => features.add(feature as Feature));
    });
    return features;
};

type Callback = (event: MediaQueryListEvent) => void;
type MQL = ReturnType<typeof matchMedia>;

const MQLs = new Map<MQL, { clear: () => void; previousMatched: boolean; features: Set<Feature> }>();

export const matchMedia: typeof window.matchMedia = (query: string) => {
    let compiledQuery = compileQuery(query);
    let previousMatched;
    try {
        previousMatched = matches(compiledQuery, convertStateToEnv(state));
    } catch (e) {
        compiledQuery = compileQuery("not all");
        previousMatched = false;
    }
    const callbacks = new Set<Callback>();
    const onces = new WeakSet<Callback>();

    const clear = () => {
        for (const callback of callbacks) {
            onces.delete(callback);
        }
        callbacks.clear();
    };

    const removeListener = (callback: Callback) => {
        callbacks.delete(callback);
        onces.delete(callback);
    };

    const mql: MQL = {
        get matches() {
            return matches(compiledQuery, convertStateToEnv(state));
        },
        media: query,
        onchange: null,
        addEventListener: (event, callback, options) => {
            if (event === "change" && callback) {
                const isAlreadyListed = callbacks.has(callback);
                callbacks.add(callback);

                const hasOnce = typeof options === "object" && options?.once;

                // If it doesn’t have `once: true`, but it was previously added with one, the `once` status should be lifted
                if (!hasOnce) {
                    onces.delete(callback);
                    return;
                }

                // If the callback is already listed in the list of callback to call, but not as a `once`,
                // it means that it was added without the flag and thus shouldn’t be treated as such.
                if (isAlreadyListed && !onces.has(callback)) {
                    return;
                }

                // Otherwise, use the `once` flag
                onces.add(callback);
            }
        },
        removeEventListener: (event, callback) => {
            if (event === "change") removeListener(callback);
        },
        dispatchEvent: (event: MediaQueryListEvent) => {
            if (!event) {
                throw new TypeError(
                    `Failed to execute 'dispatchEvent' on 'EventTarget': 1 argument required, but only 0 present.`,
                );
            }
            if (!(event instanceof EventCompat)) {
                throw new TypeError(
                    `Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.`,
                );
            }
            if (event.type !== "change") {
                return true;
            }
            mql.onchange?.(event);
            callbacks.forEach((callback) => {
                callback(event);
                if (onces.has(callback)) {
                    removeListener(callback);
                }
            });
            // TODO: target and currentTarget
            // Object.defineProperty(event, "target", { value: mql });
            return true;
        },
        addListener: (callback) => {
            if (!callback) return;
            callbacks.add(callback);
        },
        removeListener: (callback) => {
            if (!callback) return;
            removeListener(callback);
        },
    };

    MQLs.set(mql, {
        previousMatched,
        clear,
        features: getFeaturesFromQuery(compiledQuery),
    });

    return mql;
};

export class MediaQueryListEvent extends EventCompat {
    readonly media: string;
    readonly matches: boolean;
    constructor(
        type: "change",
        options: {
            media?: string;
            matches?: boolean;
        } = {},
    ) {
        super(type);
        this.media = options.media || "";
        this.matches = options.matches || false;
    }
}

// Cannot use MediaState here as setMedia is exposed in the API
export const setMedia = (media: MediaState) => {
    const changedFeatures = new Set<Feature>();
    Object.keys(media).forEach((feature) => {
        changedFeatures.add(feature as Feature);
        state[feature] = media[feature];
    });

    // If we are trying to change the `width` but not the `deviceWidth`
    if ((changedFeatures.has("width") || changedFeatures.has("dppx")) && !changedFeatures.has("deviceWidth")) {
        state.deviceWidth = (state.width ?? DEFAULT_ENV.widthPx) * (state.dppx ?? DEFAULT_ENV.dppx);
        changedFeatures.add("deviceWidth");
    }
    // If we are trying to change the `height` but not the `deviceHeight`
    if ((changedFeatures.has("height") || changedFeatures.has("dppx")) && !changedFeatures.has("deviceHeight")) {
        state.deviceHeight = (state.height ?? DEFAULT_ENV.heightPx) * (state.dppx ?? DEFAULT_ENV.dppx);
        changedFeatures.add("deviceHeight");
    }

    for (const [MQL, cache] of MQLs) {
        let found = false;
        for (const feature of cache.features) {
            if (changedFeatures.has(feature)) {
                found = true;
                break;
            }
        }
        if (!found) {
            continue;
        }
        const doesMatch = matches(compileQuery(MQL.media), convertStateToEnv(state));
        if (doesMatch === cache.previousMatched) {
            continue;
        }
        cache.previousMatched = doesMatch;
        MQL.dispatchEvent(new MediaQueryListEvent("change", { matches: doesMatch, media: MQL.media }));
    }
};

export const cleanupListeners = () => {
    for (const { clear } of MQLs.values()) {
        clear();
    }
    MQLs.clear();
};

export const cleanupMedia = () => {
    state = {};
};

export const cleanup = () => {
    cleanupListeners();
    cleanupMedia();
};
