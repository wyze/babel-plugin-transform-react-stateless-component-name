import React from 'react'

export default ({ renderA, renderB }) => {
  const loading = true

  if ( loading )
    renderA()
  else {
    renderB()
  }
}
