const { cleanup } = require("./dist/index.js");

require("./polyfill.cjs");

if (typeof process === "undefined") {
    if (typeof afterEach === "function") {
        afterEach(() => {
            cleanup();
        });
    }
}
