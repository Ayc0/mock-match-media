// @ts-check

import { test } from "node:test";
import { strict as assert } from "node:assert";

test("can import mock-match-media from ESM", async () => {
    const exportsDefault = await import("mock-match-media");
    assert.deepEqual(Object.keys(exportsDefault), [
        "MediaQueryListEvent",
        "cleanup",
        "cleanupListeners",
        "cleanupMedia",
        "matchMedia",
        "setMedia",
    ]);
});

test("can import mock-match-media/polyfill from ESM", async () => {
    assert.equal(global.matchMedia, undefined);
    const { matchMedia } = await import("mock-match-media");

    await import("mock-match-media/polyfill");

    assert.equal(global.matchMedia, matchMedia);
});
