import { parseInteger } from "./units/integer";
import { convertLengthToPx } from "./units/length";
import { convertResolutionToDpi } from "./units/resolution";

export type Config = {
    em?: number;
    ic?: number;
    ex?: number;
    width?: number;
    height?: number;
    type?: "print" | "screen";
    grid?: 0 | 1;
    resolution?: number;
    color?: number;
    "color-index"?: number;
    monochrome?: number;
} & DiscreteOptions;

const staticDiscrete = {
    scan: ["interlace", "progressive"],
    update: ["none", "slow", "fast"],
    "overflow-block": ["none", "scroll", "paged"],
    "overflow-inline": ["none", "scroll"],
    "color-gamut": ["srgb", "p3", "rec2020"],
    pointer: ["none", "coarse", "fine"],
    hover: ["none", "hover"],
    "any-pointer": ["none", "coarse", "fine"],
    "any-hover": ["none", "hover"],
} as const;
type DiscreteOptions = { [key in keyof typeof staticDiscrete]?: typeof staticDiscrete[key][number] };

const dynamicDiscrete: Array<{
    name: string;
    parseValue: (rawValue: string | undefined, config: Config) => boolean;
}> = [
    {
        name: "orientation",
        parseValue: (rawValue, { height, width }) => {
            if (height === undefined || width === undefined) {
                return false;
            }
            if (rawValue !== "portrait" && rawValue !== "landscape") {
                return false;
            }
            // See https://www.w3.org/TR/mediaqueries-4/#orientation
            return height >= width && rawValue === "portrait";
        },
    },
    {
        name: "grid",
        parseValue: (rawValue, { grid } = {}) => {
            if ((rawValue === undefined || rawValue === "1") && grid === 1) {
                return true;
            }
            if (rawValue === "0" || (rawValue === "-0" && grid === 0)) {
                return true;
            }
            return false;
        },
    },
];

const ranges: Array<{
    name: string;
    aliases?: string[];
    parseValue: (rawValue: string, config: Config) => number | null;
}> = [
    {
        name: "width",
        aliases: ["device-width"],
        parseValue: convertLengthToPx,
    },
    {
        name: "height",
        aliases: ["device-height"],
        parseValue: convertLengthToPx,
    },
    {
        name: "aspect-ratio",
        aliases: ["device-aspect-ratio"],
        // "ratio" r OR w / h
        parseValue: (v) => {
            console.warn("ratios aren’t supported yet");
            return null; // TODO: implement those later
        },
    },
    {
        name: "resolution",
        parseValue: convertResolutionToDpi,
    },
    {
        name: "color",
        parseValue: parseInteger,
    },
    {
        name: "color-index",
        parseValue: parseInteger,
    },
    {
        name: "monochrome",
        parseValue: parseInteger,
    },
];

const discreteParsers: Record<string, (rawValue: string | undefined, config: Config) => boolean> = {};
for (const [name, values] of Object.entries(staticDiscrete as Record<string, readonly string[]>)) {
    discreteParsers[name] = (rawValue, config) => {
        if (rawValue === undefined) {
            return config[name] !== "none";
        }
        if (!values.includes(rawValue)) {
            return false;
        }
        return rawValue === config[name];
    };
}
dynamicDiscrete.forEach(({ name, parseValue }) => {
    discreteParsers[name] = parseValue;
});

const rangeParsers: Record<string, (rawValue: string, config: Config) => number | null> = {};
ranges.forEach(({ name, parseValue }) => {
    rangeParsers[name] = parseValue;
});

const KEY_VALUE_REGEX = /(?<name>[a-z][a-z0-9_-]*)\s*:\s*(?<value>[^)]+)/;
const MIN_VALUE_REGEX = /min-(?<name>[a-z][a-z0-9_-]*)\s*:\s*(?<minValue>[^)]+)/;
const MAX_VALUE_REGEX = /max-(?<name>[a-z][a-z0-9_-]*)\s*:\s*(?<maxValue>[^)]+)/;
const match = (input: string, config: Config) => {};

const typeModifier = {
    name: "type",
    isRaw: true,
    values: [
        "all", // Matches all devices.
        "print", // Matches printers, and devices intended to reproduce a printed display, such as a web browser showing a document in “Print Preview”.
        "screen", // Matches all devices that aren’t matched by print.
        // All below are nothing
        "tty",
        "tv",
        "projection",
        "handheld",
        "braille",
        "embossed",
        "aural",
        "speech",
    ],
};

const parseMediaQuery = (mediaQuery: string, config?: Config) => {
    // A media query can be composed of multiple sub queries separated by commas, see https://www.w3.org/TR/mediaqueries-4/#mq-list
    mediaQuery.toLowerCase().split(",");
};
