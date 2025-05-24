// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
    t.is(matchMedia("all").matches, true);
    t.is(matchMedia("screen").matches, true);
    t.is(matchMedia("print").matches, false);

    // To note: other media types are deprecated since Media Query 4
    // See:
    // - https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types
    // - https://drafts.csswg.org/mediaqueries/#media-types

    t.pass();
});

test.serial("screen", (t) => {
    setMedia({
        mediaType: "screen",
    });

    t.is(matchMedia("all").matches, true);
    t.is(matchMedia("screen").matches, true);
    t.is(matchMedia("print").matches, false);

    t.pass();
});

test.serial("print", (t) => {
    setMedia({
        mediaType: "print",
    });

    t.is(matchMedia("all").matches, true);
    t.is(matchMedia("screen").matches, false);
    t.is(matchMedia("print").matches, true);

    t.pass();
});
