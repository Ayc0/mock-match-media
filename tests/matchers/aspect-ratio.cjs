// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

// TODO: Seems to be a bug? To investigate. Maybe because the default aspect ratio is 0/0
test.serial.skip("unset", (t) => {
    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, false);

    t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio <= 9/16)").matches, false);

    t.is(matchMedia("(9/16 > aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("10/16", (t) => {
    setMedia({
        width: 10,
        height: 16,
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, false);

    t.is(matchMedia("(aspect-ratio > 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio >= 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio <= 9/16)").matches, false);

    t.is(matchMedia("(9/16 > aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 < aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 <= aspect-ratio)").matches, true);

    t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("9/16", (t) => {
    setMedia({
        width: 9,
        height: 16,
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, true);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio >= 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= aspect-ratio)").matches, true);

    t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    // t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("6/16", (t) => {
    setMedia({
        width: 6,
        height: 16,
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, true);
    t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, true);

    t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial("5/16", (t) => {
    setMedia({
        width: 5,
        height: 16,
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, true);
    t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, true);

    t.pass();
});

test.serial("4/16", (t) => {
    setMedia({
        width: 4,
        height: 16,
    });

    t.is(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio: 9/16)").matches, false);
    t.is(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    t.is(matchMedia("(aspect-ratio > 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    t.is(matchMedia("(aspect-ratio < 9/16)").matches, true);
    t.is(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    t.is(matchMedia("(9/16 > aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    t.is(matchMedia("(9/16 < aspect-ratio)").matches, false);
    t.is(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    t.is(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    t.is(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    t.is(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    t.is(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);

    t.pass();
});

test.serial("other syntax", (t) => {
    setMedia({
        width: 16,
        height: 16,
    });

    t.is(matchMedia("(aspect-ratio: 16/16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 8/8)").matches, true);
    // optional second denominator
    t.is(matchMedia("(aspect-ratio: 1)").matches, true);
    // floats
    t.is(matchMedia("(aspect-ratio: 1.0)").matches, true);
    // only support floats when only 1 number – TO CHECK
    // t.is(matchMedia("(aspect-ratio: 16.0/16.0)").matches, true);
    // can have spaces
    t.is(matchMedia("(aspect-ratio: 16/ 16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 16 /16)").matches, true);
    t.is(matchMedia("(aspect-ratio: 16 / 16)").matches, true);

    setMedia({
        width: 2,
        height: 1,
    });
    t.is(matchMedia("(aspect-ratio: 32/16)").matches, true);

    setMedia({
        width: 3,
        height: 2,
    });
    t.is(matchMedia("(aspect-ratio: 3/2)").matches, true);

    setMedia({
        width: 1,
        height: 1,
    });
    t.is(matchMedia("(aspect-ratio: 1)").matches, true);

    setMedia({
        width: 2,
        height: 1,
    });
    t.is(matchMedia("(aspect-ratio: 2)").matches, true);

    setMedia({
        width: 6,
        height: 2,
    });
    t.is(matchMedia("(aspect-ratio: 3)").matches, true);

    t.pass();
});
