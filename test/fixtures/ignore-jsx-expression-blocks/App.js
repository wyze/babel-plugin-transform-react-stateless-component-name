import React from 'react'

const HelloWorld = () => {
  const content = (
    <div>
      {
        [1, 2, 3].map((n) => { return <h1>{n}</h1> })
      }
    </div>
  )

  return <div>{content}</div>
}

export default HelloWorld
