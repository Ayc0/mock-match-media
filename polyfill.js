const { matchMedia } = require("./");

if (!("matchMedia" in global)) {
    global.matchMedia = matchMedia;
}

if (typeof window === "undefined") {
    global.window = global;
}
