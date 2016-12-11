// @flow

import type { NodePath } from 'babel-traverse'

const isDisplayNameSet = (
  statement: NodePath,
  displayName: string,
): boolean => {
  for ( let i = statement.container.length; i > -1; i -= 1 ) {
    const sibling: NodePath = statement.getSibling(i)

    if ( sibling.isExpressionStatement() ) {
      const member: NodePath = sibling.get('expression.left')

      /* istanbul ignore else */
      if (
        member.get('object').isIdentifier({ name: displayName }) &&
        member.get('property').isIdentifier({ name: 'displayName' })
      ) {
        return true
      }
    }
  }

  return false
}

export default isDisplayNameSet
