const test = require("ava");
const { matchMedia, setMedia, cleanupListeners, cleanupMedia, cleanup } = require("mock-match-media");

test(".matches", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    t.is(mql.matches, false);

    setMedia({
        width: "600px",
    });

    t.is(mql.matches, true);

    setMedia({
        width: "300px",
    });

    t.is(mql.matches, false);

    t.pass();
});

test("cleanupMedia", (t) => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: "600px",
    });
    t.is(doesMatch(), true);

    cleanupMedia();
    t.is(doesMatch(), false);
});

test("cleanup", (t) => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: "600px",
    });
    t.is(doesMatch(), true);

    cleanup();
    t.is(doesMatch(), false);
});
