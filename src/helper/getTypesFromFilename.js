// @flow

import type { BabelTypes } from '../types'
import type { BindingIdentifierName, Identifier } from 'babel-types'
import path from 'path'

type File = {
  basename: string,
  filename: string,
}

type FilenameTypes = {
  identifier: Identifier,
  name: string,
}

const getTypesFromFilename = (
  t: BabelTypes,
  { basename, filename }: File,
): FilenameTypes => {
  // ./{module name}/index.js
  const name: BindingIdentifierName = t.toBindingIdentifierName(
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
