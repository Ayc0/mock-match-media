// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test("unset", () => {
    assert.equal(matchMedia("(min-device-width: 500px)").matches, false);
    assert.equal(matchMedia("(device-width: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-width: 500px)").matches, true);

    assert.equal(matchMedia("(device-width > 500px)").matches, false);
    assert.equal(matchMedia("(device-width >= 500px)").matches, false);
    assert.equal(matchMedia("(device-width < 500px)").matches, true);
    assert.equal(matchMedia("(device-width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-width)").matches, true);
    assert.equal(matchMedia("(500px >= device-width)").matches, true);
    assert.equal(matchMedia("(500px < device-width)").matches, false);
    assert.equal(matchMedia("(500px <= device-width)").matches, false);

    assert.equal(matchMedia("(500px > device-width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width < 500px)").matches, false);
});

test("device 600px", () => {
    setMedia({
        deviceWidth: 600,
    });

    assert.equal(matchMedia("(min-device-width: 500px)").matches, true);
    assert.equal(matchMedia("(device-width: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-width: 500px)").matches, false);

    assert.equal(matchMedia("(device-width > 500px)").matches, true);
    assert.equal(matchMedia("(device-width >= 500px)").matches, true);
    assert.equal(matchMedia("(device-width < 500px)").matches, false);
    assert.equal(matchMedia("(device-width <= 500px)").matches, false);

    assert.equal(matchMedia("(500px > device-width)").matches, false);
    assert.equal(matchMedia("(500px >= device-width)").matches, false);
    assert.equal(matchMedia("(500px < device-width)").matches, true);
    assert.equal(matchMedia("(500px <= device-width)").matches, true);

    assert.equal(matchMedia("(500px > device-width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width < 500px)").matches, false);
});

test("device 500px", () => {
    setMedia({
        deviceWidth: 500,
    });

    assert.equal(matchMedia("(min-device-width: 500px)").matches, true);
    assert.equal(matchMedia("(device-width: 500px)").matches, true);
    assert.equal(matchMedia("(max-device-width: 500px)").matches, true);

    assert.equal(matchMedia("(device-width > 500px)").matches, false);
    assert.equal(matchMedia("(device-width >= 500px)").matches, true);
    assert.equal(matchMedia("(device-width < 500px)").matches, false);
    assert.equal(matchMedia("(device-width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-width)").matches, false);
    assert.equal(matchMedia("(500px >= device-width)").matches, true);
    assert.equal(matchMedia("(500px < device-width)").matches, false);
    assert.equal(matchMedia("(500px <= device-width)").matches, true);

    assert.equal(matchMedia("(500px > device-width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px > device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    assert.equal(matchMedia("(300px < device-width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < device-width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= device-width < 500px)").matches, false);
});

test("device 400px", () => {
    setMedia({
        deviceWidth: 400,
    });

    assert.equal(matchMedia("(min-device-width: 500px)").matches, false);
    assert.equal(matchMedia("(device-width: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-width: 500px)").matches, true);

    assert.equal(matchMedia("(device-width > 500px)").matches, false);
    assert.equal(matchMedia("(device-width >= 500px)").matches, false);
    assert.equal(matchMedia("(device-width < 500px)").matches, true);
    assert.equal(matchMedia("(device-width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-width)").matches, true);
    assert.equal(matchMedia("(500px >= device-width)").matches, true);
    assert.equal(matchMedia("(500px < device-width)").matches, false);
    assert.equal(matchMedia("(500px <= device-width)").matches, false);

    assert.equal(matchMedia("(500px > device-width > 300px)").matches, true);
    assert.equal(matchMedia("(500px >= device-width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px > device-width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= device-width > 300px)").matches, true);

    assert.equal(matchMedia("(300px < device-width < 500px)").matches, true);
    assert.equal(matchMedia("(300px <= device-width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < device-width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px <= device-width < 500px)").matches, true);
});

test("device 300px", () => {
    setMedia({
        deviceWidth: 300,
    });

    assert.equal(matchMedia("(min-device-width: 500px)").matches, false);
    assert.equal(matchMedia("(device-width: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-width: 500px)").matches, true);

    assert.equal(matchMedia("(device-width > 500px)").matches, false);
    assert.equal(matchMedia("(device-width >= 500px)").matches, false);
    assert.equal(matchMedia("(device-width < 500px)").matches, true);
    assert.equal(matchMedia("(device-width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-width)").matches, true);
    assert.equal(matchMedia("(500px >= device-width)").matches, true);
    assert.equal(matchMedia("(500px < device-width)").matches, false);
    assert.equal(matchMedia("(500px <= device-width)").matches, false);

    assert.equal(matchMedia("(500px > device-width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(500px > device-width >= 300px)").matches, true);
    assert.equal(matchMedia("(500px >= device-width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width <= 500px)").matches, true);
    assert.equal(matchMedia("(300px < device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width < 500px)").matches, true);
});

test("device 200px", () => {
    setMedia({
        deviceWidth: 200,
    });

    assert.equal(matchMedia("(min-device-width: 500px)").matches, false);
    assert.equal(matchMedia("(device-width: 500px)").matches, false);
    assert.equal(matchMedia("(max-device-width: 500px)").matches, true);

    assert.equal(matchMedia("(device-width > 500px)").matches, false);
    assert.equal(matchMedia("(device-width >= 500px)").matches, false);
    assert.equal(matchMedia("(device-width < 500px)").matches, true);
    assert.equal(matchMedia("(device-width <= 500px)").matches, true);

    assert.equal(matchMedia("(500px > device-width)").matches, true);
    assert.equal(matchMedia("(500px >= device-width)").matches, true);
    assert.equal(matchMedia("(500px < device-width)").matches, false);
    assert.equal(matchMedia("(500px <= device-width)").matches, false);

    assert.equal(matchMedia("(500px > device-width > 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px > device-width >= 300px)").matches, false);
    assert.equal(matchMedia("(500px >= device-width > 300px)").matches, false);

    assert.equal(matchMedia("(300px < device-width < 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px < device-width <= 500px)").matches, false);
    assert.equal(matchMedia("(300px <= device-width < 500px)").matches, false);
});

test("width & dppx", () => {
    setMedia({
        width: 600,
    });

    assert.equal(matchMedia("(device-width > 500px)").matches, true);
    assert.equal(matchMedia("(device-width < 700px)").matches, true);
    assert.equal(matchMedia("(device-width: 600px)").matches, true);

    setMedia({
        // Keep the: `width: 600`
        dppx: 2,
    });

    assert.equal(matchMedia("(device-width > 500px)").matches, true);
    assert.equal(matchMedia("(device-width < 700px)").matches, false);
    assert.equal(matchMedia("(device-width: 600px)").matches, false);
    assert.equal(matchMedia("(device-width: 1200px)").matches, true);

    setMedia({
        // Keep the `dppx: 2`
        width: 300,
    });

    assert.equal(matchMedia("(device-width > 500px)").matches, true);
    assert.equal(matchMedia("(device-width < 700px)").matches, true);
    assert.equal(matchMedia("(device-width: 600px)").matches, true);
    assert.equal(matchMedia("(device-width: 300px)").matches, false);
});
