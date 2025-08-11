// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");

test("can import mock-match-media from CJS", () => {
    const exportsDefault = require("mock-match-media");
    assert.deepEqual(Object.keys(exportsDefault), [
        "MediaQueryListEvent",
        "cleanup",
        "cleanupListeners",
        "cleanupMedia",
        "matchMedia",
        "setMedia",
    ]);
});

test("can import mock-match-media/polyfill from CJS", () => {
    assert.equal(global.matchMedia, undefined);
    assert.equal(global.MediaQueryListEvent, undefined);
    const { matchMedia, MediaQueryListEvent } = require("mock-match-media");
    require("mock-match-media/polyfill");
    assert.equal(global.matchMedia, matchMedia);
    assert.equal(global.MediaQueryListEvent, MediaQueryListEvent);
    delete require.cache[require.resolve("mock-match-media/polyfill")];
    // @ts-expect-error
    delete global.matchMedia;
});

test("can import mock-match-media/jest-setup from CJS", () => {
    assert.equal(global.matchMedia, undefined);
    const { matchMedia } = require("mock-match-media");
    require("mock-match-media/jest-setup");
    assert.equal(global.matchMedia, matchMedia);
    delete require.cache[require.resolve("mock-match-media/jest-setup")];
    // @ts-expect-error
    delete global.matchMedia;
});
