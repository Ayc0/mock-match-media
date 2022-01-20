Simple server-side compatible substitution for `window.matchMedia()` based on [css-mediaquery](https://github.com/ericf/css-mediaquery).

1. [Usage](#usage)
   1. [Listeners](#listeners)
   2. [Cleanup](#cleanup)
   3. [Polyfill](#polyfill)
2. [How to use with other libraries](#how-to-use-with-other-libraries)
   1. [Jest](#jest)
   2. [NextJS](#nextjs)

# Usage

```js
const { matchMedia, setMedia } = require("mock-match-media");

// Define current media
setMedia({
    width: "50px",
    type: "screen",
    orientation: "landscape",
    "prefers-color-scheme": "light",
});

matchMedia("(min-width: 250px)").matches;
// > false

// Only redefine what changed
setMedia({
    width: "500px",
});

matchMedia("(min-width: 250px)").matches;
// > true
```

## Listeners

`mock-match-media` also supports even listeners:

```js
const { matchMedia, setMedia } = require("mock-match-media");

setMedia({
    width: "50px",
});

const listener = (event) => console.log(event.matches);

const matcher = matchMedia("(min-width: 250px)");

matcher.addEventListener("change", listener);
// And also the deprecated version
// matchMedia("(min-width: 250px)").addListener(event => console.log(event.matches));

setMedia({
    width: "100px",
});
// outputs nothing because `matches` hasn't changed

setMedia({
    width: "1000px",
});
// outputs `true`

matcher.removeEventListener("change", listener);

setMedia({
    width: "100px",
});
// outputs nothing because the listener is removed
```

## Cleanup

`mock-match-media` provides 3 cleanup functions:

-   `cleanupListeners` to clear all listeners called via `matchMedia().addListener()` or `matchMedia().addEventListener()` (to avoid calling in side effects),
-   `cleanupMedia` to reset the state of the window set via `setMedia()`,
-   `cleanup` that calls the 2 other functions to clean everything.

## Polyfill

If you don't want to change your code or to setup mocks with your testing library, you can do:

```js
require("mock-match-media/polyfill");
```

And then `matchMedia` and `window.matchMedia` are going to be aliased to this `match-media`.
You'll only have to set the media type with `setMedia` inside of your tests.

# How to use with other libraries

## Jest

In `jest.setup.js`, you only need to import `mock-match-media/jest-setup` (or `mock-match-media/jest-setup.cjs` depending on your config). It'll:

-   install the `matchMedia` polyfill
-   add a call to `cleanup` in `afterAll` to auto-cleanup your env in after each `test`/`it`.

You can set import `jest-setup` in `setupFiles` or in `setupFilesAfterEnv` in your jest config.

And then you can use `setMedia` in your tests.

You can find an example [here](https://github.com/Ayc0/mock-match-media-examples/tree/master/create-react-app) that includes Jest, react testing library and react-scripts.

## NextJS

In `server.js`, you can do:

```js
require("mock-match-media/polyfill");
const { setMedia } = require("mock-match-media");

setMedia({
    // your config
});
```

You can find an example [here](https://github.com/Ayc0/mock-match-media-examples/tree/master/next) that includes a custom `server.js` and a basic component.
