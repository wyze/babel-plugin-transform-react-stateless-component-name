const isDisplayNameSet = ( statement, displayName ) => {
  for ( let i = statement.container.length; i > -1; i -= 1 ) {
    const sibling = statement.getSibling(i)

    if ( sibling.isExpressionStatement() ) {
      const member = sibling.get('expression.left')

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
