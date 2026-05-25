import React from "react";
import EarnedReward from "./EarnedReward";
import RewardRate from "./RewardRate";
import StakeAccount from "./StakeAccount";

function DisplayPannel() {
  return (
    <div className="dashboard-grid">
      <StakeAccount />
      <RewardRate />
      <EarnedReward />
    </div>
  );
}

export default DisplayPannel;
