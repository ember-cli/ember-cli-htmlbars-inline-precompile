// Type definitions for htmlbars-inline-precompile 1.0
// Project: ember-cli-htmlbars-inline-precompile
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile

// Note: using this with the `ember-cli-htmlbars-inline-precompile` package
// requires a bit of hackery. Assuming you have the package as an explicit
// dependency or dev dependency, create a shim file anywhere visible to the
// TypeScript compiler which includes something like this (in this case, the
// shim file would be at something like `types/shims.d.ts` relative to the root
// of the project which imports `ember-cli-htmlbars-inline-precompile`):
//
// ```typescript
// /// <reference path="../node_modules/ember-cli-htmlbars-inline-precompile/index.d.ts" />
// ```
//
// Note that the path should be the relative path from the shim to the actual
// location of the addon in the `node_modules` directory.
//
// This is a limitation of the (reasonable) way TypeScript imports modules: it
// doesn't have any way to know to look for a package with an arbitrary name
// unless instructed.

/**
 * Precompile a Handlebars template via tagged string literals.
 */
export default function hbs(tagged: TemplateStringsArray): string | string[];
