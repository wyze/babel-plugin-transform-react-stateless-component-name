import path from 'path';

export const isArrowFunction = ({ type }) => type === 'ArrowFunctionExpression';

export const isTypeJSX = ({ type }) => type === 'JSXElement';

export const doesReturnJSX = ({ body }) => {
  if ( isTypeJSX(body) ) {
    return true;
  }

  const block = body.body;

  if ( block.length ) {
    return isTypeJSX(block.slice(0).pop().argument);
  }

  return false;
};

export default function({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration({ node }, state) {
        if ( isArrowFunction(node.declaration) ) {
          if ( doesReturnJSX(node.declaration) ) {
            let displayName = state.file.opts.basename;

            // ./{module name}/index.js
            if ( displayName === 'index' ) {
              displayName = path.basename(path.dirname(state.file.opts.filename));
            }

            // set display name
            node.declaration.id = t.identifier(displayName);
          }
        }
      },
    },
  };
}
