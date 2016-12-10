import { basename, dirname } from 'path'

const doesReturnJSX = node => {
  const body = node.get('body')

  if ( body.isJSXElement() ) {
    return true
  }

  if ( body.isBlockStatement() ) {
    const lastBlock = [ ...body.get('body') ].pop()

    if ( lastBlock.isReturnStatement() ) {
      return lastBlock.get('argument').isJSXElement()
    }

    if ( lastBlock.isIfStatement() ) {
      const alternate = lastBlock.get('alternate')
      const consequent = lastBlock.get('consequent')

      return [ alternate, consequent ].reduce(( jsx, n ) => {
        // If we have jsx, then just ignore all other checks.
        if ( jsx ) {
          return jsx
        }

        // if ( true ) return <div />
        if ( n.isReturnStatement() ) {
          return n.get('argument').isJSXElement()
        }

        // if ( true ) { return <div /> }
        if ( n.isBlockStatement() ) {
          const l = [ ...n.get('body') ].pop()

          if ( l.isReturnStatement() ) {
            return l.get('argument').isJSXElement()
          }
        }

        return false
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

      if ( !doesReturnJSX(node) ) {
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
