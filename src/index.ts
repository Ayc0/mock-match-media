import { match, parse, Feature } from "css-mediaquery";

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

const state: Record<string, string> = {};

export const matchMedia: typeof window.matchMedia = (query: string) => ({
    matches: match(query, state),
    media: query,
    onchange: () => {
        throw new Error("not supported");
    },
    addEventListener: (event, callback) => {
        if (event !== "change") {
            return;
        }
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
    addListener: callback => addListener(query, callback),
    removeListener: callback => removeListener(query, callback),
});
