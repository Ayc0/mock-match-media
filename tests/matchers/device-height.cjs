const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial.skip("unset", (t) => {
    t.is(matchMedia("(min-device-height: 500px)").matches, false);
    t.is(matchMedia("(device-height: 500px)").matches, false);
    t.is(matchMedia("(max-device-height: 500px)").matches, false);

    t.is(matchMedia("(device-height > 500px)").matches, false);
    t.is(matchMedia("(device-height >= 500px)").matches, false);
    t.is(matchMedia("(device-height < 500px)").matches, false);
    t.is(matchMedia("(device-height <= 500px)").matches, false);

    t.is(matchMedia("(500px > device-height)").matches, false);
    t.is(matchMedia("(500px >= device-height)").matches, false);
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

test.serial.skip("600px", (t) => {
    setMedia({
        height: 600,
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

test.serial.skip("500px", (t) => {
    setMedia({
        height: 500,
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
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, false);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, true);

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, false);

    t.pass();
});

test.serial.skip("400px", (t) => {
    setMedia({
        height: 400,
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

    t.is(matchMedia("(500px > device-height > 300px)").matches, true);
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, true);

    t.is(matchMedia("(300px < device-height < 500px)").matches, true);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, true);

    t.pass();
});

test.serial.skip("300px", (t) => {
    setMedia({
        height: 300,
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
    t.is(matchMedia("(500px >= device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px > device-height >= 300px)").matches, true);
    t.is(matchMedia("(500px >= device-height > 300px)").matches, false);

    t.is(matchMedia("(300px < device-height < 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height <= 500px)").matches, true);
    t.is(matchMedia("(300px < device-height <= 500px)").matches, false);
    t.is(matchMedia("(300px <= device-height < 500px)").matches, true);

    t.pass();
});

test.serial.skip("200px", (t) => {
    setMedia({
        height: 200,
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
