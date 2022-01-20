declare module "css-mediaquery" {
    /**
     * A query is a string like `(min-width: 50px), (max-height: 250px)`
     */
    export type Query = string & { __type: "media" };
    /**
     * Meaningful unit that composes queries.
     *
     * For instance, on query like `(min-width: 50px), (max-height: 250px)`, there are 2 features:
     * - `width`
     * - `height`
     */
    export type Feature = string & { __type: "feature" };

    export type MediaState = Record<Feature, string>;
    type Match = (query: Query, state: MediaState) => boolean;
    export const match: Match;

    type Expression = {
        feature: Feature;
        modifier?: string;
        value: string;
    };
    type MatchedMedia = {
        inverse: boolean;
        type: "all" | "print" | "screen" | "speech";
        expressions: Expression[];
    };
    type Parse = (query: Query) => MatchedMedia[];
    export const parse: Parse;
}
