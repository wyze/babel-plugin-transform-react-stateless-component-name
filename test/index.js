import plugin from '../lib';
import test from 'ava';
import { isArrowFunction, isTypeJSX, doesReturnJSX } from '../lib';

test('isArrowFunction', async t => {
  const node = { type: 'ArrowFunctionExpression' };
  const result = await isArrowFunction(node);

  t.true(result);
});

test('isTypeJSX', async t => {
  const node = { type: 'JSXElement' };
  const result = await isTypeJSX(node);

  t.true(result);
});

test('doesReturnJSX', async t => {
  const node = { body: { type: 'JSXElement' } };
  const result = await doesReturnJSX(node);

  t.true(result);
});

test('ignores function that doesn\'t return JSX', async t => {
  const node = { body: { type: 'BlockStatement', body: [] } };
  const result = await doesReturnJSX(node);

  t.false(result);
});

test('set display name for implicit return', async t => {
  const node = {
    node: {
      declaration: {
        body: { type: 'JSXElement' },
        type: 'ArrowFunctionExpression',
      }
    }
  };
  const state = { file: { opts: { basename: 'App' } } };
  const output = plugin({ types: { identifier: name => name } });
  const { visitor: { ExportDefaultDeclaration: transformer } } = output;

  transformer(node, state);

  t.is(node.node.declaration.id, 'App');
});

test('set display name from folder name if index.js', async t => {
  const node = {
    node: {
      declaration: {
        body: { type: 'JSXElement' },
        type: 'ArrowFunctionExpression',
      }
    }
  };
  const state = {
    file: {
      opts: {
        basename: 'index',
        filename: './App/index.js'
      }
    }
  };
  const output = plugin({ types: { identifier: name => name } });
  const { visitor: { ExportDefaultDeclaration: transformer } } = output;

  transformer(node, state);

  t.is(node.node.declaration.id, 'App');
});

test('set display name with function block then return', async t => {
  const node = {
    node: {
      declaration: {
        body: {
          type: 'BlockStatement',
          body: [
            { argument: { type: 'CommentNode' } },
            { argument: { type: 'JSXElement' } },
          ],
        },
        type: 'ArrowFunctionExpression',
      }
    }
  };
  const state = { file: { opts: { basename: 'App' } } };
  const output = plugin({ types: { identifier: name => name } });
  const { visitor: { ExportDefaultDeclaration: transformer } } = output;

  transformer(node, state);

  t.is(node.node.declaration.id, 'App');
});
