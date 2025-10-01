// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");
const { mock } = require("../utils.cjs");

test.beforeEach(() => {
    cleanupMedia();
});


test("unset", () => {
    assert.equal(matchMedia("(prefers-color-scheme: light)").matches, false);
    assert.equal(matchMedia("(prefers-color-scheme: dark)").matches, false);
});

test("light", () => {
    setMedia({
        prefersColorScheme: "light",
    });

    assert.equal(matchMedia("(prefers-color-scheme: light)").matches, true);
    assert.equal(matchMedia("(prefers-color-scheme: dark)").matches, false);
});

test("dark", () => {
    setMedia({
        prefersColorScheme: "dark",
    });

    assert.equal(matchMedia("(prefers-color-scheme: light)").matches, false);
    assert.equal(matchMedia("(prefers-color-scheme: dark)").matches, true);
});

test("`.addEventListener()`", () => {
    const mqlLight = matchMedia("(prefers-color-scheme: light)");
    const mqlDark = matchMedia("(prefers-color-scheme: dark)");
    const [cbLight, callsLight] = mock();
    const [cbDark, callsDark] = mock();

    mqlLight.addEventListener("change", cbLight);
    mqlDark.addEventListener("change", cbDark);

    setMedia({
        prefersColorScheme: "light",
    });

    assert.equal(matchMedia("(prefers-color-scheme: light)").matches, true);
    assert.equal(matchMedia("(prefers-color-scheme: dark)").matches, false);
    assert.equal(callsLight.length, 1);
    assert.equal(callsLight[0].matches, true);
    assert.equal(callsDark.length, 0);

    setMedia({
        prefersColorScheme: "dark",
    });

    assert.equal(matchMedia("(prefers-color-scheme: light)").matches, false);
    assert.equal(matchMedia("(prefers-color-scheme: dark)").matches, true);
    assert.equal(callsLight.length, 2);
    assert.equal(callsLight[1].matches, false);
    assert.equal(callsDark.length, 1);
    assert.equal(callsDark[0].matches, true);
})

