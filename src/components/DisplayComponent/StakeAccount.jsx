import React, { useContext, useEffect, useState } from "react";
import { StakingContext } from "../../context/StakingContext";
import { ethers } from "ethers";
import EventContext from "../../context/EventContext";

function StakeAccount() {
  const { state } = useContext(StakingContext);
  const { account, stakingContract } = state;
  const { isReload } = useContext(EventContext);

  const [stakeAmount, setStakeAccount] = useState(0);
  const handleStakeAmnount = async () => {
    const stakeAmountWei = await stakingContract.stakeBalance(account);
    return ethers.formatUnits(stakeAmountWei, 18);
  };
  useEffect(() => {
    const fetchingStakingData = async () => {
      try {
        const stakeAmountETH = await handleStakeAmnount();
        setStakeAccount(stakeAmountETH);

        stakingContract.on("Withdrawn", async (user, amount) => {
          console.log("Withdrawn: ", user, amount);
          const amountETH = await handleStakeAmnount();
          setStakeAccount(amountETH);
        });
        stakingContract.on("Staked", async (user, amount) => {
          console.log("Staked: ", user, amount);
          const amountETH = await handleStakeAmnount();
          setStakeAccount(amountETH);
        });
      } catch (err) {
        console.log("Error occurred during fetching", err.message);
      }
    };
    stakingContract && fetchingStakingData();
  }, [stakingContract, account, isReload]);

  return <div className="card">
    <div className="card-title">Staked Amount</div>
    <div className="card-value">{stakeAmount} STK</div>
    </div>;
}

export default StakeAccount;
