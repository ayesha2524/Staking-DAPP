import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '../Buttons/Button'
import { ethers } from 'ethers'
import { StakingContext } from '../../context/StakingContext';
import EventContext from '../../context/EventContext';

function Withdraw() {
  const {state} = useContext(StakingContext)
  const {account , stakingContract} = state
  const {setIsReload} = useContext(EventContext)

  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [status , setStatus] = useState("")
  const inputRefAmount = useRef("")
  const handleWithdrawAmount = async(e)=>{
    e.preventDefault()
    const amount = inputRefAmount.current.value.trim()
    if(isNaN(amount) || amount <= 0){
        alert("Please enter a valid amount")
        return
    }
    const amountInWei = ethers.parseEther(amount).toString()
    try{
       const withdrawTransaction = await stakingContract.withdraw(amountInWei)
       setStatus("Pending Withdraw Transaction....")
       const tx = await withdrawTransaction.wait()
       if(tx.status === 1){
         setStatus("Successfull Withdraw Tranaction....")
         setIsReload(prev=>!prev)
         setTimeout(()=>{
            setStatus("")
         },4000)
         inputRefAmount.current.value = ""
       }
       else{
         setStatus("Failed Withdraw Tranaction....")
         setTimeout(()=>{
            setStatus("")
         },8000)
       }
    }
    catch(err){
        console.error("Withdraw Failed", err.message)
    }

  }
  return (
  <div className="form-card">
    {status && <div className="status">{status}</div>}

    <form>
      <label>Withdraw Amountt</label>

      <input
        type="text"
        ref={inputRefAmount}
        placeholder="Enter token amount"
      />

      <Button
        type="submit"
        onClick={handleWithdrawAmount}
        label="Stake Tokens"
      />
    </form>
  </div>
);
}

export default Withdraw