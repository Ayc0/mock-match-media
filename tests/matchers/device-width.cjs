// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial.skip("unset", (t) => {
    t.is(matchMedia("(min-device-width: 500px)").matches, false);
    t.is(matchMedia("(device-width: 500px)").matches, false);
    t.is(matchMedia("(max-device-width: 500px)").matches, false);

    t.is(matchMedia("(device-width > 500px)").matches, false);
    t.is(matchMedia("(device-width >= 500px)").matches, false);
    t.is(matchMedia("(device-width < 500px)").matches, false);
    t.is(matchMedia("(device-width <= 500px)").matches, false);

    t.is(matchMedia("(500px > device-width)").matches, false);
    t.is(matchMedia("(500px >= device-width)").matches, false);
    t.is(matchMedia("(500px < device-width)").matches, false);
    t.is(matchMedia("(500px <= device-width)").matches, false);

    t.is(matchMedia("(500px > device-width > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px > device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, false);

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, false);

    t.pass();
});

test.serial.skip("600px", (t) => {
    setMedia({
        width: 600,
    });

    t.is(matchMedia("(min-device-width: 500px)").matches, true);
    t.is(matchMedia("(device-width: 500px)").matches, false);
    t.is(matchMedia("(max-device-width: 500px)").matches, false);

    t.is(matchMedia("(device-width > 500px)").matches, true);
    t.is(matchMedia("(device-width >= 500px)").matches, true);
    t.is(matchMedia("(device-width < 500px)").matches, false);
    t.is(matchMedia("(device-width <= 500px)").matches, false);

    t.is(matchMedia("(500px > device-width)").matches, false);
    t.is(matchMedia("(500px >= device-width)").matches, false);
    t.is(matchMedia("(500px < device-width)").matches, true);
    t.is(matchMedia("(500px <= device-width)").matches, true);

    t.is(matchMedia("(500px > device-width > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px > device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, false);

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, false);

    t.pass();
});

test.serial.skip("500px", (t) => {
    setMedia({
        width: 500,
    });

    t.is(matchMedia("(min-device-width: 500px)").matches, true);
    t.is(matchMedia("(device-width: 500px)").matches, true);
    t.is(matchMedia("(max-device-width: 500px)").matches, true);

    t.is(matchMedia("(device-width > 500px)").matches, false);
    t.is(matchMedia("(device-width >= 500px)").matches, true);
    t.is(matchMedia("(device-width < 500px)").matches, false);
    t.is(matchMedia("(device-width <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-width)").matches, false);
    t.is(matchMedia("(500px >= device-width)").matches, true);
    t.is(matchMedia("(500px < device-width)").matches, false);
    t.is(matchMedia("(500px <= device-width)").matches, true);

    t.is(matchMedia("(500px > device-width > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, true);

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, false);

    t.pass();
});

test.serial.skip("400px", (t) => {
    setMedia({
        width: 400,
    });

    t.is(matchMedia("(min-device-width: 500px)").matches, false);
    t.is(matchMedia("(device-width: 500px)").matches, false);
    t.is(matchMedia("(max-device-width: 500px)").matches, true);

    t.is(matchMedia("(device-width > 500px)").matches, false);
    t.is(matchMedia("(device-width >= 500px)").matches, false);
    t.is(matchMedia("(device-width < 500px)").matches, true);
    t.is(matchMedia("(device-width <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-width)").matches, true);
    t.is(matchMedia("(500px >= device-width)").matches, true);
    t.is(matchMedia("(500px < device-width)").matches, false);
    t.is(matchMedia("(500px <= device-width)").matches, false);

    t.is(matchMedia("(500px > device-width > 300px)").matches, true);
    t.is(matchMedia("(500px >= device-width >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-width >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, true);

    t.is(matchMedia("(300px < device-width < 500px)").matches, true);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, true);

    t.pass();
});

test.serial.skip("300px", (t) => {
    setMedia({
        width: 300,
    });

    t.is(matchMedia("(min-device-width: 500px)").matches, false);
    t.is(matchMedia("(device-width: 500px)").matches, false);
    t.is(matchMedia("(max-device-width: 500px)").matches, true);

    t.is(matchMedia("(device-width > 500px)").matches, false);
    t.is(matchMedia("(device-width >= 500px)").matches, false);
    t.is(matchMedia("(device-width < 500px)").matches, true);
    t.is(matchMedia("(device-width <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-width)").matches, true);
    t.is(matchMedia("(500px >= device-width)").matches, true);
    t.is(matchMedia("(500px < device-width)").matches, false);
    t.is(matchMedia("(500px <= device-width)").matches, false);

    t.is(matchMedia("(500px > device-width > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-width >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, false);

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, true);

    t.pass();
});

test.serial.skip("200px", (t) => {
    setMedia({
        width: 200,
    });

    t.is(matchMedia("(min-device-width: 500px)").matches, false);
    t.is(matchMedia("(device-width: 500px)").matches, false);
    t.is(matchMedia("(max-device-width: 500px)").matches, true);

    t.is(matchMedia("(device-width > 500px)").matches, false);
    t.is(matchMedia("(device-width >= 500px)").matches, false);
    t.is(matchMedia("(device-width < 500px)").matches, true);
    t.is(matchMedia("(device-width <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-width)").matches, true);
    t.is(matchMedia("(500px >= device-width)").matches, true);
    t.is(matchMedia("(500px < device-width)").matches, false);
    t.is(matchMedia("(500px <= device-width)").matches, false);

    t.is(matchMedia("(500px > device-width > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px > device-width >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, false);

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, false);

    t.pass();
});
