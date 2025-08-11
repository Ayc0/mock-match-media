// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test("unset", () => {
    assert.equal(matchMedia("(min-width: 500px)").matches, false);
    assert.equal(matchMedia("(width: 500px)").matches, false);
    assert.equal(matchMedia("(max-width: 500px)").matches, true);

    assert.equal(matchMedia("(width > 500px)").matches, false);
    assert.equal(matchMedia("(width >= 500px)").matches, false);
    assert.equal(matchMedia("(width < 500px)").matches, true);
    assert.equal(matchMedia("(width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > width)").matches, true);
    assert.equal(matchMedia("(500px >= width)").matches, true);
    assert.equal(matchMedia("(500px < width)").matches, false);
    assert.equal(matchMedia("(500px <= width)").matches, false);

    assert.equal(matchMedia("(500px > width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width < 500px)").matches, false);
});

test("600px", () => {
    setMedia({
        width: 600,
    });

    assert.equal(matchMedia("(min-width: 500px)").matches, true);
    assert.equal(matchMedia("(width: 500px)").matches, false);
    assert.equal(matchMedia("(max-width: 500px)").matches, false);

    assert.equal(matchMedia("(width > 500px)").matches, true);
    assert.equal(matchMedia("(width >= 500px)").matches, true);
    assert.equal(matchMedia("(width < 500px)").matches, false);
    assert.equal(matchMedia("(width <= 500px)").matches, false);

    assert.equal(matchMedia("(500px > width)").matches, false);
    assert.equal(matchMedia("(500px >= width)").matches, false);
    assert.equal(matchMedia("(500px < width)").matches, true);
    assert.equal(matchMedia("(500px <= width)").matches, true);

    assert.equal(matchMedia("(500px > width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width < 500px)").matches, false);
});

test("500px", () => {
    setMedia({
        width: 500,
    });

    assert.equal(matchMedia("(min-width: 500px)").matches, true);
    assert.equal(matchMedia("(width: 500px)").matches, true);
    assert.equal(matchMedia("(max-width: 500px)").matches, true);

    assert.equal(matchMedia("(width > 500px)").matches, false);
    assert.equal(matchMedia("(width >= 500px)").matches, true);
    assert.equal(matchMedia("(width < 500px)").matches, false);
    assert.equal(matchMedia("(width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > width)").matches, false);
    assert.equal(matchMedia("(500px >= width)").matches, true);
    assert.equal(matchMedia("(500px < width)").matches, false);
    assert.equal(matchMedia("(500px <= width)").matches, true);

    assert.equal(matchMedia("(500px > width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px > width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    assert.equal(matchMedia("(300px < width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= width < 500px)").matches, false);
});

test("400px", () => {
    setMedia({
        width: 400,
    });

    assert.equal(matchMedia("(min-width: 500px)").matches, false);
    assert.equal(matchMedia("(width: 500px)").matches, false);
    assert.equal(matchMedia("(max-width: 500px)").matches, true);

    assert.equal(matchMedia("(width > 500px)").matches, false);
    assert.equal(matchMedia("(width >= 500px)").matches, false);
    assert.equal(matchMedia("(width < 500px)").matches, true);
    assert.equal(matchMedia("(width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > width)").matches, true);
    assert.equal(matchMedia("(500px >= width)").matches, true);
    assert.equal(matchMedia("(500px < width)").matches, false);
    assert.equal(matchMedia("(500px <= width)").matches, false);

    assert.equal(matchMedia("(500px > width > 300px)").matches, true);
    assert.equal(matchMedia("(500px >= width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px > width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= width > 300px)").matches, true);

    assert.equal(matchMedia("(300px < width < 500px)").matches, true);
    assert.equal(matchMedia("(300px <= width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= width < 500px)").matches, true);
});

test("300px", () => {
    setMedia({
        width: 300,
    });

    assert.equal(matchMedia("(min-width: 500px)").matches, false);
    assert.equal(matchMedia("(width: 500px)").matches, false);
    assert.equal(matchMedia("(max-width: 500px)").matches, true);

    assert.equal(matchMedia("(width > 500px)").matches, false);
    assert.equal(matchMedia("(width >= 500px)").matches, false);
    assert.equal(matchMedia("(width < 500px)").matches, true);
    assert.equal(matchMedia("(width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > width)").matches, true);
    assert.equal(matchMedia("(500px >= width)").matches, true);
    assert.equal(matchMedia("(500px < width)").matches, false);
    assert.equal(matchMedia("(500px <= width)").matches, false);

    assert.equal(matchMedia("(500px > width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px > width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width < 500px)").matches, true);
});

test("200px", () => {
    setMedia({
        width: 200,
    });

    assert.equal(matchMedia("(min-width: 500px)").matches, false);
    assert.equal(matchMedia("(width: 500px)").matches, false);
    assert.equal(matchMedia("(max-width: 500px)").matches, true);

    assert.equal(matchMedia("(width > 500px)").matches, false);
    assert.equal(matchMedia("(width >= 500px)").matches, false);
    assert.equal(matchMedia("(width < 500px)").matches, true);
    assert.equal(matchMedia("(width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > width)").matches, true);
    assert.equal(matchMedia("(500px >= width)").matches, true);
    assert.equal(matchMedia("(500px < width)").matches, false);
    assert.equal(matchMedia("(500px <= width)").matches, false);

    assert.equal(matchMedia("(500px > width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= width < 500px)").matches, false);
});
