import React, { useContext, useRef, useState } from 'react'
import Button from '../Buttons/Button'
import { ethers } from 'ethers'
import { StakingContext } from '../../context/StakingContext';
import EventContext from '../../context/EventContext';
function StakeAmount() {
    const { state } = useContext(StakingContext);
    const { account, stakeTokenContract, stakingContract } = state;
    const {setIsReload} = useContext(EventContext)
      const [status , setStatus] = useState("")
    const inputRefAmount = useRef()

    const handleStakeAmount = async(e)=>{
     e.preventDefault()
     const amount = inputRefAmount.current.value.trim()
     if(isNaN(amount) || amount <=0){
        alert("Please enter a valid amount")
        return
     }
     const amountToSend = ethers.parseEther(amount).toString()
     try{
        const transaction = await stakingContract.stake(amountToSend)
        setStatus("Pending Stake Transaction.....")
        const tx = await transaction.wait()
        if(tx.status === 1){
            setStatus("Successfull Stake Transaction.....")
            setIsReload(prev=>!prev)
            setTimeout(()=>{
              setStatus("")
            },4000)
            inputRefAmount.current.value = ""
        }
        else{
            setStatus("Failed Stake Transaction.....")
            setTimeout(()=>{
              setStatus("")
            },8000)            
        }
     }
     catch(err){
        console.error("Token Approval Failed", err.message)
     }
    }
return (
  <div className="form-card">
    {status && <div className="status">{status}</div>}

    <form>
      <label>Stake Amount</label>

      <input
        type="text"
        ref={inputRefAmount}
        placeholder="Enter token amount"
      />

      <Button
        type="submit"
        onClick={handleStakeAmount}
        label="Stake Tokens"
      />
    </form>
  </div>
);
}

export default StakeAmount