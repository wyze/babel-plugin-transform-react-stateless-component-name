// @flow

import type { ContextualTest } from '../src/types'

import { transformFileSync } from 'babel-core'
import path from 'path'
import plugin from '../src'
import test from 'ava'

const getFixture = ( dir: string, file: string = 'App.js' ): string =>
  path.join(__dirname, 'fixtures', dir, file)

const snapshotMacro = (
  t: ContextualTest,
  fixtureDir: string,
  fixtureFile: string,
) => {
  const fixture = getFixture(fixtureDir, fixtureFile)
  const plugins = [ plugin ]
  const presets = [ 'es2015', 'react' ]
  const options = { plugins, presets }
  const { code } = transformFileSync(fixture, options)

  t.snapshot(code)
}

test(
  'sets displayName for assigned functional component',
  snapshotMacro,
  'assigned-component',
)

test(
  'sets displayName for assigned functional component with block',
  snapshotMacro,
  'assigned-component-block',
)

test(
  'isDisplayName check should ignore non-assignment expression statements',
  snapshotMacro,
  'displayname-check-ignore-non-assignment-expression',
)

test(
  'sets function name for default export based on filename',
  snapshotMacro,
  'export-default',
)

test(
  'sets displayName for assignment default export',
  snapshotMacro,
  'export-default-assignment',
)

test(
  'ignores displayName when if/else block has no return statement',
  snapshotMacro,
  'export-default-dynamic-no-return',
)

test(
  'sets displayName when if/else returns JSX',
  snapshotMacro,
  'export-default-dynamic-return',
)

test(
  'sets displayName when if/else block returns JSX',
  snapshotMacro,
  'export-default-dynamic-return-block',
)

test(
  'sets default export function name with deeply nested JSX return statement',
  snapshotMacro,
  'export-default-eventually-return-jsx',
)

test(
  'sets default export from folder name when index.js',
  snapshotMacro,
  'export-default-from-indexjs',
  'index.js',
)

test(
  'ignores default function block when no return statement',
  snapshotMacro,
  'export-default-function-block-without-return',
)

test(
  'sets displayName with default export being a function declaration',
  snapshotMacro,
  'export-default-function-declaration',
)

test(
  'ignores displayName with default export being a function declaration',
  snapshotMacro,
  'export-default-function-declaration-with-displayname',
)

test(
  'ignores when displayName is already set on default export function',
  snapshotMacro,
  'export-default-ignore-existing-displayname',
)

test(
  'ignores default function when not returning JSX',
  snapshotMacro,
  'export-default-no-jsx',
)

test(
  'ignores default function block when not returning JSX',
  snapshotMacro,
  'export-default-no-jsx-block',
)

test(
  'default export is a function block returning JSX',
  snapshotMacro,
  'export-default-with-function-block',
)

test(
  'ignores default function block when not returning JSX',
  snapshotMacro,
  'export-default-with-function-block-no-jsx',
)

test(
  'ignores when jsx is assigned to a variable and not a component/function',
  snapshotMacro,
  'ignore-assigned-jsx',
)

test(
  'ignores when displayName is already set on function',
  snapshotMacro,
  'ignore-existing-displayname',
)

test(
  'sets displayName for named export functional component',
  snapshotMacro,
  'named-export',
)

test(
  'sets displayName for named export functional component with block',
  snapshotMacro,
  'named-export-block',
)

test(
  'ignores jsx expression blocks',
  snapshotMacro,
  'ignore-jsx-expression-blocks',
)

test(
  'does not crash on block-arrow components with hoc wrapper',
  snapshotMacro,
  'export-default-hoc-block-arrow',
)
