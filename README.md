## Jest Typescript Mock transformIgnorePattern bug repro

Run `npm install`

Run `npm test`

Error shows up: 

```
    /typescript-module-mock-repro/node_modules/@polymer/lit-element/lit-element.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import { PropertiesMixin } from '@polymer/polymer/lib/mixins/properties-mixin.js';
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

    > 1 | import { html } from '@polymer/lit-element';
        | ^
      2 |
      3 | class LitElement {
      4 |   _propertiesChanged () {}
```

While transform ignore patterns is set

## Extra debug

If you edit `node_modules/@jest/transform/build/ScriptTransformer.js` at line 817 in the function `shouldTransform` to add 
the following log: 

```
    if ((filename.endsWith('.ts') || filename.endsWith('.js')) && filename.includes('node_modules')) {
      console.log('testing filename for transform:', filename);
      console.log('shouldtransform', this._config.transform.length !== 0 && !isIgnored);
    }
```

Here is the output:

```
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-runner/build/index.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-runner/build/runTest.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-runner/build/types.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-environment-jsdom/build/index.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-circus/runner.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/@polymer/lit-element/lit-element.js
shouldtransform true
```

if you remove `@polymer` from `transformIgnorePatterns` in jest.config.js here is the output:

```
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-runner/build/index.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-runner/build/runTest.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-runner/build/types.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-environment-jsdom/build/index.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-circus/runner.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js
shouldtransform false
testing filename for transform: /Users/julien/work/typescript-module-mock-repro/node_modules/@polymer/lit-element/lit-element.js
shouldtransform false
```

Highlighting that `transformIgnorePatterns` is properly configured and detected for the failing file, but not applied.
