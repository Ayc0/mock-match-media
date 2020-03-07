import { match, parse, Feature, MediaState } from "css-mediaquery";

const state: Partial<MediaState> = {};
const MEDIA = Symbol("MEDIA");
const PREVIOUS_MATCH = Symbol("PREVIOUS_MATCH");

const getFeaturesFromQuery = (query: string) => {
    const parsedQuery = parse(query);
    const features = new Set<Feature>();
    parsedQuery.forEach(subQuery => {
        subQuery.expressions.forEach(expression => {
            features.add(expression.feature);
        });
    });
    return features;
};

type Listener = (event: MediaQueryListEvent) => void;
const listeners = new Map<Feature, Set<Listener>>();

const addListener = (query: string, callback: Listener) => {
    callback[MEDIA] = query;
    const features = getFeaturesFromQuery(query);
    features.forEach(feature => {
        if (!listeners.has(feature)) {
            listeners.set(feature, new Set<Listener>());
        }
        listeners.get(feature).add(callback);
    });
};

const removeListener = (query: string, callback: Listener) => {
    const features = getFeaturesFromQuery(query);
    features.forEach(feature => {
        if (!listeners.has(feature)) {
            return;
        }
        const listener = listeners.get(feature);
        if (!listener) {
            return;
        }
        listener.delete(callback);
    });
};

export const matchMedia: typeof window.matchMedia = (query: string) => {
    let matches;
    try {
        matches = match(query, state);
    } catch (e) {
        matches = false;
    }
    return {
        matches,
        media: query,
        onchange: () => {
            throw new Error("not supported");
        },
        addEventListener: (event, callback) => {
            if (event !== "change") {
                return;
            }
            callback[PREVIOUS_MATCH] = matches;
            addListener(query, callback);
        },
        removeEventListener: (event, callback) => {
            if (event !== "change") {
                return;
            }
            removeListener(query, callback);
        },
        dispatchEvent: () => {
            throw new Error("not supported");
        },
        addListener: callback => {
            callback[PREVIOUS_MATCH] = matches;
            addListener(query, callback);
        },
        removeListener: callback => removeListener(query, callback),
    };
};

const defaultEvent = {
    type: "match-media",
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    target: null,
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    initEvent: () => {},
    AT_TARGET: null,
    BUBBLING_PHASE: null,
    CAPTURING_PHASE: null,
    NONE: null,
    composedPath: () => [],
    preventDefault: () => {},
    stopImmediatePropagation: () => {},
    stopPropagation: () => {},
    returnValue: true,
    srcElement: null,
};

export const setMedia = (media: Partial<MediaState>) => {
    const changedFeatures = new Set<Feature>();
    Object.keys(media).forEach(feature => {
        changedFeatures.add(feature);
        state[feature] = media[feature];
    });
    changedFeatures.forEach(changedFeature => {
        const activeListeners = listeners.get(changedFeature);
        if (!activeListeners) {
            return;
        }
        activeListeners.forEach(listener => {
            const query = listener[MEDIA];
            const matches = match(query, state);
            const previousMatches = listener[PREVIOUS_MATCH];
            if (previousMatches !== matches) {
                listener({
                    ...defaultEvent,
                    timeStamp: Date.now(),
                    matches,
                    media: query,
                });
            }
            listener[PREVIOUS_MATCH] = matches;
        });
    });
};
