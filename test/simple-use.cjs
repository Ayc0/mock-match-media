// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupListeners, cleanupMedia, cleanup } = require("mock-match-media");

test(".matches", () => {
    const mql = matchMedia("(min-width: 500px)");

    assert.equal(mql.matches, false);

    setMedia({
        width: 600,
    });

    assert.equal(mql.matches, true);

    setMedia({
        width: 300,
    });

    assert.equal(mql.matches, false);
});

test("cleanupMedia", () => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: 600,
    });
    assert.equal(doesMatch(), true);

    cleanupMedia();
    assert.equal(doesMatch(), false);
});

test("cleanup", () => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: 600,
    });
    assert.equal(doesMatch(), true);

    cleanup();
    assert.equal(doesMatch(), false);
});
