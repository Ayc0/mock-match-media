const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial.skip("unset", (t) => {
    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, false);

    // t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, false);

    // t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial.skip("10/16", (t) => {
    setMedia({
        "aspect-ratio": "10/16",
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, false);

    // t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, true);
    // t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, true);
    // t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, false);

    // t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, true);

    // t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial.skip("9/16", (t) => {
    setMedia({
        "aspect-ratio": "9/16",
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, true);
    // t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, true);

    // t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, true);

    // t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial.skip("6/16", (t) => {
    setMedia({
        "aspect-ratio": "6/16",
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, true);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, true);

    // t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial.skip("5/16", (t) => {
    setMedia({
        "aspect-ratio": "5/16",
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial.skip("4/16", (t) => {
    setMedia({
        "aspect-ratio": "4/16",
    });

    t.is(matchMedia("(min-device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-device-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(device-aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(device-aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(device-aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < device-aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= device-aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > device-aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 > device-aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= device-aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < device-aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 < device-aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= device-aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial.skip("other syntax", (t) => {
    setMedia({
        "aspect-ratio": "16/16",
    });

    t.is(matchMedia("(device-aspect-ratio: 16/16)").matches, true);
    t.is(matchMedia("(device-aspect-ratio: 8/8)").matches, true);
    // optional second denominator
    t.is(matchMedia("(device-aspect-ratio: 1)").matches, true);
    // floats
    t.is(matchMedia("(device-aspect-ratio: 1.0)").matches, true);
    // only support floats when only 1 number
    t.is(matchMedia("(device-aspect-ratio: 16.0/16.0)").matches, false);
    // no space
    t.is(matchMedia("(device-aspect-ratio: 16 /16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 16/ 16)").matches, false);
    t.is(matchMedia("(device-aspect-ratio: 16 / 16)").matches, false);

    t.pass();
});
