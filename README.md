Simple server-side compatible substitution for `window.matchMedia()` based on [css-mediaquery](https://github.com/ericf/css-mediaquery).

1. [What is `mock-match-media`?](#what-is-mock-match-media)
2. [Usage](#usage)
    1. [Listeners](#listeners)
    2. [Cleanup](#cleanup)
        1. [`cleanupListeners`](#cleanuplisteners)
        2. [`cleanupMedia`](#cleanupmedia)
        3. [`cleanup`](#cleanup-1)
    3. [Polyfill](#polyfill)
    4. [Other features](#other-features)
        1. [`once` event listeners](#once-event-listeners)
        2. [`.dispatchEvent` & `MediaQueryListEvent`](#dispatchevent--mediaquerylistevent)
        3. [`.onchange`](#onchange)
        4. [Interactions between multiple listeners](#interactions-between-multiple-listeners)
    5. [ESM](#esm)
3. [How to use with other libraries](#how-to-use-with-other-libraries)
    1. [Jest](#jest)
    2. [NextJS](#nextjs)

# What is `mock-match-media`?

`mock-match-media` is a [ponyfill](https://github.com/sindresorhus/ponyfill) for `window.matchMedia` but for Node.

This mock is fully compliant with [the spec](https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#the-mediaquerylist-interface) (see doc on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) or [Other features](#other-features)).

![Node CI tests](https://github.com/Ayc0/mock-match-media/actions/workflows/main.yml/badge.svg)

We currently support Node v12, v14, v16, v18 and v19.

It's also coded in TypeScript.

# Usage

```js
const { matchMedia, setMedia } = require("mock-match-media");

// Define current media
setMedia({
    width: 50,
    type: "screen",
    orientation: "landscape",
    "prefers-color-scheme": "light",
});

matchMedia("(min-width: 250px)").matches;
// > false
matchMedia("(min-width: 40px)").matches;
// > true

// Only redefine what changed
setMedia({
    width: 500,
});

matchMedia("(min-width: 250px)").matches;
// > true
```

## Listeners

`mock-match-media` also supports even listeners:

```js
const { matchMedia, setMedia } = require("mock-match-media");

setMedia({
    width: 50,
});

const listener = (event) => console.log(event.matches);

const matcher = matchMedia("(min-width: 250px)");

matcher.addEventListener("change", listener);
// And also the deprecated version
// matchMedia("(min-width: 250px)").addListener(event => console.log(event.matches));

setMedia({
    width: 100,
});
// outputs nothing because `matches` hasn't changed

setMedia({
    width: 1000,
});
// outputs `true`

matcher.removeEventListener("change", listener);

setMedia({
    width: 100,
});
// outputs nothing because the listener is removed
```

## Cleanup

`mock-match-media` provides 3 cleanup functions:

```js
const { cleanupListeners, cleanupMedia, cleanup } = require("mock-match-media");
```

### `cleanupListeners`

`cleanupListeners` clears all listeners called via `matchMedia().addListener()` or `matchMedia().addEventListener()` (to avoid calling in side effects).

### `cleanupMedia`

`cleanupMedia` resets the state of the window set via `setMedia()`.

### `cleanup`

`cleanup` at the same time clears all listeners (like `cleanupListeners`), and clears the state of the window (like `cleanupMedia`).

## Polyfill

If you don't want to change your code or to setup mocks with your testing library, you can do:

```js
require("mock-match-media/polyfill");
```

And then global variables `matchMedia` and `MediaQueryListEvent` will be set.
And thus, you won't have to import those (you'll still have to import `setMedia`, and the `cleanup` functions).

## Other features

This library covers most of the aspects of `matchMedia`. In addition to the API presented above, it also supports:

### `once` event listeners

```js
const { matchMedia } = require("mock-match-media");

const mql = matchMedia("(min-width: 250px)");
mql.addEventListener("change", listener, { once: true }); // the listener will be removed after 1 received event
```

### `.dispatchEvent` & `MediaQueryListEvent`

Like every other [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget), you can `.dispatchEvent(event)` to manually dispatch event (it’s not that useful to be honest, but as it’s in the spec, we implemented it).

```js
const { matchMedia, MediaQueryListEvent } = require("mock-match-media");

const mql = matchMedia("(min-width: 250px)");
mql.dispatchEvent(new MediaQueryListEvent("change", { matches: false, media: "(custom-non-valid)" }));
// Works also with a regular event but it’s not recommended:
mql.dispatchEvent(new Event("change"));
```

### `.onchange`

Like on any HTML element, you can attach a `.onchange` legacy event handler:

```js
const { matchMedia } = require("mock-match-media");

const mql = matchMedia("(min-width: 250px)");
mql.onchange = listener;
```

### Interactions between multiple listeners

We follow how browsers implemented interactions like:

```js
const { matchMedia } = require("mock-match-media");

const mql = matchMedia("(min-width: 250px)");
mql.onchange = listener;
mql.addListener(listener);
mql.addEventListener("change", listener);
mql.addEventListener("change", listener, { once: true });
```

And all of those are tested.

## ESM

We also ship 2 versions of this library:

-   one in CJS
-   one in ESM

This is also true for the polyfills, but the [`setup-jest`](#jest) file is only available in CJS (Jest doesn't work that well with ESM).

# How to use with other libraries

## Jest

In `jest.setup.js`, you only need to import `mock-match-media/jest-setup` (or `mock-match-media/jest-setup.cjs` depending on your config). It'll:

-   install the polyfill (for `matchMedia` and `MediaQueryListEvent`)
-   add a call to `cleanup` in `afterAll` to auto-cleanup your env in after each `test`/`it`.

You can set import `jest-setup` in `setupFiles` or in `setupFilesAfterEnv` in your jest config.

And then you can use `setMedia` in your tests.

You can find an example [here](https://github.com/Ayc0/mock-match-media-examples/tree/master/create-react-app) that includes Jest, react testing library and react-scripts.

## NextJS

You can find an example [here](https://github.com/Ayc0/mock-match-media-examples/tree/master/next) for how to use `mock-match-media` with NextJS.
