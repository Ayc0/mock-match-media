const test = require("ava");

test.serial("can import mock-match-media from CJS", (t) => {
    const exportsDefault = require("mock-match-media");
    t.deepEqual(Object.keys(exportsDefault), [
        "MediaQueryListEvent",
        "cleanup",
        "cleanupListeners",
        "cleanupMedia",
        "matchMedia",
        "setMedia",
    ]);
    t.pass();
});

test.serial("can import mock-match-media/polyfill from CJS", (t) => {
    t.is(global.matchMedia, undefined);
    t.is(global.MediaQueryListEvent, undefined);
    const { matchMedia, MediaQueryListEvent } = require("mock-match-media");
    require("mock-match-media/polyfill");
    t.is(global.matchMedia, matchMedia);
    t.is(global.MediaQueryListEvent, MediaQueryListEvent);
    delete require.cache[require.resolve("mock-match-media/polyfill")];
    delete global.matchMedia;
    t.pass();
});

test.serial("can import mock-match-media/jest-setup from CJS", (t) => {
    t.is(global.matchMedia, undefined);
    const { matchMedia } = require("mock-match-media");
    require("mock-match-media/jest-setup");
    t.is(global.matchMedia, matchMedia);
    delete require.cache[require.resolve("mock-match-media/jest-setup")];
    delete global.matchMedia;
    t.pass();
});
