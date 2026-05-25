import { ethers } from "ethers";
import stakingABI from "../ABI/stakingABI.json";
import stakeTokenABI from "../ABI/stakeTokenABI.json";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
        throw new Error("Meta Mask is not installed")
    }
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
    })
    const chainIDhex = await window.ethereum.request({
        method: 'eth_chainId'
    })
    const chainID = parseInt(chainIDhex)
    console.log(`chain ID hex: ${chainIDhex} chainID parse: ${chainID}`)

    const account = accounts[0]

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const stakingAddress = '0xB4059D8f58f369B2fdE1f37437E5b8E43D1A4B1F'
    const stakeTokenAddress = '0x8D7F8bF406E84FC3C9693336af13A42118FEaDAc'

    const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer)
    const stakeTokenContract = new ethers.Contract(stakeTokenAddress, stakeTokenABI, signer)
    
    return {provider, account, stakingContract, stakeTokenContract, chainID}
  } catch (err) {
    throw err;
  }
};
