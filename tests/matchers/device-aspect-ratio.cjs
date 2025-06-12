// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

// TODO: Seems to be a bug? To investigate. Maybe because the default aspect ratio is 0/0
test.serial.skip("unset", (t) => {
    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, false);

    t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, false);

    t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("10/16", (t) => {
    setMedia({
        deviceWidth: 10,
        deviceHeight: 16,
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, false);

    t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, false);

    t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, true);

    t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("9/16", (t) => {
    setMedia({
        deviceWidth: 9,
        deviceHeight: 16,
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, true);

    t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("6/16", (t) => {
    setMedia({
        deviceWidth: 6,
        deviceHeight: 16,
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, true);
    t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, true);

    t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial("5/16", (t) => {
    setMedia({
        deviceWidth: 5,
        deviceHeight: 16,
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial("4/16", (t) => {
    setMedia({
        deviceWidth: 4,
        deviceHeight: 16,
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("other syntax", (t) => {
    setMedia({
        deviceWidth: 16,
        deviceHeight: 16,
    });

    t.is(matchMedia("(device-aspect-ratio: 16/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 8/8)").matches, true);
    // optional second denominator
    t.is(matchMedia("(device-aspect-ratio: 1)").matches, true);
    // floats
    t.is(matchMedia("(device-aspect-ratio: 1.0)").matches, true);
    // only support floats when only 1 number – to check
    t.is(matchMedia("(device-aspect-ratio: 16.0/16.0)").matches, true);
    // can have spaces
    t.is(matchMedia("(device-aspect-ratio: 16 / 16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 16 / 16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 16 / 16)").matches, true);

    t.pass();
});
