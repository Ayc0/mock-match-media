// See https://www.w3.org/TR/mediaqueries-4/#mq-list

const discrete = [
    {
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
    },
    {
        name: "orientation",
        values: ["portrait", "landscape"],
        // The orientation media feature is portrait when the value of the height media feature is greater than or equal to the value of the width media feature.
        // Otherwise orientation is landscape.
        // => Value can be derived from width/height if both set
    },
    {
        name: "scan",
        values: ["interlace", "progressive"],
    },
    {
        name: "grid",
        values: ["0", "1"], // -0 = 0
        noneValue: "0",
    },
    {
        name: "update",
        values: ["none", "slow", "fast"],
    },
    {
        name: "overflow-block",
        values: ["none", "scroll", "paged"],
    },
    {
        name: "overflow-inline",
        values: ["none", "scroll"],
    },
    {
        name: "color-gamut",
        values: ["srgb", "p3", "rec2020"],
    },
    {
        name: "pointer",
        values: ["none", "coarse", "fine"],
    },
    {
        name: "hover",
        values: ["none", "hover"],
    },
    {
        name: "any-pointer",
        values: ["none", "coarse", "fine"],
    },
    {
        name: "any-hover",
        values: ["none", "hover"],
    },
] as const;

const ranges = [
    {
        name: "width", // ✅
        unit: "length",
    },
    {
        name: "height", // ✅
        unit: "length",
    },
    {
        name: "aspect-ratio",
        unit: "ratio", // r OR w / h (all integers)
    },
    {
        name: "resolution",
        unit: "<resolution> | infinite", // ???
        // dpi (Dots per inch) or dpcm (Dots per centimeter) or dppx / x (Dots per px unit)
    },
    {
        name: "color",
        unit: "integer",
    },
    {
        name: "color-index",
        unit: "integer",
    },
    {
        name: "monochrome",
        unit: "integer",
    },
    {
        // @deprecated
        name: "device-width", // ✅
        unit: "length",
    },
    {
        // @deprecated
        name: "device-height", // ✅
        unit: "length",
    },
    {
        // @deprecated
        name: "device-aspect-ratio",
        unit: "ratio",
    },
] as const;

type ResolutionUnit = "dpi" | "dpcm" | "dppx" | "x";
const RESOLUTION_REGEX = /(\d+(?:\.\d+)?)(dpi|dpcm|dppx|x)/;
function convertResolutionToDpi(resolution: string) {
    const match = resolution.match(RESOLUTION_REGEX);

    if (!match) {
        return null;
    }

    const [, _value, _unit] = match;
    const value = parseFloat(_value);
    const unit = _unit as ResolutionUnit;

    switch (unit) {
        case "dpcm":
            return value / 2.54;
        case "dppx":
        case "x":
            return value * 96;
        default:
            return value;
    }
}

// https://www.w3.org/TR/css-values-4/#lengths
type AbsoluteLengthUnit = "cm" | "mm" | "Q" | "in" | "pc" | "pt" | "px";
type FontRelativeUnit = "em" | "rem" | "ex" | "rex" | "cap" | "rcap" | "ch" | "rch" | "ic" | "ric" | "lh" | "rlh";
type ViewportPercentageLengthStartUnit = "v" | "sv" | "lv" | "dv";
type ViewportPercentageLengthEndUnit = "w" | "h" | "i" | "b" | "min" | "max";
type ViewportPercentageLengthUnit = `${ViewportPercentageLengthStartUnit}${ViewportPercentageLengthEndUnit}`;
type LengthUnit = AbsoluteLengthUnit | FontRelativeUnit | ViewportPercentageLengthUnit;

const LENGTH_REGEX =
    /(\d+(?:\.\d+)?)(em|ex|cap|ch|ic|lh|rem|rex|rch|rcap|ric|rlh|vw|vh|vi|vb|vmin|vmax|in|cm|mm|pt|pc|Q)/;
function toPx(length: string) {
    const match = length.match(LENGTH_REGEX);

    if (!match) {
        return null;
    }

    const [, _value, _unit] = match;
    const value = parseFloat(_value);
    const unit = _unit as LengthUnit;

    switch (unit) {
        case "em":
        case "rem":
            return value * 16; // default px to em conversion. TODO make it customizable;
        case "in":
            return value * 96;
        case "cm":
            return (value * 96) / 2.54;
        case "mm":
            return (value * 96) / 2.54 / 10;
        case "Q":
            return (value * 96) / 2.54 / 40;
        case "pc":
            return (value * 96) / 6;
        case "pt":
            return (value * 96) / 72;
        case "ex":
        case "rex":
        case "cap":
        case "rcap":
        case "ch":
        case "rch":
        case "ic":
        case "ric":
        case "lh":
        case "rlh":
        case "vw":
        case "vh":
        case "vi":
        case "vb":
        case "vmin":
        case "vmax":
            console.log(unit + " isn’t supported yet");
            return null; // TODO: implement those later
        default:
            console.log(unit + " isn’t supported");
            return null;
    }
}
