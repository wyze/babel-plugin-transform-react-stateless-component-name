// @flow

import type { NodePath } from 'babel-traverse'

const isDisplayNameSet = (
  statement: NodePath,
  displayName: string,
): boolean => {
  const displayNameSetInExpr = (sibling: NodePath): boolean => {
    if ( !sibling.isExpressionStatement() ) {
      return false
    }
    const expression: NodePath = sibling.get('expression')
    const member: NodePath = sibling.get('expression.left')

    return !!(
      expression.isAssignmentExpression() &&
      member.get('object').isIdentifier({ name: displayName }) &&
      member.get('property').isIdentifier({ name: 'displayName' })
    )
  }

  for ( let i = statement.container.length; i > -1; i -= 1 ) {
    const sibling: NodePath = statement.getSibling(i)

    if ( sibling.isTryStatement() ) {
      const block: NodePath = sibling.get('block')

      if ( block.node.body.length === 1 ) {
        if ( displayNameSetInExpr(block.get('body.0')) ) {
          return true
        }
      }
    }
    if ( displayNameSetInExpr(sibling) ) {
      return true
    }
  }

  return false
}

export default isDisplayNameSet
