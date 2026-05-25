import React, { useContext } from "react";
import { StakingContext } from "../../context/StakingContext";

function NetworkConnected() {
  const { state } = useContext(StakingContext);
  const { chainID } = state;
  if(chainID === 11155111){
    return <p>Connected Network: Sepolia </p>
  }
  else{
    return <p>Unsupported Network</p>
  }
}

export default NetworkConnected;
