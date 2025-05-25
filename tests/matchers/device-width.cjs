// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
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

test.serial("device 600px", (t) => {
    setMedia({
        deviceWidth: 600,
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

test.serial("device 500px", (t) => {
    setMedia({
        deviceWidth: 500,
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
    // t.is(matchMedia("(500px >= device-width >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(500px > device-width >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= device-width > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, false);

    t.pass();
});

test.serial("device 400px", (t) => {
    setMedia({
        deviceWidth: 400,
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

test.serial("device 300px", (t) => {
    setMedia({
        deviceWidth: 300,
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
    // t.is(matchMedia("(500px >= device-width >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(500px > device-width >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-width > 300px)").matches, false);

    t.is(matchMedia("(300px < device-width < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-width <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-width < 500px)").matches, true);

    t.pass();
});

test.serial("device 200px", (t) => {
    setMedia({
        deviceWidth: 200,
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

test.serial("width & dppx", (t) => {
    setMedia({
        width: 600,
    });

    t.is(matchMedia("(device-width > 500px)").matches, true);
    t.is(matchMedia("(device-width < 700px)").matches, true);
    t.is(matchMedia("(device-width: 600px)").matches, true);

    setMedia({
        // Keep the: `width: 600`
        dppx: 2,
    });

    t.is(matchMedia("(device-width > 500px)").matches, true);
    t.is(matchMedia("(device-width < 700px)").matches, false);
    t.is(matchMedia("(device-width: 600px)").matches, false);
    t.is(matchMedia("(device-width: 1200px)").matches, true);

    setMedia({
        // Keep the `dppx: 2`
        width: 300,
    });

    t.is(matchMedia("(device-width > 500px)").matches, true);
    t.is(matchMedia("(device-width < 700px)").matches, true);
    t.is(matchMedia("(device-width: 600px)").matches, true);
    t.is(matchMedia("(device-width: 300px)").matches, false);

    t.pass();
});
