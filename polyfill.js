const mmm = require("./");

function inject(variable) {
    // Older versions of node don't have `globalThis` (was added in node 12)
    if (typeof globalThis !== "undefined" && !(variable in globalThis)) {
        globalThis[variable] = mmm[variable];
    }

    // Only node has `global`, not browsers nor deno
    if (typeof global !== "undefined" && !(variable in global)) {
        global[variable] = mmm[variable];
    }

    // If we want to set it up for window too.
    // Some implementation of window mock can have a different value for window and global
    if (typeof window !== "undefined" && !(variable in window)) {
        window[variable] = mmm[variable];
    }
}

inject("matchMedia");
inject("MediaQueryListEvent");
