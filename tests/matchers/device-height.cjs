// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
    t.is(matchMedia("(min-device-height: 500px)").matches, false);
    t.is(matchMedia("(device-height: 500px)").matches, false);
    t.is(matchMedia("(max-device-height: 500px)").matches, true);

    t.is(matchMedia("(device-height > 500px)").matches, false);
    t.is(matchMedia("(device-height >= 500px)").matches, false);
    t.is(matchMedia("(device-height < 500px)").matches, true);
    t.is(matchMedia("(device-height <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-height)").matches, true);
    t.is(matchMedia("(500px >= device-height)").matches, true);
    t.is(matchMedia("(500px < device-height)").matches, false);
    t.is(matchMedia("(500px <= device-height)").matches, false);

    t.is(matchMedia("(500px > device-height > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, false);

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, false);

    t.pass();
});

test.serial("600px", (t) => {
    setMedia({
        deviceHeight: 600,
    });

    t.is(matchMedia("(min-device-height: 500px)").matches, true);
    t.is(matchMedia("(device-height: 500px)").matches, false);
    t.is(matchMedia("(max-device-height: 500px)").matches, false);

    t.is(matchMedia("(device-height > 500px)").matches, true);
    t.is(matchMedia("(device-height >= 500px)").matches, true);
    t.is(matchMedia("(device-height < 500px)").matches, false);
    t.is(matchMedia("(device-height <= 500px)").matches, false);

    t.is(matchMedia("(500px > device-height)").matches, false);
    t.is(matchMedia("(500px >= device-height)").matches, false);
    t.is(matchMedia("(500px < device-height)").matches, true);
    t.is(matchMedia("(500px <= device-height)").matches, true);

    t.is(matchMedia("(500px > device-height > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, false);

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, false);

    t.pass();
});

test.serial("500px", (t) => {
    setMedia({
        deviceHeight: 500,
    });

    t.is(matchMedia("(min-device-height: 500px)").matches, true);
    t.is(matchMedia("(device-height: 500px)").matches, true);
    t.is(matchMedia("(max-device-height: 500px)").matches, true);

    t.is(matchMedia("(device-height > 500px)").matches, false);
    t.is(matchMedia("(device-height >= 500px)").matches, true);
    t.is(matchMedia("(device-height < 500px)").matches, false);
    t.is(matchMedia("(device-height <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-height)").matches, false);
    t.is(matchMedia("(500px >= device-height)").matches, true);
    t.is(matchMedia("(500px < device-height)").matches, false);
    t.is(matchMedia("(500px <= device-height)").matches, true);

    t.is(matchMedia("(500px > device-height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= device-height >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(500px > device-height >= 300px)").matches, false);
    // t.is(matchMedia("(500px >= device-height > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, false);

    t.pass();
});

test.serial("400px", (t) => {
    setMedia({
        deviceHeight: 400,
    });

    t.is(matchMedia("(min-device-height: 500px)").matches, false);
    t.is(matchMedia("(device-height: 500px)").matches, false);
    t.is(matchMedia("(max-device-height: 500px)").matches, true);

    t.is(matchMedia("(device-height > 500px)").matches, false);
    t.is(matchMedia("(device-height >= 500px)").matches, false);
    t.is(matchMedia("(device-height < 500px)").matches, true);
    t.is(matchMedia("(device-height <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-height)").matches, true);
    t.is(matchMedia("(500px >= device-height)").matches, true);
    t.is(matchMedia("(500px < device-height)").matches, false);
    t.is(matchMedia("(500px <= device-height)").matches, false);

    // t.is(matchMedia("(500px > device-height > 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, true);

    t.is(matchMedia("(300px < device-height < 500px)").matches, true);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, true);

    t.pass();
});

test.serial("300px", (t) => {
    setMedia({
        deviceHeight: 300,
    });

    t.is(matchMedia("(min-device-height: 500px)").matches, false);
    t.is(matchMedia("(device-height: 500px)").matches, false);
    t.is(matchMedia("(max-device-height: 500px)").matches, true);

    t.is(matchMedia("(device-height > 500px)").matches, false);
    t.is(matchMedia("(device-height >= 500px)").matches, false);
    t.is(matchMedia("(device-height < 500px)").matches, true);
    t.is(matchMedia("(device-height <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-height)").matches, true);
    t.is(matchMedia("(500px >= device-height)").matches, true);
    t.is(matchMedia("(500px < device-height)").matches, false);
    t.is(matchMedia("(500px <= device-height)").matches, false);

    t.is(matchMedia("(500px > device-height > 300px)").matches, false);
    // t.is(matchMedia("(500px >= device-height >= 300px)").matches, true); // Bug in media-query-fns https://github.com/tbjgolden/media-query-fns/issues/7
    t.is(matchMedia("(500px > device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, false);

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, true);

    t.pass();
});

test.serial("200px", (t) => {
    setMedia({
        deviceHeight: 200,
    });

    t.is(matchMedia("(min-device-height: 500px)").matches, false);
    t.is(matchMedia("(device-height: 500px)").matches, false);
    t.is(matchMedia("(max-device-height: 500px)").matches, true);

    t.is(matchMedia("(device-height > 500px)").matches, false);
    t.is(matchMedia("(device-height >= 500px)").matches, false);
    t.is(matchMedia("(device-height < 500px)").matches, true);
    t.is(matchMedia("(device-height <= 500px)").matches, true);

    t.is(matchMedia("(500px > device-height)").matches, true);
    t.is(matchMedia("(500px >= device-height)").matches, true);
    t.is(matchMedia("(500px < device-height)").matches, false);
    t.is(matchMedia("(500px <= device-height)").matches, false);

    t.is(matchMedia("(500px > device-height > 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, false);

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, false);

    t.pass();
});
