import { basename, dirname } from 'path'

const doesReturnJSX = node => {
  if ( node.isJSXElement() ) {
    return true
  }

  if ( node.isReturnStatement() ) {
    return doesReturnJSX(node.get('argument'))
  }

  if ( node.isBlockStatement() ) {
    const block = [ ...node.get('body') ].pop()

    if ( block.isReturnStatement() ) {
      return doesReturnJSX(block.get('argument'))
    }

    if ( block.isIfStatement() ) {
      const alternate = block.get('alternate')
      const consequent = block.get('consequent')

      return [ alternate, consequent ].reduce(( jsx, branch ) => {
        if ( jsx ) {
          return jsx
        }

        return doesReturnJSX(branch)
      }, false)
    }
  }

  return false
}

const getTypesFromFilename = ( t, { basename: base, filename } ) => {
  // ./{module name}/index.js
  const name = t.toBindingIdentifierName(
    base === 'index' ?
      basename(dirname(filename)) :
      base,
  )

  return {
    identifier: t.identifier(name),
    name,
  }
}

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
