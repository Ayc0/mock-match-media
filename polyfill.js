const { matchMedia } = require("./");

// Older versions of node don't have `globalThis` (was added in node 12)
if (typeof globalThis !== "undefined" && !("matchMedia" in globalThis)) {
    globalThis.matchMedia = matchMedia;
}

// Only node has `global`, not browsers nor deno
if (typeof global !== "undefined" && !("matchMedia" in global)) {
    global.matchMedia = matchMedia;
}

// If we want to set it up for window too.
// Some implementation of window mock can have a different value for window and global
if (typeof window !== "undefined" && !("matchMedia" in window)) {
    window.matchMedia = matchMedia;
}
