import React from 'react'

export default () => {
  const loading = true

  if ( loading ) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    return (
      <h1>Hello!</h1>
    )
  }
}
