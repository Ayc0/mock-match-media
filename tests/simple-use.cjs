const test = require("ava");
const { matchMedia, setMedia, cleanupListeners, cleanupState, cleanup } = require("mock-match-media");

test(".matches", (t) => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    t.is(doesMatch(), false);

    setMedia({
        width: "600px",
    });

    t.is(doesMatch(), true);

    setMedia({
        width: "300px",
    });

    t.is(doesMatch(), false);

    t.pass();
});

test("cleanupState", (t) => {
    const doesMatch = () => matchMedia("(min-width: 500px)").matches;

    setMedia({
        width: "600px",
    });
    t.is(doesMatch(), true);

    cleanupState();
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