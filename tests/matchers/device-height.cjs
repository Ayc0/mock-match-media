// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test("unset", () => {
    assert.equal(matchMedia("(min-device-height: 500px)").matches, false);
    assert.equal(matchMedia("(device-height: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-height: 500px)").matches, true);

    assert.equal(matchMedia("(device-height > 500px)").matches, false);
    assert.equal(matchMedia("(device-height >= 500px)").matches, false);
    assert.equal(matchMedia("(device-height < 500px)").matches, true);
    assert.equal(matchMedia("(device-height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-height)").matches, true);
    assert.equal(matchMedia("(500px >= device-height)").matches, true);
    assert.equal(matchMedia("(500px < device-height)").matches, false);
    assert.equal(matchMedia("(500px <= device-height)").matches, false);

    assert.equal(matchMedia("(500px > device-height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height < 500px)").matches, false);
});

test("deviceHeight 600px", () => {
    setMedia({
        deviceHeight: 600,
    });

    assert.equal(matchMedia("(min-device-height: 500px)").matches, true);
    assert.equal(matchMedia("(device-height: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-height: 500px)").matches, false);

    assert.equal(matchMedia("(device-height > 500px)").matches, true);
    assert.equal(matchMedia("(device-height >= 500px)").matches, true);
    assert.equal(matchMedia("(device-height < 500px)").matches, false);
    assert.equal(matchMedia("(device-height <= 500px)").matches, false);

    assert.equal(matchMedia("(500px > device-height)").matches, false);
    assert.equal(matchMedia("(500px >= device-height)").matches, false);
    assert.equal(matchMedia("(500px < device-height)").matches, true);
    assert.equal(matchMedia("(500px <= device-height)").matches, true);

    assert.equal(matchMedia("(500px > device-height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height < 500px)").matches, false);
});

test("deviceHeight 500px", () => {
    setMedia({
        deviceHeight: 500,
    });

    assert.equal(matchMedia("(min-device-height: 500px)").matches, true);
    assert.equal(matchMedia("(device-height: 500px)").matches, true);
    assert.equal(matchMedia("(max-device-height: 500px)").matches, true);

    assert.equal(matchMedia("(device-height > 500px)").matches, false);
    assert.equal(matchMedia("(device-height >= 500px)").matches, true);
    assert.equal(matchMedia("(device-height < 500px)").matches, false);
    assert.equal(matchMedia("(device-height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-height)").matches, false);
    assert.equal(matchMedia("(500px >= device-height)").matches, true);
    assert.equal(matchMedia("(500px < device-height)").matches, false);
    assert.equal(matchMedia("(500px <= device-height)").matches, true);

    assert.equal(matchMedia("(500px > device-height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px > device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    assert.equal(matchMedia("(300px < device-height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < device-height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= device-height < 500px)").matches, false);
});

test("deviceHeight 400px", () => {
    setMedia({
        deviceHeight: 400,
    });

    assert.equal(matchMedia("(min-device-height: 500px)").matches, false);
    assert.equal(matchMedia("(device-height: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-height: 500px)").matches, true);

    assert.equal(matchMedia("(device-height > 500px)").matches, false);
    assert.equal(matchMedia("(device-height >= 500px)").matches, false);
    assert.equal(matchMedia("(device-height < 500px)").matches, true);
    assert.equal(matchMedia("(device-height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-height)").matches, true);
    assert.equal(matchMedia("(500px >= device-height)").matches, true);
    assert.equal(matchMedia("(500px < device-height)").matches, false);
    assert.equal(matchMedia("(500px <= device-height)").matches, false);

    assert.equal(matchMedia("(500px > device-height > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px >= device-height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px > device-height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= device-height > 300px)").matches, true);

    assert.equal(matchMedia("(300px < device-height < 500px)").matches, true);
    assert.equal(matchMedia("(300px <= device-height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < device-height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= device-height < 500px)").matches, true);
});

test("deviceHeight 300px", () => {
    setMedia({
        deviceHeight: 300,
    });

    assert.equal(matchMedia("(min-device-height: 500px)").matches, false);
    assert.equal(matchMedia("(device-height: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-height: 500px)").matches, true);

    assert.equal(matchMedia("(device-height > 500px)").matches, false);
    assert.equal(matchMedia("(device-height >= 500px)").matches, false);
    assert.equal(matchMedia("(device-height < 500px)").matches, true);
    assert.equal(matchMedia("(device-height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-height)").matches, true);
    assert.equal(matchMedia("(500px >= device-height)").matches, true);
    assert.equal(matchMedia("(500px < device-height)").matches, false);
    assert.equal(matchMedia("(500px <= device-height)").matches, false);

    assert.equal(matchMedia("(500px > device-height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px > device-height >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= device-height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height < 500px)").matches, true);
});

test("deviceHeight 200px", () => {
    setMedia({
        deviceHeight: 200,
    });

    assert.equal(matchMedia("(min-device-height: 500px)").matches, false);
    assert.equal(matchMedia("(device-height: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-height: 500px)").matches, true);

    assert.equal(matchMedia("(device-height > 500px)").matches, false);
    assert.equal(matchMedia("(device-height >= 500px)").matches, false);
    assert.equal(matchMedia("(device-height < 500px)").matches, true);
    assert.equal(matchMedia("(device-height <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-height)").matches, true);
    assert.equal(matchMedia("(500px >= device-height)").matches, true);
    assert.equal(matchMedia("(500px < device-height)").matches, false);
    assert.equal(matchMedia("(500px <= device-height)").matches, false);

    assert.equal(matchMedia("(500px > device-height > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > device-height >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-height > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-height < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < device-height <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-height < 500px)").matches, false);
});

test("height & dppx", () => {
    setMedia({
        height: 600,
    });

    assert.equal(matchMedia("(device-height > 500px)").matches, true);
    assert.equal(matchMedia("(device-height < 700px)").matches, true);
    assert.equal(matchMedia("(device-height: 600px)").matches, true);

    setMedia({
        // Keep the: `height: 600`
        dppx: 2,
    });

    assert.equal(matchMedia("(device-height > 500px)").matches, true);
    assert.equal(matchMedia("(device-height < 700px)").matches, false);
    assert.equal(matchMedia("(device-height: 600px)").matches, false);
    assert.equal(matchMedia("(device-height: 1200px)").matches, true);

    setMedia({
        // Keep the `dppx: 2`
        height: 300,
    });

    assert.equal(matchMedia("(device-height > 500px)").matches, true);
    assert.equal(matchMedia("(device-height < 700px)").matches, true);
    assert.equal(matchMedia("(device-height: 600px)").matches, true);
    assert.equal(matchMedia("(device-height: 300px)").matches, false);
});
