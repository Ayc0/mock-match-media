const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, false);

    // t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio <= 9/16)").matches, false);

    // t.is(matchMedia("(9/16 > aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("10/16", (t) => {
    setMedia({
        "aspect-ratio": "10/16",
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, false);

    // t.is(matchMedia("(aspect-ratio > 9/16)").matches, true);
    // t.is(matchMedia("(aspect-ratio >= 9/16)").matches, true);
    // t.is(matchMedia("(aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio <= 9/16)").matches, false);

    // t.is(matchMedia("(9/16 > aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 < aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 <= aspect-ratio)").matches, true);

    // t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("9/16", (t) => {
    setMedia({
        "aspect-ratio": "9/16",
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio >= 9/16)").matches, true);
    // t.is(matchMedia("(aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= aspect-ratio)").matches, true);

    // t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, true);

    // t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("6/16", (t) => {
    setMedia({
        "aspect-ratio": "6/16",
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, true);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, true);

    // t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial("5/16", (t) => {
    setMedia({
        "aspect-ratio": "5/16",
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, true);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    // t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial("4/16", (t) => {
    setMedia({
        "aspect-ratio": "4/16",
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    // t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    // t.is(matchMedia("(aspect-ratio < 9/16)").matches, true);
    // t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    // t.is(matchMedia("(9/16 > aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    // t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    // t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    // t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    // t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    // t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("other syntax", (t) => {
    setMedia({
        "aspect-ratio": "16/16",
    });

    t.is(matchMedia("(aspect-ratio: 16/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 8/8)").matches, true);
    // optional second denominator
    t.is(matchMedia("(aspect-ratio: 1)").matches, true);
    // floats
    t.is(matchMedia("(aspect-ratio: 1.0)").matches, true);
    // only support floats when only 1 number
    t.is(matchMedia("(aspect-ratio: 16.0/16.0)").matches, false);
    // no space
    t.is(matchMedia("(aspect-ratio: 16 /16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 16/ 16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 16 / 16)").matches, false);

    t.pass();
});
