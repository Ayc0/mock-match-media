const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
    t.is(matchMedia("(min-width: 500px)").matches, false);
    t.is(matchMedia("(width: 500px)").matches, false);
    t.is(matchMedia("(max-width: 500px)").matches, false);

    // t.is(matchMedia("(width > 500px)").matches, false);
    // t.is(matchMedia("(width >= 500px)").matches, false);
    // t.is(matchMedia("(width < 500px)").matches, false);
    // t.is(matchMedia("(width <= 500px)").matches, false);

    // t.is(matchMedia("(500px > width)").matches, false);
    // t.is(matchMedia("(500px >= width)").matches, false);
    // t.is(matchMedia("(500px < width)").matches, false);
    // t.is(matchMedia("(500px <= width)").matches, false);

    // t.is(matchMedia("(500px > width > 300px)").matches, false);
    // t.is(matchMedia("(500px >= width >= 300px)").matches, false);
    // t.is(matchMedia("(500px > width >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= width > 300px)").matches, false);

    // t.is(matchMedia("(300px < width < 500px)").matches, false);
    // t.is(matchMedia("(300px <= width <= 500px)").matches, false);
    // t.is(matchMedia("(300px < width <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= width < 500px)").matches, false);

    t.pass();
});

test.serial("600px", (t) => {
    setMedia({
        width: "600px",
    });

    t.is(matchMedia("(min-width: 500px)").matches, true);
    t.is(matchMedia("(width: 500px)").matches, false);
    t.is(matchMedia("(max-width: 500px)").matches, false);

    // t.is(matchMedia("(width > 500px)").matches, true);
    // t.is(matchMedia("(width >= 500px)").matches, true);
    // t.is(matchMedia("(width < 500px)").matches, false);
    // t.is(matchMedia("(width <= 500px)").matches, false);

    // t.is(matchMedia("(500px > width)").matches, false);
    // t.is(matchMedia("(500px >= width)").matches, false);
    // t.is(matchMedia("(500px < width)").matches, true);
    // t.is(matchMedia("(500px <= width)").matches, true);

    // t.is(matchMedia("(500px > width > 300px)").matches, false);
    // t.is(matchMedia("(500px >= width >= 300px)").matches, false);
    // t.is(matchMedia("(500px > width >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= width > 300px)").matches, false);

    // t.is(matchMedia("(300px < width < 500px)").matches, false);
    // t.is(matchMedia("(300px <= width <= 500px)").matches, false);
    // t.is(matchMedia("(300px < width <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= width < 500px)").matches, false);

    t.pass();
});

test.serial("500px", (t) => {
    setMedia({
        width: "500px",
    });

    t.is(matchMedia("(min-width: 500px)").matches, true);
    t.is(matchMedia("(width: 500px)").matches, true);
    t.is(matchMedia("(max-width: 500px)").matches, true);

    // t.is(matchMedia("(width > 500px)").matches, false);
    // t.is(matchMedia("(width >= 500px)").matches, true);
    // t.is(matchMedia("(width < 500px)").matches, false);
    // t.is(matchMedia("(width <= 500px)").matches, true);

    // t.is(matchMedia("(500px > width)").matches, false);
    // t.is(matchMedia("(500px >= width)").matches, true);
    // t.is(matchMedia("(500px < width)").matches, false);
    // t.is(matchMedia("(500px <= width)").matches, true);

    // t.is(matchMedia("(500px > width > 300px)").matches, false);
    // t.is(matchMedia("(500px >= width >= 300px)").matches, true);
    // t.is(matchMedia("(500px > width >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= width > 300px)").matches, true);

    // t.is(matchMedia("(300px < width < 500px)").matches, false);
    // t.is(matchMedia("(300px <= width <= 500px)").matches, true);
    // t.is(matchMedia("(300px < width <= 500px)").matches, true);
    // t.is(matchMedia("(300px <= width < 500px)").matches, false);

    t.pass();
});

test.serial("400px", (t) => {
    setMedia({
        width: "400px",
    });

    t.is(matchMedia("(min-width: 500px)").matches, false);
    t.is(matchMedia("(width: 500px)").matches, false);
    t.is(matchMedia("(max-width: 500px)").matches, true);

    // t.is(matchMedia("(width > 500px)").matches, false);
    // t.is(matchMedia("(width >= 500px)").matches, false);
    // t.is(matchMedia("(width < 500px)").matches, true);
    // t.is(matchMedia("(width <= 500px)").matches, true);

    // t.is(matchMedia("(500px > width)").matches, true);
    // t.is(matchMedia("(500px >= width)").matches, true);
    // t.is(matchMedia("(500px < width)").matches, false);
    // t.is(matchMedia("(500px <= width)").matches, false);

    // t.is(matchMedia("(500px > width > 300px)").matches, true);
    // t.is(matchMedia("(500px >= width >= 300px)").matches, true);
    // t.is(matchMedia("(500px > width >= 300px)").matches, true);
    // t.is(matchMedia("(500px >= width > 300px)").matches, true);

    // t.is(matchMedia("(300px < width < 500px)").matches, true);
    // t.is(matchMedia("(300px <= width <= 500px)").matches, true);
    // t.is(matchMedia("(300px < width <= 500px)").matches, true);
    // t.is(matchMedia("(300px <= width < 500px)").matches, true);

    t.pass();
});

test.serial("300px", (t) => {
    setMedia({
        width: "300px",
    });

    t.is(matchMedia("(min-width: 500px)").matches, false);
    t.is(matchMedia("(width: 500px)").matches, false);
    t.is(matchMedia("(max-width: 500px)").matches, true);

    // t.is(matchMedia("(width > 500px)").matches, false);
    // t.is(matchMedia("(width >= 500px)").matches, false);
    // t.is(matchMedia("(width < 500px)").matches, true);
    // t.is(matchMedia("(width <= 500px)").matches, true);

    // t.is(matchMedia("(500px > width)").matches, true);
    // t.is(matchMedia("(500px >= width)").matches, true);
    // t.is(matchMedia("(500px < width)").matches, false);
    // t.is(matchMedia("(500px <= width)").matches, false);

    // t.is(matchMedia("(500px > width > 300px)").matches, false);
    // t.is(matchMedia("(500px >= width >= 300px)").matches, true);
    // t.is(matchMedia("(500px > width >= 300px)").matches, true);
    // t.is(matchMedia("(500px >= width > 300px)").matches, false);

    // t.is(matchMedia("(300px < width < 500px)").matches, false);
    // t.is(matchMedia("(300px <= width <= 500px)").matches, true);
    // t.is(matchMedia("(300px < width <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= width < 500px)").matches, true);

    t.pass();
});

test.serial("200px", (t) => {
    setMedia({
        width: "200px",
    });

    t.is(matchMedia("(min-width: 500px)").matches, false);
    t.is(matchMedia("(width: 500px)").matches, false);
    t.is(matchMedia("(max-width: 500px)").matches, true);

    // t.is(matchMedia("(width > 500px)").matches, false);
    // t.is(matchMedia("(width >= 500px)").matches, false);
    // t.is(matchMedia("(width < 500px)").matches, true);
    // t.is(matchMedia("(width <= 500px)").matches, true);

    // t.is(matchMedia("(500px > width)").matches, true);
    // t.is(matchMedia("(500px >= width)").matches, true);
    // t.is(matchMedia("(500px < width)").matches, false);
    // t.is(matchMedia("(500px <= width)").matches, false);

    // t.is(matchMedia("(500px > width > 300px)").matches, false);
    // t.is(matchMedia("(500px >= width >= 300px)").matches, false);
    // t.is(matchMedia("(500px > width >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= width > 300px)").matches, false);

    // t.is(matchMedia("(300px < width < 500px)").matches, false);
    // t.is(matchMedia("(300px <= width <= 500px)").matches, false);
    // t.is(matchMedia("(300px < width <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= width < 500px)").matches, false);

    t.pass();
});