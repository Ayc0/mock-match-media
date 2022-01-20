import test from "ava";

test("can import mock-match-media from ESM", async (t) => {
    const exportsDefault = await import("mock-match-media");
    t.deepEqual(Object.keys(exportsDefault), ["cleanup", "cleanupListeners", "cleanupMedia", "matchMedia", "setMedia"]);
    t.pass();
});

test("can import mock-match-media/polyfill from ESM", async (t) => {
    t.is(global.matchMedia, undefined);
    const { matchMedia } = await import("mock-match-media");

    await import("mock-match-media/polyfill");

    t.is(global.matchMedia, matchMedia);
    t.pass();
});
