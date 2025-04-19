import React from 'react'
import Child from './Child'
import { FamilyContext } from './FamilyContext'
import { useContext } from 'react'

function Parents() {
    const message = useContext(FamilyContext)
  return (
    <div className='parent'>
        <h1>Parent {message.familyName} </h1>
        <Child />
    </div>
  )
}

export default Parents
