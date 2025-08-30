import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["./src/index.ts"],

    platform: "node",

    // Inline 'media-query-fns' as it is an ESM package
    // We could do the same by placing 'media-query-fns' in the devDeps, but this is more explicit
    noExternal: ["media-query-fns"],
});
