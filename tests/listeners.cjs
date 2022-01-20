const test = require("ava");
const { matchMedia, setMedia, cleanupListeners, cleanupMedia, cleanup } = require("mock-match-media");

const waitFor = async (cb) => {
    await cb().catch(() => {
        return new Promise((res, rej) => waitFor(cb).then(res).catch(rej), 10);
    });
};

test.afterEach(() => {
    // cleanup listeners and state after each test
    cleanup();
});

test(".addListener()", async (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const calls = [];
    const cb = (event) => {
        calls.push(event);
    };

    mql.addListener(cb);

    setMedia({
        width: "600px",
    });
    t.is(calls.length, 1);
    t.is(calls[0].matches, true);

    setMedia({
        width: "300px",
    });
    t.is(calls.length, 2);
    t.is(calls[1].matches, false);

    // No new call
    setMedia({
        width: "200px",
    });
    t.is(calls.length, 2);

    // cleanup make it so that new changes in the media won't trigger listeners
    cleanupListeners();
    setMedia({
        width: "600px",
    });
    t.is(calls.length, 2);

    // same thing for cleanup
    mql.addListener(cb);
    cleanup();

    setMedia({
        width: "300px",
    });
    t.is(calls.length, 2);

    t.pass();
});

test(".addEventListener()", async (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const calls = [];
    const cb = (event) => {
        calls.push(event);
    };

    mql.addEventListener("change", cb);

    setMedia({
        width: "600px",
    });
    t.is(calls.length, 1);
    t.is(calls[0].matches, true);

    setMedia({
        width: "300px",
    });
    t.is(calls.length, 2);
    t.is(calls[1].matches, false);

    // No new call
    setMedia({
        width: "200px",
    });
    t.is(calls.length, 2);

    // cleanup make it so that new changes in the media won't trigger listeners
    cleanupListeners();
    setMedia({
        width: "600px",
    });
    t.is(calls.length, 2);

    // same thing for cleanup
    mql.addListener(cb);
    cleanup();

    setMedia({
        width: "300px",
    });
    t.is(calls.length, 2);

    t.pass();
});
