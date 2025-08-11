// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test("unset", () => {
    assert.equal(matchMedia("(min-height: 500px)").matches, false);
    assert.equal(matchMedia("(height: 500px)").matches, false);
    assert.equal(matchMedia("(max-height: 500px)").matches, true);

    assert.equal(matchMedia("(height > 500px)").matches, false);
    assert.equal(matchMedia("(height >= 500px)").matches, false);
    assert.equal(matchMedia("(height < 500px)").matches, true);
    assert.equal(matchMedia("(height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > height)").matches, true);
    assert.equal(matchMedia("(500px >= height)").matches, true);
    assert.equal(matchMedia("(500px < height)").matches, false);
    assert.equal(matchMedia("(500px <= height)").matches, false);

    assert.equal(matchMedia("(500px > height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height < 500px)").matches, false);
});

test("600px", () => {
    setMedia({
        height: 600,
    });

    assert.equal(matchMedia("(min-height: 500px)").matches, true);
    assert.equal(matchMedia("(height: 500px)").matches, false);
    assert.equal(matchMedia("(max-height: 500px)").matches, false);

    assert.equal(matchMedia("(height > 500px)").matches, true);
    assert.equal(matchMedia("(height >= 500px)").matches, true);
    assert.equal(matchMedia("(height < 500px)").matches, false);
    assert.equal(matchMedia("(height <= 500px)").matches, false);

    assert.equal(matchMedia("(500px > height)").matches, false);
    assert.equal(matchMedia("(500px >= height)").matches, false);
    assert.equal(matchMedia("(500px < height)").matches, true);
    assert.equal(matchMedia("(500px <= height)").matches, true);

    assert.equal(matchMedia("(500px > height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height < 500px)").matches, false);
});

test("500px", () => {
    setMedia({
        height: 500,
    });

    assert.equal(matchMedia("(min-height: 500px)").matches, true);
    assert.equal(matchMedia("(height: 500px)").matches, true);
    assert.equal(matchMedia("(max-height: 500px)").matches, true);

    assert.equal(matchMedia("(height > 500px)").matches, false);
    assert.equal(matchMedia("(height >= 500px)").matches, true);
    assert.equal(matchMedia("(height < 500px)").matches, false);
    assert.equal(matchMedia("(height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > height)").matches, false);
    assert.equal(matchMedia("(500px >= height)").matches, true);
    assert.equal(matchMedia("(500px < height)").matches, false);
    assert.equal(matchMedia("(500px <= height)").matches, true);

    assert.equal(matchMedia("(500px > height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px > height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    assert.equal(matchMedia("(300px < height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= height < 500px)").matches, false);
});

test("400px", () => {
    setMedia({
        height: 400,
    });

    assert.equal(matchMedia("(min-height: 500px)").matches, false);
    assert.equal(matchMedia("(height: 500px)").matches, false);
    assert.equal(matchMedia("(max-height: 500px)").matches, true);

    assert.equal(matchMedia("(height > 500px)").matches, false);
    assert.equal(matchMedia("(height >= 500px)").matches, false);
    assert.equal(matchMedia("(height < 500px)").matches, true);
    assert.equal(matchMedia("(height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > height)").matches, true);
    assert.equal(matchMedia("(500px >= height)").matches, true);
    assert.equal(matchMedia("(500px < height)").matches, false);
    assert.equal(matchMedia("(500px <= height)").matches, false);

    assert.equal(matchMedia("(500px > height > 300px)").matches, true);
    assert.equal(matchMedia("(500px >= height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px > height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= height > 300px)").matches, true);

    assert.equal(matchMedia("(300px < height < 500px)").matches, true);
    assert.equal(matchMedia("(300px <= height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= height < 500px)").matches, true);
});

test("300px", () => {
    setMedia({
        height: 300,
    });

    assert.equal(matchMedia("(min-height: 500px)").matches, false);
    assert.equal(matchMedia("(height: 500px)").matches, false);
    assert.equal(matchMedia("(max-height: 500px)").matches, true);

    assert.equal(matchMedia("(height > 500px)").matches, false);
    assert.equal(matchMedia("(height >= 500px)").matches, false);
    assert.equal(matchMedia("(height < 500px)").matches, true);
    assert.equal(matchMedia("(height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > height)").matches, true);
    assert.equal(matchMedia("(500px >= height)").matches, true);
    assert.equal(matchMedia("(500px < height)").matches, false);
    assert.equal(matchMedia("(500px <= height)").matches, false);

    assert.equal(matchMedia("(500px > height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px > height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height < 500px)").matches, true);
});

test("200px", () => {
    setMedia({
        height: 200,
    });

    assert.equal(matchMedia("(min-height: 500px)").matches, false);
    assert.equal(matchMedia("(height: 500px)").matches, false);
    assert.equal(matchMedia("(max-height: 500px)").matches, true);

    assert.equal(matchMedia("(height > 500px)").matches, false);
    assert.equal(matchMedia("(height >= 500px)").matches, false);
    assert.equal(matchMedia("(height < 500px)").matches, true);
    assert.equal(matchMedia("(height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > height)").matches, true);
    assert.equal(matchMedia("(500px >= height)").matches, true);
    assert.equal(matchMedia("(500px < height)").matches, false);
    assert.equal(matchMedia("(500px <= height)").matches, false);

    assert.equal(matchMedia("(500px > height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= height < 500px)").matches, false);
});
