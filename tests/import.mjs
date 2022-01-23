import test from "ava";

test.serial("can import mock-match-media from ESM", async (t) => {
    const exportsDefault = await import("mock-match-media");
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

test.serial("can import mock-match-media/polyfill from ESM", async (t) => {
    t.is(global.matchMedia, undefined);
    const { matchMedia } = await import("mock-match-media");

    await import("mock-match-media/polyfill");

    t.is(global.matchMedia, matchMedia);
    t.pass();
});
