import "./App.css";
import DisplayPannel from "./components/DisplayComponent/DisplayPannel";
import Navigation from "./components/Navigation/Navigation";
import StakeAmount from "./components/StakeToken/StakeAmount";
import TokenApproval from "./components/StakeToken/TokenApproval";
import Wallet from "./components/Wallets/Wallet";
import Withdraw from "./components/Withdraw/Withdraw";
import GetReward from "./components/GetRwards/GetReward";
import { EventContextProvider } from "./context/EventContext";
import { useContext } from "react";
import { StakingContext } from "./context/StakingContext";
function App() {
  return (
    <div className="app-container">
      <Wallet>
        <Navigation />

        <EventContextProvider>
          <DisplayPannel />

          <div className="dashboard-grid">
            <StakeAmount />
            <Withdraw />
            <TokenApproval />
            <GetReward />
          </div>
        </EventContextProvider>
      </Wallet>
    </div>
  );
}

export default App;
