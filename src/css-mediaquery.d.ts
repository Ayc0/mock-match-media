declare module "css-mediaquery" {
    export type Feature = string;

    export type MediaState = Record<Feature, string>;
    type Match = (query: string, state: MediaState) => boolean;
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
    type Parse = (query: string) => MatchedMedia[];
    export const parse: Parse;
}
