import
  plugin,
  { doesReturnJSX, isArrowFunction, isTypeJSX }
from '../src'
import test from 'ava'

test('isArrowFunction', t => {
  const node = { type: 'ArrowFunctionExpression' }
  const result = isArrowFunction(node)

  t.true(result)
})

test('isTypeJSX', t => {
  const node = { type: 'JSXElement' }
  const result = isTypeJSX(node)

  t.true(result)
})

test('doesReturnJSX', t => {
  const node = { body: { type: 'JSXElement' } }
  const result = doesReturnJSX(node)

  t.true(result)
})

test('ignores function that doesn\'t return JSX', t => {
  const node = { body: { type: 'BlockStatement', body: [] } }
  const result = doesReturnJSX(node)

  t.false(result)
})

test('set display name for implicit return', t => {
  const node = {
    node: {
      declaration: {
        body: { type: 'JSXElement' },
        type: 'ArrowFunctionExpression',
      },
    },
  }
  const state = { file: { opts: { basename: 'App' } } }
  const output = plugin({ types: { identifier: name => name } })
  const { visitor: { ExportDefaultDeclaration: transformer } } = output

  transformer(node, state)

  t.is(node.node.declaration.id, 'App')
})

test('set display name from folder name if index.js', t => {
  const node = {
    node: {
      declaration: {
        body: { type: 'JSXElement' },
        type: 'ArrowFunctionExpression',
      },
    },
  }
  const state = {
    file: {
      opts: {
        basename: 'index',
        filename: './App/index.js',
      },
    },
  }
  const output = plugin({ types: { identifier: name => name } })
  const { visitor: { ExportDefaultDeclaration: transformer } } = output

  transformer(node, state)

  t.is(node.node.declaration.id, 'App')
})

test('set display name with function block then return', t => {
  const node = {
    node: {
      declaration: {
        body: {
          type: 'BlockStatement',
          body: [
            { argument: { type: 'CommentNode' } },
            { argument: { type: 'JSXElement' }, type: 'ReturnStatement' },
          ],
        },
        type: 'ArrowFunctionExpression',
      },
    },
  }
  const state = { file: { opts: { basename: 'App' } } }
  const output = plugin({ types: { identifier: name => name } })
  const { visitor: { ExportDefaultDeclaration: transformer } } = output

  transformer(node, state)

  t.is(node.node.declaration.id, 'App')
})
