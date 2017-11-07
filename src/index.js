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
      const arrow = node.isArrowFunctionExpression()

      if (
        !node.isArrowFunctionExpression() &&
        !node.isFunctionDeclaration()
      ) {
        return
      }

      if ( !doesReturnJSX(node.get('body')) ) {
        return
      }

      const { name: functionName } = node.node.id || {}
      const { identifier, name } = arrow ?
        getTypesFromFilename(t, opts) :
        ({
          identifier: t.identifier(functionName),
          name: functionName,
        })

      // sets display name
      node.node.id = identifier

      const { body, id, params } = node.node
      // checks to see if we need to convert `export default function () {}`
      const init = arrow ?
        node.node :
        t.functionExpression(id, params, body)

      const variable = t.variableDeclaration('const', [
        t.variableDeclarator(identifier, init),
      ])
      const assignment = isDisplayNameSet(path.getStatementParent(), name) ?
        undefined :
        makeDisplayName(t, name)
      const exporter = t.exportDefaultDeclaration(identifier)

      path.replaceWithMultiple([
        variable,
        assignment,
        exporter,
        // filter out possibly undefined assignment
      ].filter(( replacement: NodePath ): boolean => !!replacement))
    },
    JSXElement( path: NodePath ): ?void {
      const { parentPath: parent } = path

      // avoids traversing assigning jsx to variable
      if ( !parent.isReturnStatement() ) {
        return
      }

      const variable = path.find(( node: NodePath ): NodePath =>
        node.isVariableDeclarator() || node.isExportDefaultDeclaration() ||
          node.isJSXExpressionContainer(),
      )

      // Ignore JSX elements inside JSX expression blocks
      if ( t.isJSXExpressionContainer(variable) ) {
        return
      }

      const name = (() => {
        try {
          return variable.get('id.name').node
        } catch (errr) {
          return undefined
        }
      })()

      if ( name == null ) {
        return
      }

      const statement = variable.getStatementParent()

      // check to make sure we don't set displayName when already set
      if ( isDisplayNameSet(statement, name) ) {
        return
      }

      statement.insertAfter(makeDisplayName(t, name))
    },
  },
})
