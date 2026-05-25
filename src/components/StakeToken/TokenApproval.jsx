import React, { useContext, useRef, useState } from 'react'
import Button from '../Buttons/Button'
import { ethers } from 'ethers'
import { StakingContext } from '../../context/StakingContext';

function TokenApproval() {
      const { state } = useContext(StakingContext);
      const { account, stakeTokenContract, stakingContract } = state;
      const [status , setStatus] = useState("")
    const inputRefAmount = useRef()
    const handleApprovalAmount = async(e)=>{
     e.preventDefault()
     const amount = inputRefAmount.current.value.trim()
     if(isNaN(amount) || amount <=0){
        alert("Please enter a valid amount")
        return
     }
     const amountToSend = ethers.parseEther(amount).toString()
     try{
        const address = await stakingContract.getAddress()
        const approvalToken = await stakeTokenContract.approve(address , amountToSend)
        setStatus("Pending Transaction.....")
        const tx = await approvalToken.wait()
        if(tx.status === 1){
            setStatus("Successfull Transaction.....")
            setTimeout(()=>{
              setStatus("")
            },4000)
            inputRefAmount.current.value = ""
        }
        else{
            setStatus("Failed Transaction.....")
            setTimeout(()=>{
              setStatus("")
            },8000)            
        }
     }
     catch(err){
        console.err("Token Approval Failed", err.message)
     }
    }
return (
  <div className="form-card">
    {status && <div className="status">{status}</div>}

    <form>
      <label>Token Approval</label>

      <input
        type="text"
        ref={inputRefAmount}
        placeholder="Enter token amount"
      />

      <Button
        type="submit"
        onClick={handleApprovalAmount}
        label="Stake Tokens"
      />
    </form>
  </div>
);
}

export default TokenApproval