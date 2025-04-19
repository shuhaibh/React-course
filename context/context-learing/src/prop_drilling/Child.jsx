import React from 'react'
import Granddaughter from './Granddaughter'
import Grandson from './Grandson'

function Child() {
  return (
    <div className='children'>
        <h1>Child </h1>
        <Granddaughter />
        <Grandson />
    </div>
  )
}

export default Child
