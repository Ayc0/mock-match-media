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
        name: "width",
        unit: "length",
    },
    {
        name: "height",
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
        name: "device-width",
        unit: "length",
    },
    {
        // @deprecated
        name: "device-height",
        unit: "length",
    },
    {
        // @deprecated
        name: "device-aspect-ratio",
        unit: "ratio",
    },
] as const;
