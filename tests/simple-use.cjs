// @ts-check

const test = require("ava");
const { matchMedia, setMedia, cleanupListeners, cleanupMedia, cleanup } = require("mock-match-media");

test.serial(".matches", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    t.is(mql.matches, false);

    setMedia({
        width: 600,
    });

    t.is(mql.matches, true);

    setMedia({
        width: 300,
    });

    t.is(mql.matches, false);

    t.pass();
});

test.serial("cleanupMedia", (t) => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: 600,
    });
    t.is(doesMatch(), true);

    cleanupMedia();
    t.is(doesMatch(), false);
});

test.serial("cleanup", (t) => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: 600,
    });
    t.is(doesMatch(), true);

    cleanup();
    t.is(doesMatch(), false);
});
