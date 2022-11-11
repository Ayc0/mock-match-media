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
        name: "aspect-ratio", // ✅
        unit: "ratio", // r OR w / h
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
        name: "device-aspect-ratio", // ✅
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
function toPx(
    length: string,
    {
        em = 16,
        ic = 16,
        ex = 7.2,
        width,
        height,
    }: { em?: number; ic?: number; ex?: number; width?: number; height?: number } = {},
) {
    const match = length.match(LENGTH_REGEX);

    if (!match) {
        return null;
    }

    const [, _value, _unit] = match;
    const value = parseFloat(_value);
    const unit = _unit as LengthUnit;

    switch (unit) {
        // Equal to the computed value of the font-size property of the element on which it is used.
        case "em":
        case "rem":
            return value * em;
        // inches – 1in = 2.54cm = 96px
        case "in":
            return value * 96;
        // centimeters – 1cm = 96px/2.54
        case "cm":
            return (value * 96) / 2.54;
        // millimeters – 1mm = 1/10th of 1cm
        case "mm":
            return (value * 96) / 2.54 / 10;
        // quarter-millimeters – 1Q = 1/40th of 1cm
        case "Q":
            return (value * 96) / 2.54 / 40;
        // picas – 1pc = 1/6th of 1in
        case "pc":
            return (value * 96) / 6;
        // points – 1pt = 1/72nd of 1in
        case "pt":
            return (value * 96) / 72;
        // pixels – 1px = 1/96th of 1in
        case "px":
            return value;

        // Represents the typical advance measure of CJK letters, and measured as the used advance measure of the “水” (CJK water ideograph, U+6C34) glyph found in the font used to render it.
        case "ic":
        case "ric":
            return ic;

        // Equal to the used x-height of the first available font. The x-height is so called because it is often equal to the height of the lowercase "x".
        case "ex":
        case "rex":
            return ex;

        // Represents the typical advance measure of European alphanumeric characters, and measured as the used advance measure of the “0” (ZERO, U+0030) glyph in the font used to render it. (The advance measure of a glyph is its advance width or height, whichever is in the inline axis of the element.)
        // In the cases where it is impossible or impractical to determine the measure of the “0” glyph, it must be assumed to be 0.5em wide by 1em tall. Thus, the ch unit falls back to 0.5em in the general case, and to 1em when it would be typeset upright (i.e. writing-mode is vertical-rl or vertical-lr and text-orientation is upright).
        case "ch":
        case "rch":
            return (value * em) / 2;

        // viewport-width units
        case "vw":
        case "vi":
        case "svw":
        case "svi":
        case "lvw":
        case "lvi":
        case "dvw":
        case "dvi": {
            if (width === undefined) {
                return null;
            }
            return (value * width) / 100;
        }

        case "vh":
        case "vb":
        case "svh":
        case "svb":
        case "lvh":
        case "lvb":
        case "dvh":
        case "dvb": {
            if (height === undefined) {
                return null;
            }
            return (value * height) / 100;
        }

        case "vmin":
        case "svmin":
        case "lvmin":
        case "dvmin": {
            if (height !== undefined && width !== undefined) {
                return (value * Math.min(height, width)) / 100;
            }
            if (width !== undefined) {
                return (value * width) / 100;
            }
            if (height !== undefined) {
                return (value * height) / 100;
            }
            return null;
        }

        case "vmax":
        case "svmax":
        case "lvmax":
        case "dvmax": {
            if (height !== undefined && width !== undefined) {
                return (value * Math.max(height, width)) / 100;
            }
            if (width !== undefined) {
                return (value * width) / 100;
            }
            if (height !== undefined) {
                return (value * height) / 100;
            }
            return null;
        }

        // Equal to the used cap-height of the first available font. The cap-height is so called because it is approximately equal to the height of a capital Latin letter.
        case "cap":
        case "rcap":
        // Equal to the computed value of the line-height property of the element on which it is used, converting normal to an absolute length by using only the metrics of the first available font.
        case "lh":
        case "rlh":
            console.log(unit + " isn’t supported yet");
            return null; // TODO: implement those later
        default:
            console.log(unit + " isn’t supported");
            return null;
    }
}
