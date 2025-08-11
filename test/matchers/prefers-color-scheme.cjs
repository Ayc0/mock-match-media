// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

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
