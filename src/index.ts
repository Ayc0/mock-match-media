import { match, parse, Feature, Query, MediaState } from "css-mediaquery";

let state: MediaState = {};

const getFeaturesFromQuery = (query: Query): Set<Feature> => {
    const parsedQuery = parse(query);
    const features = new Set<Feature>();
    parsedQuery.forEach((subQuery) => {
        subQuery.expressions.forEach((expression) => {
            features.add(expression.feature);
        });
    });
    return features;
};

type Listener = (event: MediaQueryListEvent) => void;
type MQL = ReturnType<typeof matchMedia>;

const MQLs = new Map<MQL, { clear: () => void; previousMatched: boolean; features: Set<Feature> }>();

export const matchMedia: typeof window.matchMedia = (query: string) => {
    let queryTyped = query as Query;
    let previousMatched;
    try {
        previousMatched = match(queryTyped, state);
    } catch (e) {
        queryTyped = "not all" as Query;
        previousMatched = false;
    }
    const listeners = new Set<Listener>();
    const looseCallbacks = new WeakSet<Listener>();

    const clear = () => {
        for (const listener of listeners) {
            looseCallbacks.delete(listener);
        }
        listeners.clear();
    };

    const mql: MQL = {
        get matches() {
            return match(queryTyped, state);
        },
        media: query,
        onchange: () => {},
        addEventListener: (event, callback) => {
            if (event === "change" && callback) listeners.add(callback);
        },
        removeEventListener: (event, callback) => {
            if (event === "change") listeners.delete(callback);
        },
        dispatchEvent: (event: MediaQueryListEvent) => {
            listeners.forEach((listener) => {
                if (event.type === "change" || looseCallbacks.has(listener)) listener(event);
            });
            // TODO: target and currentTarget
            // Object.defineProperty(event, "target", { value: mql });
            return true;
        },
        addListener: (callback) => {
            if (!callback) return;
            looseCallbacks.add(callback);
            listeners.add(callback);
        },
        removeListener: (callback) => {
            if (!callback) return;
            looseCallbacks.delete(callback);
            listeners.delete(callback!);
        },
    };

    MQLs.set(mql, {
        previousMatched,
        clear,
        features: getFeaturesFromQuery(queryTyped),
    });

    return mql;
};

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
export const setMedia = (media: Record<string, string>) => {
    const changedFeatures = new Set<Feature>();
    Object.keys(media).forEach((feature) => {
        changedFeatures.add(feature as Feature);
        state[feature] = media[feature];
    });
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
        const matches = match(MQL.media as Query, state);
        if (matches === cache.previousMatched) {
            continue;
        }
        cache.previousMatched = matches;
        MQL.dispatchEvent(new MediaQueryListEvent("change", { matches, media: MQL.media }));
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
