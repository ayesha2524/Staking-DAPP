import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { StakingContext } from "../../context/StakingContext";

function RewardRate() {
  const { state } = useContext(StakingContext);
  const { account, stakingContract } = state;
  const [rewardRate, setRewardRate] = useState(0);
  useEffect(() => {
    const fetchingRewardRateData = async () => {
      try {
        const rewardRateWei = await stakingContract.REWARD_Rate();
        const rewardRateETH = ethers.formatUnits(rewardRateWei, 18);
        setRewardRate(rewardRateETH);
      } catch (err) {
        console.log("Error occurred during fetching", err.message);
      }
    };
    stakingContract && fetchingRewardRateData();
  }, [stakingContract, account]);
  return (
    <div className="card">
      <div className="card-title">Reward Rate</div>
      <div className="card-value">{rewardRate} Token/Minute</div>
    </div>
  );
}

export default RewardRate;
