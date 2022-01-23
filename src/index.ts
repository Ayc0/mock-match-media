import { match, parse, Feature, Query, MediaState } from "css-mediaquery";

let state: MediaState = {};

const getFeaturesFromQuery = (query: Query) => {
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
const listeners = new Map<Feature, Set<Listener>>();
let ListenerQueriesMatchesMap = new WeakMap<Listener, Map<Query, boolean>>();
function getQueryMatchMap(listener: Listener): Map<Query, boolean> {
    let queryMatchMap = ListenerQueriesMatchesMap.get(listener);
    if (!queryMatchMap) {
        queryMatchMap = new Map();
        ListenerQueriesMatchesMap.set(listener, queryMatchMap);
    }
    return queryMatchMap;
}

const addListener = (query: Query, callback: Listener) => {
    const features = getFeaturesFromQuery(query);
    features.forEach((feature) => {
        let listener = listeners.get(feature);
        if (!listener) {
            listener = new Set<Listener>();
            listeners.set(feature, listener);
        }
        listener.add(callback);
    });
};

const removeListener = (query: Query, callback: Listener) => {
    const features = getFeaturesFromQuery(query);
    features.forEach((feature) => {
        const listener = listeners.get(feature);
        if (!listener) {
            return;
        }
        listener.delete(callback);
    });
};

export const matchMedia: typeof window.matchMedia = (query: string) => {
    let queryTyped = query as Query;
    let initiallyMatched;
    try {
        initiallyMatched = match(queryTyped, state);
    } catch (e) {
        queryTyped = "not all" as Query;
        initiallyMatched = false;
    }
    return {
        get matches() {
            return match(queryTyped, state);
        },
        media: query,
        onchange: () => {
            throw new Error("not supported");
        },
        addEventListener: (event, callback) => {
            if (event !== "change") {
                return;
            }
            const queryMatchMap = getQueryMatchMap(callback);
            queryMatchMap.set(queryTyped, initiallyMatched);
            addListener(queryTyped, callback);
        },
        removeEventListener: (event, callback) => {
            if (event !== "change") {
                return;
            }
            removeListener(queryTyped, callback);
        },
        dispatchEvent: () => {
            throw new Error("not supported");
        },
        addListener: (callback) => {
            const queryMatchMap = getQueryMatchMap(callback!);
            queryMatchMap.set(queryTyped, initiallyMatched);
            addListener(queryTyped, callback!);
        },
        removeListener: (callback) => removeListener(queryTyped, callback!),
    };
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

export class MediaQueryListEvent extends EventLegacy {
    media: string;
    matches: boolean;
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
    changedFeatures.forEach((changedFeature) => {
        const activeListeners = listeners.get(changedFeature);
        if (!activeListeners) {
            return;
        }
        activeListeners.forEach((listener) => {
            const queryMatchMap = getQueryMatchMap(listener);
            for (const [query, previousMatches] of queryMatchMap.entries()) {
                const matches = match(query, state);
                if (previousMatches !== matches) {
                    const event = new MediaQueryListEvent("change", {
                        matches,
                        media: query,
                    });
                    listener(event);
                }
                queryMatchMap.set(query, matches);
            }
        });
    });
};

export const cleanupListeners = () => {
    listeners.clear();
    // .clear() doesn't exist on weak maps
    ListenerQueriesMatchesMap = new WeakMap();
};

export const cleanupMedia = () => {
    state = {};
};

export const cleanup = () => {
    cleanupListeners();
    cleanupMedia();
};
