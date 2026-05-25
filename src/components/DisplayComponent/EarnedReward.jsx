import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { StakingContext } from "../../context/StakingContext";
import EventContext from "../../context/EventContext";
function EarnedReward() {
  const { state } = useContext(StakingContext);
  const { account, stakingContract } = state;
  const {isReload} = useContext(EventContext)
  const [reawardValue , setRewardValue] = useState(0)

  useEffect(() => {
    const fetchingEarnedRewardbyUser= async () => {
      try {
        const rewardValueInWei = await stakingContract.earned(account)
        const rewardStering = ethers.formatUnits(rewardValueInWei, 18)
        const rewardValueInETH = parseInt(rewardStering).toFixed(2)
        setRewardValue(rewardValueInETH)
      } catch (err) {
        console.log("Error occurred during fetching", err.message);
      }
    };
    stakingContract && fetchingEarnedRewardbyUser();
    const interval =setInterval(()=>{
      stakingContract && fetchingEarnedRewardbyUser()
    },60000)
    

    return()=> clearInterval(interval)
  }, [stakingContract, account, isReload]); 
  return (
  <div className="card">
    <div className="card-title">Earned Reward</div>
    <div className="card-value">{reawardValue} STK</div>
  </div>
);
}

export default EarnedReward;
