import { ethers } from "ethers";
import { Children, useEffect, useState } from "react";

import React from "react";
import { connectWallet } from "../../utils/connectWalllet";
import { StakingContext } from "../../context/StakingContext";
import Button from "../Buttons/Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainIDChange } from "../../utils/handleChainIDChange";

function Wallet({ children }) {
  useEffect(() => {
    const accountHandler = handleAccountChange(setState);
    const chainHandler = handleChainIDChange(setState);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountHandler);
      window.ethereum.on("chainChanged", chainHandler);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", accountHandler);
        window.ethereum.removeListener("chainChanged", chainHandler);
      }
    };
  }, []);
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainID: null,
  });

  const [loader, setLoading] = useState(false);
  const [isWalletConnect , setIsWalletConnect] = useState(false)
  const handleWallet = async () => {
    try {
      setLoading(true);
      const {
        provider,
        account,
        stakingContract,
        stakeTokenContract,
        chainID,
      } = await connectWallet();
      setState({
        provider,
        account,
        stakingContract,
        stakeTokenContract,
        chainID,
      });
      setIsWalletConnect(true)
    } catch (err) {
      console.error("Error occured", err);
    } finally {
      setLoading(false);
    }
  };
  function disConnectYourWallet(){
    setIsWalletConnect(false)
  }
  return (
    <div>
      <StakingContext.Provider value={{ state }}>
        {isWalletConnect ?  children : ""}
      </StakingContext.Provider>
      {loader && <p>Looading...</p>}
      <div className="connect-btn">
       { !isWalletConnect && <Button onClick={handleWallet} label="Connect Wallet" /> }
      </div>
      <div className="connect-btn">
       { isWalletConnect && <Button onClick={disConnectYourWallet} label="Disconnect Wallet" /> }
      </div> 
    </div>
  );
}

export default Wallet;
