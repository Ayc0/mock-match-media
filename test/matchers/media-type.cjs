// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test("unset", () => {
    assert.equal(matchMedia("all").matches, true);
    assert.equal(matchMedia("screen").matches, true);
    assert.equal(matchMedia("print").matches, false);

    // To note: other media types are deprecated since Media Query 4
    // See:
    // - https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types
    // - https://drafts.csswg.org/mediaqueries/#media-types
});

test("screen", () => {
    setMedia({
        mediaType: "screen",
    });

    assert.equal(matchMedia("all").matches, true);
    assert.equal(matchMedia("screen").matches, true);
    assert.equal(matchMedia("print").matches, false);
});

test("print", () => {
    setMedia({
        mediaType: "print",
    });

    assert.equal(matchMedia("all").matches, true);
    assert.equal(matchMedia("screen").matches, false);
    assert.equal(matchMedia("print").matches, true);
});
