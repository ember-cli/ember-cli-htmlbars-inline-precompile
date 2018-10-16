# Change Log

## [v1.0.3](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v1.0.3) (2018-06-02)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v1.0.2...v1.0.3)

**Implemented enhancements:**

- Make imports from `ember-cli-htmlbars-inline-precompile` work too [\#101](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/101)
- Update minimum versions of dependencies. [\#106](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/106) ([rwjblue](https://github.com/rwjblue))
- Add support for importing from `ember-cli-htmlbars-inline-precompile` [\#102](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/102) ([Turbo87](https://github.com/Turbo87))

**Fixed bugs:**

- hbs is not defined [\#8](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/8)

**Closed issues:**

- Plugin 1 specified in "base" provided an invalid property of "\_parallelBabel" [\#90](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/90)
- templateCompiler change during session does not invalidate the cache [\#41](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/41)

**Merged pull requests:**

- Replace JSHint with ESLint [\#104](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/104) ([Turbo87](https://github.com/Turbo87))
- Use headless Chrome for testing [\#103](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/103) ([Turbo87](https://github.com/Turbo87))

## [v1.0.2](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v1.0.2) (2017-08-09)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v1.0.1...v1.0.2)

**Closed issues:**

- Cache does not invalidate when ember version changes. [\#95](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/95)

**Merged pull requests:**

- Fix caching for parallel plugin objects [\#97](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/97) ([mikrostew](https://github.com/mikrostew))
- add npm badge [\#94](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/94) ([kellyselden](https://github.com/kellyselden))

## [v1.0.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v1.0.1) (2017-08-06)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.13...v1.0.1)

**Fixed bugs:**

- Adjust "ember-cli-babel" version check [\#91](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/91) ([Turbo87](https://github.com/Turbo87))

**Closed issues:**

- With 1.0.0 "broccoli-babel-transpiler is opting out of caching due to a plugin that does not provide a caching strategy: `\(\) =\> \_\_dirname`." [\#89](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/89)
- Syntax error/build broken in versions 0.3.7 and newer [\#84](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/84)

**Merged pull requests:**

- update `ember-cli-babel` version check and dependencies [\#93](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/93) ([mikrostew](https://github.com/mikrostew))
- CI: Use yarn instead of npm [\#92](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/92) ([Turbo87](https://github.com/Turbo87))
- Adds explicit function keyword, removing concise function syntax [\#85](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/85) ([craigotis](https://github.com/craigotis))

## [v0.3.13](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.13) (2017-08-01)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v1.0.0...v0.3.13)

**Merged pull requests:**

- port parallel changes from master to 0.3.x branch [\#87](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/87) ([mikrostew](https://github.com/mikrostew))

## [v1.0.0](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v1.0.0) (2017-08-01)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.4...v1.0.0)

**Merged pull requests:**

- Enable parallel transpile using API in broccoli-babel-transpiler [\#83](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/83) ([mikrostew](https://github.com/mikrostew))

## [v0.4.4](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.4) (2017-07-29)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.12...v0.4.4)

## [v0.3.12](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.12) (2017-07-29)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.3...v0.3.12)

**Closed issues:**

- Unable to build ember after updating to 0.4.1 or higher [\#86](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/86)
- Error message precompile@0.3 requires the host to use ember-cli-babel@5 despite @0.4 installed [\#78](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/78)

**Merged pull requests:**

- Ensure ember-template-compiler does not mutate shared config object. [\#88](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/88) ([rwjblue](https://github.com/rwjblue))

## [v0.4.3](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.3) (2017-05-10)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.11...v0.4.3)

**Closed issues:**

- Cannot find module 'ember-cli-babel/package' [\#82](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/82)
- 2.13 Addon Dependency Usage [\#79](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/79)

**Merged pull requests:**

- Update ember-cli-version-checker to be aware of nested packages. [\#81](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/81) ([rwjblue](https://github.com/rwjblue))

## [v0.3.11](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.11) (2017-05-08)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.10...v0.3.11)

## [v0.3.10](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.10) (2017-05-08)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.9...v0.3.10)

**Merged pull requests:**

- Ensure that nested addons using inline precompile can use Babel 5 locally [\#80](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/80) ([rwjblue](https://github.com/rwjblue))

## [v0.3.9](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.9) (2017-05-03)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.2...v0.3.9)

## [v0.4.2](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.2) (2017-05-03)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.1...v0.4.2)

**Implemented enhancements:**

- CI: Use "auto-dist-tag" for deployment [\#77](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/77) ([Turbo87](https://github.com/Turbo87))

**Closed issues:**

- TypeError: Cannot read property 'apply' of undefined... [\#75](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/75)
- Cannot read property 'lt' of undefined [\#74](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/74)

**Merged pull requests:**

- Fixes init call so this works in older versions of ember-cli [\#76](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/76) ([MiguelMadero](https://github.com/MiguelMadero))

## [v0.4.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.1) (2017-05-02)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.8...v0.4.1)

**Merged pull requests:**

- Add helpful messaging when used in the wrong context. [\#72](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/72) ([rwjblue](https://github.com/rwjblue))

## [v0.3.8](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.8) (2017-05-02)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.7...v0.3.8)

## [v0.3.7](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.7) (2017-05-02)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.0...v0.3.7)

**Merged pull requests:**

- Provide helpful messaging when using 0.3 with Babel 6. [\#73](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/73) ([rwjblue](https://github.com/rwjblue))

## [v0.4.0](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.0) (2017-04-22)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.0-beta.2...v0.4.0)

**Closed issues:**

- Compilation inside ember controller [\#70](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/70)

## [v0.4.0-beta.2](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.0-beta.2) (2017-03-13)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.4.0-beta.1...v0.4.0-beta.2)

## [v0.4.0-beta.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.4.0-beta.1) (2017-03-12)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.6...v0.4.0-beta.1)

**Closed issues:**

- SyntaxError with Addon Using `included` Hook [\#66](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/66)

**Merged pull requests:**

- Make it work with ember-cli-babel@6 + ember-cli ^2. [\#69](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/69) ([rwjblue](https://github.com/rwjblue))
- Ensure super call is bounded [\#68](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/68) ([samselikoff](https://github.com/samselikoff))
- CI: Enable automatic NPM deployment for tags [\#67](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/67) ([Turbo87](https://github.com/Turbo87))
- Adds ember-source scenario to ember try [\#65](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/65) ([locks](https://github.com/locks))
- Add lts-2-8 to ember-try config. [\#64](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/64) ([rwjblue](https://github.com/rwjblue))

## [v0.3.6](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.6) (2016-11-04)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.5...v0.3.6)

**Closed issues:**

- How to render outside of tests? [\#44](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/44)
- ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `v-get` [\#38](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/38)
- Is it okay to use for components in production? [\#26](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/26)

**Merged pull requests:**

- \[WIP\] Fix tests [\#63](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/63) ([locks](https://github.com/locks))
- 👻😱 Node.js 0.10 is unmaintained 😱👻 [\#62](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/62) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Use ember-source instead of ember-core [\#57](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/57) ([josemarluedke](https://github.com/josemarluedke))

## [v0.3.5](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.5) (2016-08-11)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.4...v0.3.5)

**Merged pull requests:**

- Fix AST plugin usage with inline precompiler. [\#37](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/37) ([rwjblue](https://github.com/rwjblue))
- Update ember-cli-sri to version 2.1.1 🚀 [\#35](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/35) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update ember-cli-app-version to version 2.0.0 🚀 [\#33](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/33) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

## [v0.3.4](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.4) (2016-08-10)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.3...v0.3.4)

**Merged pull requests:**

- Provide template compiler cache key to babel plugin. [\#34](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/34) ([rwjblue](https://github.com/rwjblue))
- Update ember-cli-app-version to version 1.0.1 🚀 [\#32](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/32) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Noop if ember-cli-htmlbars has already registered the precompiler [\#31](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/31) ([offirgolan](https://github.com/offirgolan))

## [v0.3.3](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.3) (2016-07-28)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.3.2...v0.3.3)

**Merged pull requests:**

- Make sure feature flags are available [\#30](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/30) ([chadhietala](https://github.com/chadhietala))
- Update URLs after moving repository to ember-cli organization [\#29](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/29) ([pangratz](https://github.com/pangratz))

## [v0.3.2](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.3.2) (2016-05-22)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/0.3.1...v0.3.2)

**Closed issues:**

- Compile templates with child components? [\#27](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/27)

**Merged pull requests:**

- add support for ember-core npm module [\#28](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/28) ([stefanpenner](https://github.com/stefanpenner))
- Lock down jQuery to 1.11 [\#25](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/25) ([pangratz](https://github.com/pangratz))
- Update README [\#24](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/24) ([pangratz](https://github.com/pangratz))

## [0.3.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/0.3.1) (2015-09-12)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/0.3.0...0.3.1)

**Fixed bugs:**

- `app.options` is undefined when using in an addon [\#4](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/4)

**Closed issues:**

- Cannot read property 'name' of undefined [\#22](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/22)
- Add section about JSHint problems with ember-cli-mocha: Expected '\)' and instead saw ' [\#20](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/20)

**Merged pull requests:**

- Upgrade to ember-cli-htmlbars ^1.0.0 [\#23](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/23) ([joliss](https://github.com/joliss))

## [0.3.0](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/0.3.0) (2015-08-31)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/0.2.0...0.3.0)

**Closed issues:**

- Is it possible to use it in a jsbin? [\#19](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/19)
- doesn't work with babel-core 5.7 [\#18](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/18)
- How to use this in combination with coffeescript? [\#17](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/17)
- Best way to test a focusout event [\#16](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/16)

**Merged pull requests:**

- Fix usage within multi-EmberApp builds [\#21](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/21) ([ef4](https://github.com/ef4))
- app.options doesn't exist when used in addons [\#5](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/5) ([wagenet](https://github.com/wagenet))

## [0.2.0](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/0.2.0) (2015-07-10)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/0.1.3...0.2.0)

**Closed issues:**

- Babel deprecation notice [\#15](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/15)
- this.set\(\) is undefined — contradicts ReadMe example [\#14](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/14)
- Babel Deprecation \(returning a string from a visitor method\) [\#13](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/13)

## [0.1.3](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/0.1.3) (2015-06-30)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.1.2...0.1.3)

## [v0.1.2](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.1.2) (2015-06-26)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.1.1...v0.1.2)

**Implemented enhancements:**

- Add blueprint for a component integration test [\#6](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/6)

**Closed issues:**

- Babel Deprecation for Path\#remove [\#11](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/11)

**Merged pull requests:**

- Bump babel-plugin-htmlbars-inline-precompile to v0.0.3 [\#12](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/12) ([pangratz](https://github.com/pangratz))

## [v0.1.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.1.1) (2015-06-13)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.1.0...v0.1.1)

**Closed issues:**

- Check babel version and warn if prerequisites are not met [\#3](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/3)

**Merged pull requests:**

- Pump babel-plugin-htmlbars-inline-precompile to 0.0.2 [\#10](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/10) ([pangratz](https://github.com/pangratz))

## [v0.1.0](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.1.0) (2015-05-06)
[Full Changelog](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/compare/v0.0.1...v0.1.0)

**Closed issues:**

- Error using precompiler [\#2](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/issues/2)

**Merged pull requests:**

- Tweak the readme for hbs tag [\#1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/1) ([mixonic](https://github.com/mixonic))

## [v0.0.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/tree/v0.0.1) (2015-05-05)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*