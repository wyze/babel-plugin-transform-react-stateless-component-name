const makeDisplayName = ( t, displayName ) =>
  t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier(displayName),
        t.identifier('displayName'),
      ),
      t.stringLiteral(displayName),
    ),
  )

export default makeDisplayName
