import React from 'react'
import { FamilyContext } from './FamilyContext'
import { useContext } from 'react'

function Grandson() {
 const message = useContext(FamilyContext)
  return (
    <div className='gson'>
      <h3>Grand Son {message.familyName}</h3>
    </div>
  )
}

export default Grandson
 