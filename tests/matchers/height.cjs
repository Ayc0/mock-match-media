const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
    t.is(matchMedia("(min-height: 500px)").matches, false);
    t.is(matchMedia("(height: 500px)").matches, false);
    t.is(matchMedia("(max-height: 500px)").matches, false);

    // t.is(matchMedia("(height > 500px)").matches, false);
    // t.is(matchMedia("(height >= 500px)").matches, false);
    // t.is(matchMedia("(height < 500px)").matches, false);
    // t.is(matchMedia("(height <= 500px)").matches, false);

    // t.is(matchMedia("(500px > height)").matches, false);
    // t.is(matchMedia("(500px >= height)").matches, false);
    // t.is(matchMedia("(500px < height)").matches, false);
    // t.is(matchMedia("(500px <= height)").matches, false);

    // t.is(matchMedia("(500px > height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= height >= 300px)").matches, false);
    // t.is(matchMedia("(500px > height >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= height > 300px)").matches, false);

    // t.is(matchMedia("(300px < height < 500px)").matches, false);
    // t.is(matchMedia("(300px <= height <= 500px)").matches, false);
    // t.is(matchMedia("(300px < height <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= height < 500px)").matches, false);

    t.pass();
});

test.serial("600px", (t) => {
    setMedia({
        height: "600px",
    });

    t.is(matchMedia("(min-height: 500px)").matches, true);
    t.is(matchMedia("(height: 500px)").matches, false);
    t.is(matchMedia("(max-height: 500px)").matches, false);

    // t.is(matchMedia("(height > 500px)").matches, true);
    // t.is(matchMedia("(height >= 500px)").matches, true);
    // t.is(matchMedia("(height < 500px)").matches, false);
    // t.is(matchMedia("(height <= 500px)").matches, false);

    // t.is(matchMedia("(500px > height)").matches, false);
    // t.is(matchMedia("(500px >= height)").matches, false);
    // t.is(matchMedia("(500px < height)").matches, true);
    // t.is(matchMedia("(500px <= height)").matches, true);

    // t.is(matchMedia("(500px > height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= height >= 300px)").matches, false);
    // t.is(matchMedia("(500px > height >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= height > 300px)").matches, false);

    // t.is(matchMedia("(300px < height < 500px)").matches, false);
    // t.is(matchMedia("(300px <= height <= 500px)").matches, false);
    // t.is(matchMedia("(300px < height <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= height < 500px)").matches, false);

    t.pass();
});

test.serial("500px", (t) => {
    setMedia({
        height: "500px",
    });

    t.is(matchMedia("(min-height: 500px)").matches, true);
    t.is(matchMedia("(height: 500px)").matches, true);
    t.is(matchMedia("(max-height: 500px)").matches, true);

    // t.is(matchMedia("(height > 500px)").matches, false);
    // t.is(matchMedia("(height >= 500px)").matches, true);
    // t.is(matchMedia("(height < 500px)").matches, false);
    // t.is(matchMedia("(height <= 500px)").matches, true);

    // t.is(matchMedia("(500px > height)").matches, false);
    // t.is(matchMedia("(500px >= height)").matches, true);
    // t.is(matchMedia("(500px < height)").matches, false);
    // t.is(matchMedia("(500px <= height)").matches, true);

    // t.is(matchMedia("(500px > height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= height >= 300px)").matches, true);
    // t.is(matchMedia("(500px > height >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= height > 300px)").matches, true);

    // t.is(matchMedia("(300px < height < 500px)").matches, false);
    // t.is(matchMedia("(300px <= height <= 500px)").matches, true);
    // t.is(matchMedia("(300px < height <= 500px)").matches, true);
    // t.is(matchMedia("(300px <= height < 500px)").matches, false);

    t.pass();
});

test.serial("400px", (t) => {
    setMedia({
        height: "400px",
    });

    t.is(matchMedia("(min-height: 500px)").matches, false);
    t.is(matchMedia("(height: 500px)").matches, false);
    t.is(matchMedia("(max-height: 500px)").matches, true);

    // t.is(matchMedia("(height > 500px)").matches, false);
    // t.is(matchMedia("(height >= 500px)").matches, false);
    // t.is(matchMedia("(height < 500px)").matches, true);
    // t.is(matchMedia("(height <= 500px)").matches, true);

    // t.is(matchMedia("(500px > height)").matches, true);
    // t.is(matchMedia("(500px >= height)").matches, true);
    // t.is(matchMedia("(500px < height)").matches, false);
    // t.is(matchMedia("(500px <= height)").matches, false);

    // t.is(matchMedia("(500px > height > 300px)").matches, true);
    // t.is(matchMedia("(500px >= height >= 300px)").matches, true);
    // t.is(matchMedia("(500px > height >= 300px)").matches, true);
    // t.is(matchMedia("(500px >= height > 300px)").matches, true);

    // t.is(matchMedia("(300px < height < 500px)").matches, true);
    // t.is(matchMedia("(300px <= height <= 500px)").matches, true);
    // t.is(matchMedia("(300px < height <= 500px)").matches, true);
    // t.is(matchMedia("(300px <= height < 500px)").matches, true);

    t.pass();
});

test.serial("300px", (t) => {
    setMedia({
        height: "300px",
    });

    t.is(matchMedia("(min-height: 500px)").matches, false);
    t.is(matchMedia("(height: 500px)").matches, false);
    t.is(matchMedia("(max-height: 500px)").matches, true);

    // t.is(matchMedia("(height > 500px)").matches, false);
    // t.is(matchMedia("(height >= 500px)").matches, false);
    // t.is(matchMedia("(height < 500px)").matches, true);
    // t.is(matchMedia("(height <= 500px)").matches, true);

    // t.is(matchMedia("(500px > height)").matches, true);
    // t.is(matchMedia("(500px >= height)").matches, true);
    // t.is(matchMedia("(500px < height)").matches, false);
    // t.is(matchMedia("(500px <= height)").matches, false);

    // t.is(matchMedia("(500px > height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= height >= 300px)").matches, true);
    // t.is(matchMedia("(500px > height >= 300px)").matches, true);
    // t.is(matchMedia("(500px >= height > 300px)").matches, false);

    // t.is(matchMedia("(300px < height < 500px)").matches, false);
    // t.is(matchMedia("(300px <= height <= 500px)").matches, true);
    // t.is(matchMedia("(300px < height <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= height < 500px)").matches, true);

    t.pass();
});

test.serial("200px", (t) => {
    setMedia({
        height: "200px",
    });

    t.is(matchMedia("(min-height: 500px)").matches, false);
    t.is(matchMedia("(height: 500px)").matches, false);
    t.is(matchMedia("(max-height: 500px)").matches, true);

    // t.is(matchMedia("(height > 500px)").matches, false);
    // t.is(matchMedia("(height >= 500px)").matches, false);
    // t.is(matchMedia("(height < 500px)").matches, true);
    // t.is(matchMedia("(height <= 500px)").matches, true);

    // t.is(matchMedia("(500px > height)").matches, true);
    // t.is(matchMedia("(500px >= height)").matches, true);
    // t.is(matchMedia("(500px < height)").matches, false);
    // t.is(matchMedia("(500px <= height)").matches, false);

    // t.is(matchMedia("(500px > height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= height >= 300px)").matches, false);
    // t.is(matchMedia("(500px > height >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= height > 300px)").matches, false);

    // t.is(matchMedia("(300px < height < 500px)").matches, false);
    // t.is(matchMedia("(300px <= height <= 500px)").matches, false);
    // t.is(matchMedia("(300px < height <= 500px)").matches, false);
    // t.is(matchMedia("(300px <= height < 500px)").matches, false);

    t.pass();
});
