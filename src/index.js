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

      if ( !node.isArrowFunctionExpression() ) {
        return
      }

      if ( !doesReturnJSX(node.get('body')) ) {
        return
      }

      const { identifier } = getTypesFromFilename(t, opts)

      // sets display name
      node.id = identifier
    },
    JSXElement( path, { file: { opts } } ) {
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
      const displayName = variable.isExportDefaultDeclaration() ?
        getTypesFromFilename(t, opts).name :
        variable.get('id.name').node

      // check to make sure we don't set displayName when already set
      if ( isDisplayNameSet(statement, displayName) ) {
        return
      }

      statement.insertAfter(
        makeDisplayName(t, displayName),
      )
    },
  },
})
