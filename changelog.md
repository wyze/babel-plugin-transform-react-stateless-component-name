## Change Log

### [v1.1.2](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/releases/tag/v1.1.2) (2017-11-07)

* [[`673e2a4128`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/673e2a4128)] - Update to use `write-changelog` package (Neil Kistner)
* [[`a853f804b1`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/a853f804b1)] - Remove all istanbul ignores (#10) (Thomas Grainger)
* [[`e875edd575`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/e875edd575)] - Avoid crash on block-arrow components with hoc wrapper (#9) (Thomas Grainger)
* [[`e98586fe5a`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/e98586fe5a)] - Ignore JSX Expression blocks (#7) (Daniel J)

### [v1.1.1](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/releases/tag/v1.1.1) (2016-12-12)

* [[`a9b7a2bb5d`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/a9b7a2bb5d)] - Reformat changelog (Neil Kistner)
* [[`10e83bd90c`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/10e83bd90c)] - Fix isDisplayName to not error on non-AssignmentExpression statements (Neil Kistner)

### [v1.1.0](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/releases/tag/v1.1.0) (2016-12-11)

* [[`520858f091`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/520858f091)] - Add note about setting displayName for snapshot testing (Neil Kistner)
* [[`1199c11de9`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/1199c11de9)] - Add fix when displayName is set on default export function declaration (Neil Kistner)
* [[`c7888b2c5b`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/c7888b2c5b)] - Meta file updates (Neil Kistner)
* [[`c01093c88e`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/c01093c88e)] - Use codecov bash uploader (Neil Kistner)
* [[`282ecfcc2c`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/282ecfcc2c)] - Add yarn.lock (Neil Kistner)
* [[`a676b77441`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/a676b77441)] - Add Flow (Neil Kistner)
* [[`0975c41618`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/0975c41618)] - Add support for FunctionDeclaration as default export (Neil Kistner)
* [[`c0902d2f17`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/c0902d2f17)] - Move helper functions out into their own files (Neil Kistner)
* [[`e1bfe3419b`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/e1bfe3419b)] - Refactor doesReturnJSX to support recursion for nested returns (Neil Kistner)
* [[`33db84e159`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/33db84e159)] - Move tests to be in same order of fixtures (Neil Kistner)
* [[`125131f8b5`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/125131f8b5)] - Add more edge cases around if/else in default export (Neil Kistner)
* [[`c1700c00f8`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/c1700c00f8)] - Ignore displayName when set on default export (Neil Kistner)
* [[`1f1980de66`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/1f1980de66)] - Protect against displayName property being set twice (Neil Kistner)
* [[`cf79b9d3db`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/cf79b9d3db)] - Insert expression so it adds the semicolon (Neil Kistner)
* [[`dda83bcbc4`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/dda83bcbc4)] - Add displayName property to assigned functional components (Neil Kistner)
* [[`abec2993c3`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/abec2993c3)] - Refactor to use babel-types properly and add snapshot tests (Neil Kistner)

### [v1.0.2](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/releases/tag/v1.0.2) (2016-11-26)

* [[`be0400fd22`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/be0400fd22)] - Update meta files (Neil Kistner)
* [[`fd4382338d`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/fd4382338d)] - Upgrade dependencies and test process (Neil Kistner)
* [[`25504b6803`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/25504b6803)] - Fix when body.body (block) is undefined (Neil Kistner)

### [v1.0.1](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/releases/tag/v1.0.1) (2016-07-16)

* [[`b47575c24e`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/b47575c24e)] - Add missing `babel-register` devDependency (Neil Kistner)
* [[`06fea17d4d`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/06fea17d4d)] - Don't assume last statement is a ReturnStatement (Neil Kistner)
* [[`a8a8060dee`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/a8a8060dee)] - Meta updates (Neil Kistner)
* [[`5da0958c8f`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/5da0958c8f)] - Upgrade dependencies and updates to pass new lint rules (Neil Kistner)

### [v1.0.0](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/releases/tag/v1.0.0) (2016-07-16)

* [[`a9c5b6fedc`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/a9c5b6fedc)] - Add Codecov badge to readme (Neil Kistner)
* [[`36e9d99a9d`](https://github.com/wyze/babel-plugin-transform-react-stateless-component-name/commit/36e9d99a9d)] - Initial commit (Neil Kistner)
