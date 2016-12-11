// @flow

import type { NodePath } from 'babel-traverse'

const doesReturnJSX = ( node: NodePath): boolean => {
  if ( node.isJSXElement() ) {
    return true
  }

  if ( node.isReturnStatement() ) {
    return doesReturnJSX(node.get('argument'))
  }

  if ( node.isBlockStatement() ) {
    const block: NodePath = [ ...node.get('body') ].pop()

    if ( block.isReturnStatement() ) {
      return doesReturnJSX(block.get('argument'))
    }

    if ( block.isIfStatement() ) {
      const alternate: NodePath = block.get('alternate')
      const consequent: NodePath = block.get('consequent')

      return [ alternate, consequent ].reduce(
        ( jsx: boolean, branch: NodePath ): boolean => {
          if ( jsx ) {
            return jsx
          }

          return doesReturnJSX(branch)
        },
        false,
      )
    }
  }

  return false
}

export default doesReturnJSX
