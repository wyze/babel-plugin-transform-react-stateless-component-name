import { transformFileSync } from 'babel-core'
import path from 'path'
import plugin from '../src'
import test from 'ava'

const getFixture = ( dir, file = 'App.js' ) =>
  path.join(__dirname, 'fixtures', dir, file)

const snapshotMacro = ( t, fixtureDir, fixtureFile ) => {
  const fixture = getFixture(fixtureDir, fixtureFile)
  const plugins = [ plugin ]
  const presets = [ 'es2015', 'react' ]
  const options = { plugins, presets }
  const { code } = transformFileSync(fixture, options)

  t.snapshot(code)
}

test(
  'ignores default function block when not returning JSX',
  snapshotMacro,
  'export-default-with-function-block-no-jsx',
)

test(
  'ignores default function block when no return statement',
  snapshotMacro,
  'export-default-function-block-without-return',
)

test(
  'default export is a function block returning JSX',
  snapshotMacro,
  'export-default-with-function-block',
)

test(
  'ignores default function when not returning JSX',
  snapshotMacro,
  'export-default-no-jsx',
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
  'sets default export from folder name when index.js',
  snapshotMacro,
  'export-default-from-indexjs',
  'index.js',
)

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
  'ignores when displayName is already set on default export function',
  snapshotMacro,
  'export-default-ignore-existing-displayname',
)
