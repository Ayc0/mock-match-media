const { cleanup } = require("./");

require("./polyfill");

if (typeof process === "undefined") {
    if (typeof afterEach === "function") {
        afterEach(() => {
            cleanup();
        });
    }
}
