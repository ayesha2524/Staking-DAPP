import React from "react";
import AccountConnected from "./AccountConnected";
import NetworkConnected from "./NetworkConnected";

function Navigation() {
  return (
    <div className="navbar">
      <div className="logo">Staking DApp</div>

      <div className="wallet-info">
        <AccountConnected />
        <NetworkConnected />
      </div>
    </div>
  );
}

export default Navigation;
