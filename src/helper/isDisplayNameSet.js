// @flow

import type { NodePath } from 'babel-traverse'

const isDisplayNameSet = (
  statement: NodePath,
  displayName: string,
): boolean => {
  const displayNameSetInExpr = (sibling: NodePath): boolean => {
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

    if ( sibling.isExpressionStatement() && displayNameSetInExpr(sibling) ) {
      return true
    }
  }

  return false
}

export default isDisplayNameSet
