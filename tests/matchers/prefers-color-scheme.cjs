// @ts-check

const test = require("ava").default;
const { matchMedia, setMedia, cleanupMedia } = require("mock-match-media");

test.beforeEach(() => {
    cleanupMedia();
});

test.serial("unset", (t) => {
    t.is(matchMedia("(prefers-color-scheme: light)").matches, false);
    t.is(matchMedia("(prefers-color-scheme: dark)").matches, false);

    t.pass();
});

test.serial("light", (t) => {
    setMedia({
        prefersColorScheme: "light",
    });

    t.is(matchMedia("(prefers-color-scheme: light)").matches, true);
    t.is(matchMedia("(prefers-color-scheme: dark)").matches, false);

    t.pass();
});

test.serial("dark", (t) => {
    setMedia({
        prefersColorScheme: "dark",
    });

    t.is(matchMedia("(prefers-color-scheme: light)").matches, false);
    t.is(matchMedia("(prefers-color-scheme: dark)").matches, true);

    t.pass();
});
