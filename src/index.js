import { basename, dirname } from 'path'

export const doesReturnJSX = node => {
  const body = node.get('body')

  if ( body.isJSXElement() ) {
    return true
  }

  const block = body.get('body')

  if ( block && block.length ) {
    const lastBlock = [ ...block ].pop()

    if ( lastBlock.isReturnStatement() ) {
      return lastBlock.get('argument').isJSXElement()
    }
  }

  return false
}

export default ({ types: t }) => ({
  visitor: {
    ExportDefaultDeclaration(path, { file: { opts } }) {
      const node = path.get('declaration')

      if ( !node.isArrowFunctionExpression() ) {
        return
      }

      if ( !doesReturnJSX(node) ) {
        return
      }

      let displayName = opts.basename

      // ./{module name}/index.js
      if ( displayName === 'index' ) {
        displayName = basename(dirname(opts.filename))
      }

      // sets display name
      node.id = t.identifier(displayName)
    },
  },
})
