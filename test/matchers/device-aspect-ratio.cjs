// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test("unset", () => {
    assert.equal(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-device-aspect-ratio: 9/16)").matches, false);

    assert.equal(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio <= 9/16)").matches, false);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);
});

test("10/16", () => {
    setMedia({
        deviceWidth: 10,
        deviceHeight: 16,
    });

    assert.equal(matchMedia("(min-device-aspect-ratio: 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-device-aspect-ratio: 9/16)").matches, false);

    assert.equal(matchMedia("(device-aspect-ratio > 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio >= 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio <= 9/16)").matches, false);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 < device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 <= device-aspect-ratio)").matches, true);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);
});

test("9/16", () => {
    setMedia({
        deviceWidth: 9,
        deviceHeight: 16,
    });

    assert.equal(matchMedia("(min-device-aspect-ratio: 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio: 9/16)").matches, true);
    assert.equal(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio >= 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= device-aspect-ratio)").matches, true);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    assert.equal(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);
});

test("6/16", () => {
    setMedia({
        deviceWidth: 6,
        deviceHeight: 16,
    });

    assert.equal(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, true);

    assert.equal(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, true);
});

test("5/16", () => {
    setMedia({
        deviceWidth: 5,
        deviceHeight: 16,
    });

    assert.equal(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, true);
});

test("4/16", () => {
    setMedia({
        deviceWidth: 4,
        deviceHeight: 16,
    });

    assert.equal(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);
});

test("other syntax", () => {
    setMedia({
        deviceWidth: 16,
        deviceHeight: 16,
    });

    assert.equal(matchMedia("(device-aspect-ratio: 16/16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio: 8/8)").matches, true);
    // optional second denominator
    assert.equal(matchMedia("(device-aspect-ratio: 1)").matches, true);
    // floats
    assert.equal(matchMedia("(device-aspect-ratio: 1.0)").matches, true);
    // only support floats when only 1 number – to check
    assert.equal(matchMedia("(device-aspect-ratio: 16.0/16.0)").matches, true);
    // can have spaces
    assert.equal(matchMedia("(device-aspect-ratio: 16 / 16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio: 16 / 16)").matches, true);
    assert.equal(matchMedia("(device-aspect-ratio: 16 / 16)").matches, true);
});
