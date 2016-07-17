import path from 'path'

export const isArrowFunction = ({ type }) => type === 'ArrowFunctionExpression'

export const isTypeJSX = ({ type }) => type === 'JSXElement'

export const doesReturnJSX = ({ body }) => {
  if ( isTypeJSX(body) ) {
    return true
  }

  const block = body.body

  if ( block.length ) {
    const lastBlock = block.slice(0).pop()

    if ( lastBlock.type === 'ReturnStatement' ) {
      return isTypeJSX(lastBlock.argument)
    }
  }

  return false
}

export default ({ types: t }) => ({
  visitor: {
    ExportDefaultDeclaration({ node }, { file: { opts } }) {
      if ( isArrowFunction(node.declaration) ) {
        if ( doesReturnJSX(node.declaration) ) {
          let displayName = opts.basename

          // ./{module name}/index.js
          if ( displayName === 'index' ) {
            displayName = path.basename(path.dirname(opts.filename))
          }

          // set display name
          // eslint-disable-next-line no-param-reassign
          node.declaration.id = t.identifier(displayName)
        }
      }
    },
  },
})
