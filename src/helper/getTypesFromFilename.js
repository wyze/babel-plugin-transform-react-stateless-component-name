import path from 'path'

const getTypesFromFilename = ( t, { basename, filename } ) => {
  // ./{module name}/index.js
  const name = t.toBindingIdentifierName(
    basename === 'index' ?
      path.basename(path.dirname(filename)) :
      basename,
  )

  return {
    identifier: t.identifier(name),
    name,
  }
}

export default getTypesFromFilename
