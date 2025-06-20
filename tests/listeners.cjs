// @ts-check

const test = require("ava").default;
const { matchMedia, setMedia, cleanupListeners, MediaQueryListEvent, cleanup } = require("mock-match-media");

test.afterEach(() => {
    // cleanup listeners and state after each test
    cleanup();
});

/**
 * @type {() => [(event: MediaQueryListEvent) => void, MediaQueryListEvent[]]}
 */
const mock = () => {
    const calls = [];
    return [
        (event) => {
            calls.push(event);
        },
        calls,
    ];
};

test.serial("`.addListener()`", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

    mql.addListener(cb);

    setMedia({
        width: 600,
    });
    t.is(calls.length, 1);
    t.is(calls[0].matches, true);

    setMedia({
        width: 300,
    });
    t.is(calls.length, 2);
    t.is(calls[1].matches, false);

    // No new call
    setMedia({
        width: 200,
    });
    t.is(calls.length, 2);

    // cleanup make it so that new changes in the media won’t trigger listeners
    cleanupListeners();
    setMedia({
        width: 600,
    });
    t.is(calls.length, 2);

    // same thing for cleanup
    mql.addListener(cb);
    cleanup();

    setMedia({
        width: 300,
    });
    t.is(calls.length, 2);

    t.pass();
});

test.serial("`.addEventListener()`", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

    mql.addEventListener("change", cb);

    setMedia({
        width: 600,
    });
    t.is(calls.length, 1);
    t.is(calls[0].matches, true);

    setMedia({
        width: 300,
    });
    t.is(calls.length, 2);
    t.is(calls[1].matches, false);

    // No new call
    setMedia({
        width: 200,
    });
    t.is(calls.length, 2);

    // cleanup make it so that new changes in the media won’t trigger listeners
    cleanupListeners();
    setMedia({
        width: 600,
    });
    t.is(calls.length, 2);

    // same thing for cleanup
    mql.addListener(cb);
    cleanup();

    setMedia({
        width: 300,
    });
    t.is(calls.length, 2);

    t.pass();
});

test.serial("listeners get only called once when multiple features change", (t) => {
    const mql = matchMedia("(min-width: 500px) and (min-height: 200px)");

    const [cb, calls] = mock();

    t.is(mql.matches, false);

    mql.addEventListener("change", cb);
    t.is(calls.length, 0);

    setMedia({
        width: 300,
        height: 300,
    });
    t.is(calls.length, 0);

    // here it checks that it won’t first apply width, see if it matches, then apply height, see if it matches
    setMedia({
        width: 600,
        height: 100,
    });
    t.is(calls.length, 0);

    setMedia({
        width: 600,
        height: 300,
    });
    t.is(calls.length, 1);
    t.is(calls[0].matches, true);

    t.pass();
});

test.serial(
    "ensure that when the same fn is used in multiple listeners, it won’t be called twice on each change",
    (t) => {
        const mql = matchMedia("(min-width: 500px)");

        const [cb, calls] = mock();

        mql.addEventListener("change", cb);
        mql.addEventListener("change", cb);
        mql.addListener(cb);
        mql.addListener(cb);

        setMedia({
            width: 600,
        });
        t.is(calls.length, 1);

        t.pass();
    },
);

test.serial("ensure that when the same fn is used in 2 different MQL, it will be called twice", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const mql2 = matchMedia("(min-width: 500px)");
    const mql3 = matchMedia("(min-width: 500px)");
    const mql4 = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

    mql1.addEventListener("change", cb);
    mql2.addEventListener("change", cb);
    mql3.addListener(cb);
    mql4.addListener(cb);

    setMedia({
        width: 600,
    });
    t.is(calls.length, 4);

    t.pass();
});

test.serial("`.dispatchEvent()` always calls listeners", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const mql2 = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

    mql1.addEventListener("change", cb);
    mql2.addListener(cb);

    mql1.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    mql2.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls.length, 2);
    t.is(calls[0].matches, false);
    t.is(calls[0].media, "(custom-non-valid)");
    t.is(calls[1].matches, false);
    t.is(calls[1].media, "(custom-non-valid)");

    t.pass();
});

test.serial("`.dispatchEvent()` is only dispatched once", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

    mql.addEventListener("change", cb);
    mql.addListener(cb);

    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));

    t.is(calls.length, 1);

    t.pass();
});

test.serial("`.dispatchEvent()` doesn’t call no listener when the event isn’t `change`", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb1, calls1] = mock();
    const [cb2, calls2] = mock();
    const [cb3, calls3] = mock();

    mql.addEventListener("change", cb1);
    mql.addListener(cb2);
    mql.onchange = cb3;

    // @ts-expect-error
    mql.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));

    t.is(calls1.length, 0);
    t.is(calls2.length, 0);
    t.is(calls3.length, 0);

    t.pass();
});

test.serial("the 2 kinds of listeners can reset each other", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const mql2 = matchMedia("(min-width: 500px)");

    const [cb1, calls1] = mock();
    const [cb2, calls2] = mock();

    mql1.addEventListener("change", cb1);
    mql1.removeListener(cb1);

    mql2.addListener(cb2);
    mql2.removeEventListener("change", cb2);

    mql1.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    mql2.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));

    t.is(calls1.length, 0);
    t.is(calls2.length, 0);

    t.pass();
});

// Note: the concept of "loose" state disappeared from the codebase, but this test is kept to avoid regressions
test.serial("the loose state should disappear after a removeListener", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const [cb1, calls1] = mock();
    mql1.addListener(cb1);
    mql1.removeListener(cb1);
    mql1.addEventListener("change", cb1);
    // @ts-expect-error
    mql1.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls1.length, 0);

    const mql2 = matchMedia("(min-width: 500px)");
    const [cb2, calls2] = mock();
    mql2.addListener(cb2);
    mql2.removeEventListener("change", cb2);
    mql2.addEventListener("change", cb2);
    // @ts-expect-error
    mql2.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls2.length, 0);

    t.pass();
});

test.serial("the listeners and onchange are fired twice when set together", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const [cb1, calls1] = mock();
    mql1.addEventListener("change", cb1);
    mql1.onchange = cb1;
    mql1.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls1.length, 2);

    const mql2 = matchMedia("(min-width: 500px)");
    const [cb2, calls2] = mock();
    mql2.addListener(cb2);
    mql2.onchange = cb2;
    mql2.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls2.length, 2);
});

test.serial("the listeners can’t disable `onchange`", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const [cb1, calls1] = mock();
    mql1.onchange = cb1;
    mql1.removeEventListener("change", cb1);
    mql1.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls1.length, 1);

    const mql2 = matchMedia("(min-width: 500px)");
    const [cb2, calls2] = mock();
    mql2.onchange = cb2;
    mql2.removeListener(cb2);
    mql2.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls2.length, 1);

    const mql3 = matchMedia("(min-width: 500px)");
    const [cb3, calls3] = mock();
    mql3.onchange = cb3;
    mql3.addEventListener("change", cb3, { once: true });
    mql3.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls3.length, 2); // 2 because of the .onchange + the .addEventListener
    mql3.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls3.length, 3); // `once` didn’t prevent it from receiving the 2nd event
});

test.serial("`once: true` doesn’t clear any listener after 1 call", (t) => {
    const mql = matchMedia("(min-width: 500px)");
    const [cb, calls] = mock();
    mql.addListener(cb);
    mql.addEventListener("change", cb);
    mql.addEventListener("change", cb, { once: true });

    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls.length, 1);

    // The other listeners are still here
    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls.length, 2);

    // It only clear once too
    mql.addEventListener("change", cb);
    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls.length, 3);
});

test.serial("`once: true` should be cleared after a regular `removeEventListener`", (t) => {
    const mql = matchMedia("(min-width: 500px)");
    const [cb, calls] = mock();
    mql.addEventListener("change", cb, { once: true });
    mql.removeEventListener("change", cb);
    mql.addEventListener("change", cb);

    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls.length, 1);
    // The listener works as expected
    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
    t.is(calls.length, 2);
});

test.serial("`.dispatchEvent` can only receive events", (t) => {
    const mql = matchMedia("(min-width: 500px)");
    if (typeof Event !== "undefined") {
        t.is(mql.dispatchEvent(new Event("hello")), true);
    }
    t.is(mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" })), true);

    // @ts-expect-error
    const err1 = t.throws(() => mql.dispatchEvent());
    t.is(err1.message, `Failed to execute 'dispatchEvent' on 'EventTarget': 1 argument required, but only 0 present.`);

    // @ts-expect-error
    const err2 = t.throws(() => mql.dispatchEvent("hello"));
    t.is(err2.message, `Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.`);
});
