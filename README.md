# Staking DApp (ERC20 + React + Solidity)

A full-stack decentralized staking application built using Solidity, React.js, and Ethers.js.  
Users can stake tokens, earn rewards over time, and withdraw both staked tokens and rewards.

## Features

- Connect MetaMask wallet
- Stake ERC20 tokens (STK)
- Time-based reward generation (per minute)
- Claim reward tokens (RWT)
- Withdraw staked tokens anytime
- Real-time dashboard updates
- Event-based UI updates using smart contract events

## Tech Stack

### Smart Contract
- Solidity ^0.8.20
- OpenZeppelin ERC20
- ReentrancyGuard

### Frontend
- React.js
- Ethers.js v6
- Context API (State Management)
- MetaMask Integration

### Blockchain
- Ethereum Sepolia Testnet

## Smart Contracts

### Stake Token (STK)
- ERC20 token used for staking

### Reward Token (RWT)
- ERC20 token used as reward

### Staking Contract
Handles:
- staking logic
- reward calculation
- withdrawal
- reward distribution

## Reward Logic

Users earn rewards based on:
- staked amount
- staking duration

Reward is generated per minute using a time-based formula.

## Project Architecture

User Wallet (MetaMask)  
↓  
React Frontend (Ethers.js)  
↓  
Staking Smart Contract  
↓  
ERC20 Tokens (STK & RWT)

## Contract Addresses (Sepolia)

Stake Token: 0x8D7F8bF406E84FC3C9693336af13A42118FEaDAc  
Reward Token: 0xfA81C553935Dce326e725Cd77D2D1aadc5Eb1F5d  
Staking Contract: 0xB4059D8f58f369B2fdE1f37437E5b8E43D1A4B1F

## How to Run Project

### Install Dependencies

Frontend setup:
cd staking_system
npm install

Frontend will run on:
http://localhost:3000

## Notes

- Make sure MetaMask is connected to Sepolia network
- Ensure user has STK tokens before staking
- Approve tokens before calling stake function
