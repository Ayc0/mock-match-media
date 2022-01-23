const test = require("ava");
const { matchMedia, setMedia, cleanupListeners, MediaQueryListEvent, cleanup } = require("mock-match-media");

test.afterEach(() => {
    // cleanup listeners and state after each test
    cleanup();
});

const mock = () => {
    const calls = [];
    return [
        (event) => {
            calls.push(event);
        },
        calls,
    ];
};

test.serial(".addListener()", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

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

test.serial(".addEventListener()", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

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

test.serial("listeners get only called once when multiple features change", (t) => {
    const mql = matchMedia("(min-width: 500px) and (min-height: 200px)");

    const [cb, calls] = mock();

    t.is(mql.matches, false);

    mql.addEventListener("change", cb);
    t.is(calls.length, 0);

    setMedia({
        width: "300px",
        height: "300px",
    });
    t.is(calls.length, 0);

    // here it checks that it won't first apply width, see if it matches, then apply height, see if it matches
    setMedia({
        width: "600px",
        height: "100px",
    });
    t.is(calls.length, 0);

    setMedia({
        width: "600px",
        height: "300px",
    });
    t.is(calls.length, 1);
    t.is(calls[0].matches, true);

    t.pass();
});

test.serial(
    "ensure that when the same fn is used in multiple listeners, it won't be called twice on each change",
    (t) => {
        const mql = matchMedia("(min-width: 500px)");

        const [cb, calls] = mock();

        mql.addEventListener("change", cb);
        mql.addEventListener("change", cb);
        mql.addListener(cb);
        mql.addListener(cb);

        setMedia({
            width: "600px",
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
        width: "600px",
    });
    t.is(calls.length, 4);

    t.pass();
});

test.serial(".dispatchEvent() always calls listeners", (t) => {
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

test.serial(".dispatchEvent() is only dispatched once", (t) => {
    const mql = matchMedia("(min-width: 500px)");

    const [cb, calls] = mock();

    mql.addEventListener("change", cb);
    mql.addListener(cb);

    mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));

    t.is(calls.length, 1);

    t.pass();
});

test.serial(".dispatchEvent() always calls the listeners, not the event listeners when the event isn't change", (t) => {
    const mql1 = matchMedia("(min-width: 500px)");
    const mql2 = matchMedia("(min-width: 500px)");

    const [cb1, calls1] = mock();
    const [cb2, calls2] = mock();

    mql1.addEventListener("change", cb1);
    mql2.addListener(cb2);

    mql1.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));
    mql2.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));

    t.is(calls1.length, 0);
    t.is(calls2.length, 1);

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

    mql1.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));
    mql2.dispatchEvent(new MediaQueryListEvent("not-change", { matches: false, media: "(custom-non-valid)" }));

    t.is(calls1.length, 0);
    t.is(calls2.length, 0);

    t.pass();
});

test.todo("check mql.onchange");
test.todo("check {once: true} in addEventListener");
