import React, { useContext } from 'react'
import { StakingContext } from '../../context/StakingContext'

function AccountConnected() {
   const {state} = useContext(StakingContext)
   const {account} = state
  return (
    <div>
        <p> Connected Account: {account} </p>
    </div>
  )
}

export default AccountConnected