// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract Staking is ReentrancyGuard {
  
    IERC20 public s_stakeToken;
    IERC20 public s_rewardToken;

    uint public constant REWARD_Rate = 1e18;
    uint private totalStakeToken;
    uint public rewardPerTokenStored;
    uint public lastUpdateTime;

    mapping(address => uint) public stakeBalance;
    mapping(address => uint) public rewardBalance;
    mapping(address => uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint indexed amount);
    event Withdrawn(address indexed user, uint indexed amount);
    event RewardClaim(address indexed user, uint indexed reward);

    constructor(address _stakeToken, address _rewardToken) {
        s_stakeToken = IERC20(_stakeToken);
        s_rewardToken = IERC20(_rewardToken);
    }

    function rewardPerToken() public view returns (uint) {
        if (totalStakeToken == 0) {
            return rewardPerTokenStored;
        }
        uint totalTime = block.timestamp - lastUpdateTime;
        uint minutePassed = totalTime / 60;
        uint totalRewards = minutePassed * REWARD_Rate;
        return rewardPerTokenStored + ((totalRewards * 1e18) / totalStakeToken);
    }

    function earned(address account) public view returns (uint) {
        return ((stakeBalance[account] *
            (rewardPerToken() - userRewardPerTokenPaid[account]) / 1e18) + rewardBalance[account]);
    }
    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewardBalance[_account] = earned(_account);
        userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        _;
    }

    function stake(
        uint _amount
    ) external nonReentrant updateReward(msg.sender) {
        require(_amount > 0, "Amoun t must be greater than 0");
        totalStakeToken += _amount;
        stakeBalance[msg.sender] += _amount;
        emit Staked(msg.sender, _amount);

        bool success = s_stakeToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "Transfer Failed");
    }

    function withdraw(
        uint _amount
    ) external nonReentrant updateReward(msg.sender) {
        require(_amount > 0, "Amoun t must be greater than 0");
        require(stakeBalance[msg.sender] >= _amount, "Insufficient balance");
        totalStakeToken -= _amount;
        stakeBalance[msg.sender] -= _amount;
        emit Withdrawn(msg.sender, _amount);

        bool success = s_stakeToken.transfer(msg.sender, _amount);
        require(success, "Transfer Failed");
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint reward = rewardBalance[msg.sender];
        require(reward > 0, "No rewards to claim");
        rewardBalance[msg.sender] = 0;

        emit RewardClaim(msg.sender, reward);
        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Transfer Failed");
    }

}

// Stake Token 0x8D7F8bF406E84FC3C9693336af13A42118FEaDAc
// Reward Token 0xfA81C553935Dce326e725Cd77D2D1aadc5Eb1F5d
// Staking 0xB4059D8f58f369B2fdE1f37437E5b8E43D1A4B1F