import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '../Buttons/Button'
import { ethers } from 'ethers'
import { StakingContext } from '../../context/StakingContext';
import EventContext from '../../context/EventContext';

function GetReward() {
  const {state} = useContext(StakingContext)
  const {account , stakingContract} = state
  const {setIsReload} = useContext(EventContext)
  const [RewardAmount, setRewardAmount] = useState(0)
  const [status , setStatus] = useState("")
 
  const handleGetReward = async(e)=>{
    try{
       const transaction = await stakingContract.getReward()
       setStatus("Getting Rewards....")
       console.log(transaction)
       const tx = await transaction.wait()
       
       if(tx.status === 1){
        setStatus("Got Reward")
        setIsReload(prev=>!prev)
        setTimeout(()=>{
           setStatus("")
        },4000)
       }
    }
    catch(err){
        console.error("Claimed Rewards Failed", err.message)
    }

  }

return (
  <div className="form-card">
    {status && <div className="status">{status}</div>}

    <h2 className="card-title">Claim Rewards</h2>

    <Button
      type="submit"
      onClick={handleGetReward}
      label="Claim Reward"
    />
  </div>
);
}

export default GetReward