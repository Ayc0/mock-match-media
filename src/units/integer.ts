export function parseInteger(rawValue: string) {
    const value = parseInt(rawValue, 10);
    if (Number.isNaN(value)) {
        return null;
    }
    return value;
}
