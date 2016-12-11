// @flow

import type { BabelTypes } from '../types'
import type { NodePath } from 'babel-traverse'

const makeDisplayName = ( t: BabelTypes, displayName: string ): NodePath =>
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
