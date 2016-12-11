import {
  doesReturnJSX,
  getTypesFromFilename,
  isDisplayNameSet,
  makeDisplayName,
} from './helper'

export default ({ types: t }) => ({
  visitor: {
    ExportDefaultDeclaration( path, { file: { opts } } ) {
      const node = path.get('declaration')

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
    JSXElement( path ) {
      const { parentPath: parent } = path

      // avoids traversing assigning jsx to variable
      if ( !parent.isReturnStatement() ) {
        return
      }

      const variable = path.find(node =>
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
