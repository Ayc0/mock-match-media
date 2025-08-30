const mmm = require(".");

function inject(variable) {
    // Older versions of node don't have `globalThis` (but as it was added in node 12 and we don't target those versions, no need to have fallbacks)
    if (typeof globalThis !== "undefined" && !(variable in globalThis)) {
        globalThis[variable] = mmm[variable];
    }
}

inject("matchMedia");
inject("MediaQueryListEvent");
