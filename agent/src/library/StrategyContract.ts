import { ethers } from "ethers";

interface ContractConfig {
  address: string;
  abi: any[];
}

interface TokenPosition {
  tokenAddress: string;
  symbol: string;
  amount: string;
  totalBuyValue: string;
  averageBuyPrice: string;
  isActive: boolean;
  currentValue?: string;
  pnl?: string;
  pnlPercentage?: string;
}

interface UserDeposit {
  totalDeposited: string;
  depositTimestamp: string;
  isActive: boolean;
}

interface StrategyData {
  totalFundsDeposited: string;
  totalCurrentValue: string;
  totalGains: string;
  totalLosses: string;
  netPnL: string;
  availableCash: string;
  totalUsers: string;
  activePositions: string;
}

interface ContractState {
  strategyData: StrategyData;
  positions: TokenPosition[];
  userShare: string;
  withdrawalPlan?: any;
}

class StrategyContract {
  private provider: ethers.Provider;
  private signer: ethers.Signer;
  private contract: ethers.Contract;
  private contractWithSigner: ethers.Contract;
  private config: ContractConfig;

  constructor(
    config: ContractConfig,
    provider: ethers.Provider,
    signer: ethers.Signer
  ) {
    this.config = config;
    this.provider = provider;
    this.signer = signer;

    // Create contract instances
    this.contract = new ethers.Contract(config.address, config.abi, provider);
    this.contractWithSigner = new ethers.Contract(
      config.address,
      config.abi,
      signer
    );
  }

  async buyToken(
    tokenAddress: string,
    tokenSymbol: string,
    ethAmount: string
  ): Promise<string> {
    try {
      console.log(`🛒 Buying ${tokenSymbol} with ${ethAmount} ETH...`);

      const ethAmountWei = ethers.parseEther(ethAmount);

      const tx = await this.contractWithSigner.buyToken(
        tokenAddress,
        ethAmountWei,
        {
          gasLimit: 500000, // Adjust as needed
        }
      );

      console.log(`📋 Transaction submitted: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`✅ Buy completed! Gas used: ${receipt.gasUsed.toString()}`);

      return tx.hash;
    } catch (error) {
      console.error("❌ Buy failed:", error);
      throw error;
    }
  }

  async sellToken(tokenAddress: string): Promise<string> {
    try {
      console.log(`💰 Selling entire position for token: ${tokenAddress}`);

      // Get current position to sell entire amount
      const position = await this.getTokenPosition(tokenAddress);
      if (!position.isActive || position.amount === "0") {
        throw new Error("No active position to sell");
      }

      const tx = await this.contractWithSigner.sellToken(
        tokenAddress,
        position.amount,
        {
          gasLimit: 500000,
        }
      );

      console.log(`📋 Sell transaction submitted: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`✅ Sell completed! Gas used: ${receipt.gasUsed.toString()}`);

      return tx.hash;
    } catch (error) {
      console.error("❌ Sell failed:", error);
      throw error;
    }
  }

  // ============ CONTRACT STATE FUNCTIONS ============

  async getStrategyData(): Promise<StrategyData> {
    try {
      const data = await this.contract.getStrategyData();

      return {
        totalFundsDeposited: ethers.formatEther(data.totalFundsDeposited),
        totalCurrentValue: ethers.formatEther(data.totalCurrentValue),
        totalGains: ethers.formatEther(data.totalGains),
        totalLosses: ethers.formatEther(data.totalLosses),
        netPnL: ethers.formatEther(data.netPnL),
        availableCash: ethers.formatEther(data.availableCash),
        totalUsers: data.totalUsers.toString(),
        activePositions: data.activePositions.toString(),
      };
    } catch (error) {
      console.error("❌ Failed to get strategy data:", error);
      throw error;
    }
  }

  async getAllPositions(): Promise<TokenPosition[]> {
    try {
      const activeTokens = await this.contract.getActiveTokens();
      const positions: TokenPosition[] = [];

      for (const tokenAddress of activeTokens) {
        const position = await this.getTokenPosition(tokenAddress);
        if (position.isActive) {
          positions.push(position);
        }
      }

      return positions;
    } catch (error) {
      console.error("❌ Failed to get positions:", error);
      throw error;
    }
  }

  async getTokenPosition(tokenAddress: string): Promise<TokenPosition> {
    try {
      const position = await this.contract.getTokenPosition(tokenAddress);
      const currentValue = await this.contract.getCurrentTokenValue(
        tokenAddress
      );

      const currentValueEth = ethers.formatEther(currentValue);
      const totalBuyValueEth = ethers.formatEther(position.totalBuyValue);
      const pnl = parseFloat(currentValueEth) - parseFloat(totalBuyValueEth);
      const pnlPercentage =
        parseFloat(totalBuyValueEth) > 0
          ? (pnl / parseFloat(totalBuyValueEth)) * 100
          : 0;

      return {
        tokenAddress: position.tokenAddress,
        symbol: position.symbol,
        amount: ethers.formatEther(position.amount),
        totalBuyValue: totalBuyValueEth,
        averageBuyPrice: ethers.formatEther(position.averageBuyPrice),
        isActive: position.isActive,
        currentValue: currentValueEth,
        pnl: pnl.toFixed(6),
        pnlPercentage: pnlPercentage.toFixed(2),
      };
    } catch (error) {
      console.error(`❌ Failed to get position for ${tokenAddress}:`, error);
      throw error;
    }
  }

  async getCompleteContractState(userAddress?: string): Promise<ContractState> {
    try {
      console.log("📊 Fetching complete contract state...");

      const [strategyData, positions] = await Promise.all([
        this.getStrategyData(),
        this.getAllPositions(),
      ]);

      let userShare = "0";
      if (userAddress) {
        const shareWei = await this.contract.calculateUserShare(userAddress);
        userShare = ethers.formatEther(shareWei);
      }

      return {
        strategyData,
        positions,
        userShare,
      };
    } catch (error) {
      console.error("❌ Failed to get complete state:", error);
      throw error;
    }
  }

  async getPositionsForDecision(): Promise<TokenPosition[]> {
    try {
      const positions = await this.getAllPositions();

      // Sort by P&L percentage for decision making
      return positions.sort((a, b) => {
        const aPnl = parseFloat(a.pnlPercentage || "0");
        const bPnl = parseFloat(b.pnlPercentage || "0");
        return bPnl - aPnl; // Highest profit first
      });
    } catch (error) {
      console.error("❌ Failed to get positions for decision:", error);
      throw error;
    }
  }

  async shouldSellPosition(
    tokenAddress: string,
    stopLossPercent: number = -20,
    takeProfitPercent: number = 100
  ): Promise<{
    shouldSell: boolean;
    reason: string;
    currentPnL: number;
  }> {
    try {
      const position = await this.getTokenPosition(tokenAddress);
      const currentPnL = parseFloat(position.pnlPercentage || "0");

      if (currentPnL <= stopLossPercent) {
        return {
          shouldSell: true,
          reason: `Stop loss triggered: ${currentPnL.toFixed(
            2
          )}% <= ${stopLossPercent}%`,
          currentPnL,
        };
      }

      if (currentPnL >= takeProfitPercent) {
        return {
          shouldSell: true,
          reason: `Take profit triggered: ${currentPnL.toFixed(
            2
          )}% >= ${takeProfitPercent}%`,
          currentPnL,
        };
      }

      return {
        shouldSell: false,
        reason: `Hold position: ${currentPnL.toFixed(2)}% P&L`,
        currentPnL,
      };
    } catch (error) {
      console.error("❌ Failed to analyze position:", error);
      throw error;
    }
  }

  async updateTokenPrice(
    tokenAddress: string,
    priceInEth: string
  ): Promise<string> {
    try {
      const priceWei = ethers.parseEther(priceInEth);

      const tx = await this.contractWithSigner.setTokenPrice(
        tokenAddress,
        priceWei,
        {
          gasLimit: 100000,
        }
      );

      await tx.wait();
      console.log(`✅ Updated price for ${tokenAddress}: ${priceInEth} ETH`);

      return tx.hash;
    } catch (error) {
      console.error("❌ Failed to update price:", error);
      throw error;
    }
  }

  async getContractBalance(): Promise<string> {
    try {
      const balance = await this.provider.getBalance(this.config.address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("❌ Failed to get contract balance:", error);
      throw error;
    }
  }

  // ============ SUMMARY FUNCTIONS ============

  async printStrategySummary(userAddress?: string): Promise<void> {
    try {
      const state = await this.getCompleteContractState(userAddress);
      const contractBalance = await this.getContractBalance();

      console.log(`
🎯 MEME COIN STRATEGY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Financial Overview:
   📈 Total Deposited: ${state.strategyData.totalFundsDeposited} ETH
   🎯 Current Value: ${state.strategyData.totalCurrentValue} ETH
   💵 Available Cash: ${contractBalance} ETH
   
📊 Performance:
   ✅ Total Gains: ${state.strategyData.totalGains} ETH
   ❌ Total Losses: ${state.strategyData.totalLosses} ETH
   🎯 Net P&L: ${state.strategyData.netPnL} ETH
   
👥 Users & Positions:
   👤 Total Users: ${state.strategyData.totalUsers}
   🪙 Active Positions: ${state.strategyData.activePositions}
   ${userAddress ? `💎 Your Share: ${state.userShare} ETH` : ""}

🏆 Top Positions:`);

      // Show top 5 positions
      const topPositions = state.positions.slice(0, 5);
      topPositions.forEach((pos, i) => {
        const pnlIcon = parseFloat(pos.pnl || "0") >= 0 ? "📈" : "📉";
        console.log(
          `   ${i + 1}. ${pos.symbol}: ${pos.pnl} ETH (${
            pos.pnlPercentage
          }%) ${pnlIcon}`
        );
      });

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    } catch (error) {
      console.error("❌ Failed to print summary:", error);
    }
  }

  async analyzeAllPositions(): Promise<void> {
    try {
      console.log("🔍 POSITION ANALYSIS");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      const positions = await this.getPositionsForDecision();

      for (const position of positions) {
        const analysis = await this.shouldSellPosition(position.tokenAddress);
        const icon = analysis.shouldSell ? "🚨" : "✅";
        const pnlIcon = analysis.currentPnL >= 0 ? "📈" : "📉";

        console.log(`${icon} ${position.symbol}:`);
        console.log(`   💰 Value: ${position.currentValue} ETH`);
        console.log(
          `   ${pnlIcon} P&L: ${position.pnl} ETH (${position.pnlPercentage}%)`
        );
        console.log(`   💡 Decision: ${analysis.reason}`);
        console.log("");
      }
    } catch (error) {
      console.error("❌ Failed to analyze positions:", error);
    }
  }
}

export default StrategyContract;
