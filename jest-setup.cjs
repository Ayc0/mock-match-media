// The library depends on TextEncoder, but JSDOM doesn’t include it (see https://github.com/jsdom/jsdom/issues/2524)
if (typeof globalThis.TextEncoder === "undefined") {
    const { TextEncoder } = require("node:util");
    Object.assign(globalThis, { TextEncoder });
}

const { cleanup } = require("./dist/index.js");

require("./polyfill.cjs");

if (typeof process === "undefined") {
    if (typeof afterEach === "function") {
        afterEach(() => {
            cleanup();
        });
    }
}
