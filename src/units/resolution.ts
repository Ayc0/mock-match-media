// https://www.w3.org/TR/mediaqueries-4/#descdef-media-resolution
type ResolutionUnit = "dpi" | "dpcm" | "dppx" | "x";
const RESOLUTION_REGEX = /(\d+(?:\.\d+)?)(dpi|dpcm|dppx|x)/;
export function convertResolutionToDpi(resolution: string) {
    if (resolution === "infinite") {
        return Infinity;
    }
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
