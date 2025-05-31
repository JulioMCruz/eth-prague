// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IStrategy} from "../interfaces/IStrategy.sol";
import { IStargate } from "@stargatefinance/stg-evm-v2/src/interfaces/IStargate.sol";
import { MessagingFee, SendParam } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/interfaces/IOFT.sol";
import "../crosschain/adapters/startgate/StargateIntegrationWithCompose.sol";

contract Strategy is IStrategy {
    
    // Strategy state
    address public stargateRouter;
    address public owner;
    address public composer; // destination chain composer address
    uint32 public dstChainId; // destination chain ID
    
    StargateIntegrationWithCompose public stargateIntegration;
    
    event CrosschainBuyExecuted(address indexed token, uint256 amount);
    event CrosschainSellExecuted(address indexed token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // ============ Constructor ============

    /**
     * @dev Constructor
     * @param _stargateRouter The address of the Stargate router
     * @param _owner The address of the vault
     */
    constructor(address _stargateRouter, address _owner) {
        owner = _owner;
        stargateRouter = _stargateRouter;
        stargateIntegration = new StargateIntegrationWithCompose();
    }
    
    /**
     * @dev Execute crosschain buy using Stargate
     * @param token The token address to buy on the destination chain
     * @param amount The amount to buy
     */
    function executeBuy(address token, uint256 amount) external payable override returns (uint256) {
        require(amount > 0, "Amount must be greater than 0");
        require(composer != address(0), "Composer not set");
        require(dstChainId != 0, "Destination chain not set");
        
        // Encode the buy instruction for the destination chain
        bytes memory composeMsg = abi.encode("",token, amount, msg.sender);
        
        // Call prepareTakeTaxi from the imported contract
        (uint256 valueToSend, SendParam memory sendParam, MessagingFee memory messagingFee) = 
            stargateIntegration.prepareTakeTaxiAndAMMSwap(
                stargateRouter,
                dstChainId,
                amount,
                composer,
                composeMsg
            );
        
        require(msg.value >= valueToSend, "Insufficient value for crosschain transfer");
        
        // Execute the crosschain transfer
        IStargate stargate = IStargate(stargateRouter);
        stargate.sendToken{value: valueToSend}(sendParam, messagingFee, msg.sender);
        
        emit CrosschainBuyExecuted(token, amount);
        
        return amount;
    }

    /**
     * @dev Execute crosschain sell using Stargate
     * @param token The token address to sell on the destination chain
     * @param amount The amount to sell
     */
    function executeSell(address token, uint256 amount) external payable override returns (uint256) {
        require(amount > 0, "Amount must be greater than 0");
        require(composer != address(0), "Composer not set");
        require(dstChainId != 0, "Destination chain not set");
        
        // Encode the sell instruction for the destination chain
        bytes memory composeMsg = abi.encode("", token, amount, msg.sender);
        
        // Call prepareTakeTaxi from the imported contract
        (uint256 valueToSend, SendParam memory sendParam, MessagingFee memory messagingFee) = 
            stargateIntegration.prepareTakeTaxiAndAMMSwap(
                stargateRouter,
                dstChainId,
                amount,
                composer,
                composeMsg
            );
        
        require(msg.value >= valueToSend, "Insufficient value for crosschain transfer");
        
        // Execute the crosschain transfer
        IStargate stargate = IStargate(stargateRouter);
        stargate.sendToken{value: valueToSend}(sendParam, messagingFee, msg.sender);
        
        emit CrosschainSellExecuted(token, amount);
        
        return amount;
    }

    // ============ Configuration Functions ============
    
    /**
     * @dev Set the destination chain composer address
     * @param _composer The composer contract address on destination chain
     */
    function setComposer(address _composer) external onlyOwner {
        composer = _composer;
    }
    
    /**
     * @dev Set the destination chain ID
     * @param _dstChainId The destination chain ID
     */
    function setDestinationChain(uint32 _dstChainId) external onlyOwner {
        dstChainId = _dstChainId;
    }
    
    /**
     * @dev Update Stargate router address
     * @param _stargateRouter The new Stargate router address
     */
    function setStargateRouter(address _stargateRouter) external onlyOwner {
        stargateRouter = _stargateRouter;
    }

    /**
     * @dev Quote the cost for crosschain transfer
     * @param token The token address
     * @param amount The amount
     * @param action The action ("BUY" or "SELL")
     */
    function quoteCrosschainTransfer(
        address token,
        uint256 amount,
        string memory action
    ) external view returns (uint256 valueToSend, MessagingFee memory messagingFee) {
        require(composer != address(0), "Composer not set");
        require(dstChainId != 0, "Destination chain not set");
        
        bytes memory composeMsg = abi.encode(action, token, amount, msg.sender);
        
        (valueToSend, , messagingFee) = stargateIntegration.prepareTakeTaxiAndAMMSwap(
            stargateRouter,
            dstChainId,
            amount,
            composer,
            composeMsg
        );
    }

    // ============ Emergency Functions ============
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Allow contract to receive ETH
    receive() external payable {}
    fallback() external payable {}
}
