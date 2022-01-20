const test = require("ava");

test("can import mock-match-media from CJS", (t) => {
    const exportsDefault = require("mock-match-media");
    t.deepEqual(Object.keys(exportsDefault), ["cleanup", "cleanupListeners", "cleanupMedia", "matchMedia", "setMedia"]);
    t.pass();
});

test("can import mock-match-media/polyfill from CJS", (t) => {
    t.is(global.matchMedia, undefined);
    const { matchMedia } = require("mock-match-media");
    console.log(require("mock-match-media/polyfill"));
    t.is(global.matchMedia, matchMedia);
    t.pass();
});
