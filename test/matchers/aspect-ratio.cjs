// @ts-check

const { test } = require("node:test");
const { strict: assert } = require("node:assert");
const { matchMedia, setMedia, cleanup } = require("mock-match-media");
const { mock } = require("../utils.cjs");

test.beforeEach(() => {
    cleanup();
});

test("unset", () => {
    assert.equal(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-aspect-ratio: 9/16)").matches, false);

    assert.equal(matchMedia("(aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio <= 9/16)").matches, false);

    assert.equal(matchMedia("(9/16 > aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 < aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);
});

test("10/16", () => {
    setMedia({
        width: 10,
        height: 16,
    });

    assert.equal(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-aspect-ratio: 9/16)").matches, false);

    assert.equal(matchMedia("(aspect-ratio > 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio >= 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio <= 9/16)").matches, false);

    assert.equal(matchMedia("(9/16 > aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 < aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 <= aspect-ratio)").matches, true);

    assert.equal(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);
});

test("9/16", () => {
    setMedia({
        width: 9,
        height: 16,
    });

    assert.equal(matchMedia("(min-aspect-ratio: 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio: 9/16)").matches, true);
    assert.equal(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio >= 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= aspect-ratio)").matches, true);

    assert.equal(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    assert.equal(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    assert.equal(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);
});

test("6/16", () => {
    setMedia({
        width: 6,
        height: 16,
    });

    assert.equal(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, true);

    assert.equal(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, true);
});

test("5/16", () => {
    setMedia({
        width: 5,
        height: 16,
    });

    assert.equal(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, true);
    assert.equal(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, true);
    assert.equal(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, true);
});

test("4/16", () => {
    setMedia({
        width: 4,
        height: 16,
    });

    assert.equal(matchMedia("(min-aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio: 9/16)").matches, false);
    assert.equal(matchMedia("(max-aspect-ratio: 9/16)").matches, true);

    assert.equal(matchMedia("(aspect-ratio > 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio >= 9/16)").matches, false);
    assert.equal(matchMedia("(aspect-ratio < 9/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio <= 9/16)").matches, true);

    assert.equal(matchMedia("(9/16 > aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 >= aspect-ratio)").matches, true);
    assert.equal(matchMedia("(9/16 < aspect-ratio)").matches, false);
    assert.equal(matchMedia("(9/16 <= aspect-ratio)").matches, false);

    assert.equal(matchMedia("(9/16 > aspect-ratio > 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 > aspect-ratio >= 5/16)").matches, false);
    assert.equal(matchMedia("(9/16 >= aspect-ratio > 5/16)").matches, false);

    assert.equal(matchMedia("(5/16 < aspect-ratio < 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 < aspect-ratio <= 9/16)").matches, false);
    assert.equal(matchMedia("(5/16 <= aspect-ratio < 9/16)").matches, false);
});

test("other syntax", () => {
    setMedia({
        width: 16,
        height: 16,
    });

    assert.equal(matchMedia("(aspect-ratio: 16/16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio: 8/8)").matches, true);
    // optional second denominator
    assert.equal(matchMedia("(aspect-ratio: 1)").matches, true);
    // floats
    assert.equal(matchMedia("(aspect-ratio: 1.0)").matches, true);
    // only support floats when only 1 number – TO CHECK
    assert.equal(matchMedia("(aspect-ratio: 16.0/16.0)").matches, true);
    // can have spaces
    assert.equal(matchMedia("(aspect-ratio: 16/ 16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio: 16 /16)").matches, true);
    assert.equal(matchMedia("(aspect-ratio: 16 / 16)").matches, true);

    setMedia({
        width: 2,
        height: 1,
    });
    assert.equal(matchMedia("(aspect-ratio: 32/16)").matches, true);

    setMedia({
        width: 3,
        height: 2,
    });
    assert.equal(matchMedia("(aspect-ratio: 3/2)").matches, true);

    setMedia({
        width: 1,
        height: 1,
    });
    assert.equal(matchMedia("(aspect-ratio: 1)").matches, true);

    setMedia({
        width: 2,
        height: 1,
    });
    assert.equal(matchMedia("(aspect-ratio: 2)").matches, true);

    setMedia({
        width: 6,
        height: 2,
    });
    assert.equal(matchMedia("(aspect-ratio: 3)").matches, true);
});

test("`.addEventListener()`", () => {
    const mqlAR3 = matchMedia("(aspect-ratio > 3)");
    const [cb, calls] = mock();

    mqlAR3.addEventListener("change", cb);

    assert.equal(matchMedia("(aspect-ratio > 3)").matches, false);

    setMedia({
        width: 7,
    });

    assert.equal(matchMedia("(aspect-ratio > 3)").matches, false);
    assert.equal(calls.length, 0);

    setMedia({
        height: 2,
    });

    assert.equal(matchMedia("(aspect-ratio > 3)").matches, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].matches, true);

    setMedia({
        height: 3,
    });

    assert.equal(matchMedia("(aspect-ratio > 3)").matches, false);
    assert.equal(calls.length, 2);
    assert.equal(calls[1].matches, false);
});
