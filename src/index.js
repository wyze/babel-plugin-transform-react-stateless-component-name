// @flow

import type { BabelTypes } from './types'
import type { File, NodePath } from 'babel-traverse'
import {
  doesReturnJSX,
  getTypesFromFilename,
  isDisplayNameSet,
  makeDisplayName,
} from './helper'

type VisitorHandler = ( NodePath, File ) => ?void

type Visitor = {
  visitor: {
    ExportDefaultDeclaration: VisitorHandler,
    JSXElement: VisitorHandler,
  },
}

export default ({ types: t }: { types: BabelTypes }): Visitor => ({
  visitor: {
    ExportDefaultDeclaration(
      path: NodePath,
      { file: { opts } }: File,
    ): ?void {
      const node: NodePath = path.get('declaration')

      if (
        !node.isArrowFunctionExpression() &&
        !node.isFunctionDeclaration()
      ) {
        return
      }

      if ( !doesReturnJSX(node.get('body')) ) {
        return
      }

      const { identifier, name } = getTypesFromFilename(t, opts)

      // sets display name
      node.node.id = identifier

      const { body, id, params } = node.node
      // checks to see if we need to convert `export default function () {}`
      const init = node.isFunctionDeclaration() ?
        t.functionExpression(id, params, body) :
        node.node

      const variable = t.variableDeclaration('const', [
        t.variableDeclarator(identifier, init),
      ])
      const assignment = makeDisplayName(t, name)
      const exporter = t.exportDefaultDeclaration(identifier)

      path.replaceWithMultiple([ variable, assignment, exporter ])
    },
    JSXElement( path: NodePath ): ?void {
      const { parentPath: parent } = path

      // avoids traversing assigning jsx to variable
      if ( !parent.isReturnStatement() ) {
        return
      }

      const variable = path.find(( node: NodePath ): NodePath =>
        node.isVariableDeclarator() || node.isExportDefaultDeclaration(),
      )

      // Ignore the `if` since I can't come up with a test case to satisfy it.
      /* istanbul ignore if */
      if ( !variable ) {
        return
      }

      const statement = variable.getStatementParent()
      const { node: name } = variable.get('id.name')

      // check to make sure we don't set displayName when already set
      if ( isDisplayNameSet(statement, name) ) {
        return
      }

      statement.insertAfter(makeDisplayName(t, name))
    },
  },
})
