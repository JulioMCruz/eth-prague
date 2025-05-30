import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import ServerWallet from "./Wallet";
import StrategyContract from "./StrategyContract";

interface TradingDecision {
  action: "buy" | "sell" | "hold";
  tokenAddress?: string;
  tokenSymbol?: string;
  amount?: string;
  reasoning?: string;
}

interface MemeToken {
  address: string;
  symbol: string;
  name: string;
  price: string;
  marketCap: string;
  volume24h: string;
  priceChange24h: string;
  trending: boolean;
}

class TradingAgent {
  walletProvider: ServerWallet;
  strategyContract: StrategyContract;

  constructor(strategyContract: StrategyContract) {
    this.walletProvider = new ServerWallet();
    this.strategyContract = strategyContract;
  }

  async makeDecision(): Promise<TradingDecision> {
    console.log("🤖 AI Trading Agent making decision...");
    console.log(`💼 Wallet: ${this.walletProvider.wallet.address}`);

    try {
      const strategyState = await this.getStrategyState();

      const trendingCoins = await this.getTrendingMemeCoins();

      const decision = await this.getAIDecision(strategyState, trendingCoins);

      console.log(`🎯 AI Decision:`, decision);
      return decision;
    } catch (error) {
      console.error("❌ Error making trading decision:", error);
      return { action: "hold", reasoning: "Error occurred, holding position" };
    }
  }

  async getStrategyState(): Promise<any> {
    console.log("📊 Getting current strategy state...");

    return {
      strategyData: {
        totalFundsDeposited: "10.5", // ETH
        totalCurrentValue: "12.8", // ETH
        totalGains: "3.2", // ETH
        totalLosses: "1.9", // ETH
        netPnL: "1.3", // ETH (+21.9%)
        availableCash: "1.1", // ETH
        totalUsers: "5",
        activePositions: "3",
      },
      positionsAnalysis: [
        {
          tokenAddress: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
          symbol: "PEPE",
          currentValue: "4.5", // ETH
          pnl: "1.2", // +1.2 ETH profit
          pnlPercentage: "+36.4", // +36.4% gain
        },
        // ... more positions
      ],
      userShare: "2.56",
    };

    try {
      const state = await this.strategyContract.getCompleteContractState(
        this.walletProvider.wallet.address
      );

      const positionsForDecision =
        await this.strategyContract.getPositionsForDecision();

      return {
        ...state,
        positionsAnalysis: positionsForDecision,
        contractBalance: await this.strategyContract.getContractBalance(),
      };
    } catch (error) {
      console.error("❌ Failed to get strategy state:", error);
      throw error;
    }
  }

  async getTrendingMemeCoins(): Promise<MemeToken[]> {
    console.log("🔥 Getting trending meme coins...");

    // Hardcoded top meme coins for now - in production, use real API
    const memeCoins: MemeToken[] = [
      {
        address: "0x1234567890123456789012345678901234567890",
        symbol: "PEPE",
        name: "Pepe",
        price: "0.000001",
        marketCap: "500000000",
        volume24h: "50000000",
        priceChange24h: "+15.5",
        trending: true,
      },
      {
        address: "0x2345678901234567890123456789012345678901",
        symbol: "DOGE",
        name: "Dogecoin",
        price: "0.08",
        marketCap: "11000000000",
        volume24h: "800000000",
        priceChange24h: "-2.3",
        trending: false,
      },
      {
        address: "0x3456789012345678901234567890123456789012",
        symbol: "SHIB",
        name: "Shiba Inu",
        price: "0.000008",
        marketCap: "4700000000",
        volume24h: "200000000",
        priceChange24h: "+8.7",
        trending: true,
      },
      {
        address: "0x4567890123456789012345678901234567890123",
        symbol: "FLOKI",
        name: "Floki Inu",
        price: "0.00015",
        marketCap: "1400000000",
        volume24h: "45000000",
        priceChange24h: "+22.1",
        trending: true,
      },
      {
        address: "0x5678901234567890123456789012345678901234",
        symbol: "BONK",
        name: "Bonk",
        price: "0.00002",
        marketCap: "1200000000",
        volume24h: "30000000",
        priceChange24h: "+5.4",
        trending: false,
      },
    ];

    return memeCoins;
  }

  async getAIDecision(
    strategyState: any,
    trendingCoins: MemeToken[]
  ): Promise<TradingDecision> {
    console.log("🧠 Getting AI trading decision...");

    const prompt = this.buildTradingPrompt(strategyState, trendingCoins);

    try {
      const results = streamText({
        model: groq("llama-3.3-70b-versatile"),
        prompt,
        system: `You are an expert meme coin trading AI. You analyze market data and make trading decisions.
        
        CRITICAL: You MUST respond ONLY with a valid JSON object in this exact format:
        {
          "action": "buy" | "sell" | "hold",
          "tokenAddress": "0x...", // only if action is buy or sell
          "tokenSymbol": "SYMBOL", // only if action is buy or sell  
          "amount": "0.5", // only if action is buy (ETH amount)
          "reasoning": "Brief explanation"
        }
        
        Rules:
        - If action is "buy": include tokenAddress, tokenSymbol, and amount
        - If action is "sell": include tokenAddress and tokenSymbol  
        - If action is "hold": only include reasoning
        - Amount should be in ETH (e.g., "0.5" for 0.5 ETH)
        - Always include reasoning
        - Respond with ONLY the JSON, no other text`,
        maxTokens: 200,
        temperature: 0.3,
      });

      let fullResponse = "";
      for await (const chunk of results.textStream) {
        fullResponse += chunk;
      }

      // Parse AI response
      const decision = this.parseAIResponse(fullResponse);
      return decision;
    } catch (error) {
      console.error("❌ AI decision failed:", error);
      return {
        action: "hold",
        reasoning: "AI error, holding position for safety",
      };
    }
  }

  buildTradingPrompt(strategyState: any, trendingCoins: MemeToken[]): string {
    const positions = strategyState.positionsAnalysis || [];
    const strategyData = strategyState.strategyData;

    return `
MEME COIN TRADING ANALYSIS

CURRENT PORTFOLIO:
- Total Deposited: ${strategyData?.totalFundsDeposited} ETH
- Current Value: ${strategyData?.totalCurrentValue} ETH
- Net P&L: ${strategyData?.netPnL} ETH
- Available Cash: ${strategyState.contractBalance} ETH
- Active Positions: ${strategyData.activePositions}

CURRENT POSITIONS:
${positions
  .map(
    (pos: {
      symbol: any;
      currentValue: any;
      pnl: any;
      pnlPercentage: any;
      tokenAddress: any;
    }) => `
- ${pos.symbol}: ${pos.currentValue} ETH (P&L: ${pos.pnl} ETH, ${pos.pnlPercentage}%)
  Address: ${pos.tokenAddress}
`
  )
  .join("")}

TRENDING MEME COINS:
${trendingCoins
  .map(
    (coin) => `
- ${coin.symbol} (${coin.name}): $${coin.price}
  24h Change: ${coin.priceChange24h}%
  Market Cap: $${parseInt(coin.marketCap).toLocaleString()}
  Volume: $${parseInt(coin.volume24h).toLocaleString()}
  Trending: ${coin.trending ? "YES" : "NO"}
  Address: ${coin.address}
`
  )
  .join("")}

TRADING RULES:
1. Consider selling positions with >20% loss (stop loss)
2. Consider selling positions with >50% gain (take profit)  
3. Look for trending coins with high volume
4. Don't use more than 30% of available cash per trade
5. Maximum 5 positions at once

Make a trading decision: BUY a trending coin, SELL an existing position, or HOLD.
`;
  }

  parseAIResponse(response: string): TradingDecision {
    try {
      // Clean response and extract JSON
      const cleanResponse = response.trim().replace(/```json|```/g, "");
      const decision = JSON.parse(cleanResponse);

      // Validate the decision format
      if (
        !decision.action ||
        !["buy", "sell", "hold"].includes(decision.action)
      ) {
        throw new Error("Invalid action");
      }

      if (decision.action === "buy") {
        if (
          !decision.tokenAddress ||
          !decision.tokenSymbol ||
          !decision.amount
        ) {
          throw new Error("Buy action missing required fields");
        }
      }

      if (decision.action === "sell") {
        if (!decision.tokenAddress || !decision.tokenSymbol) {
          throw new Error("Sell action missing required fields");
        }
      }

      return decision;
    } catch (error) {
      console.error("❌ Failed to parse AI response:", error);
      console.log("Raw response:", response);

      return {
        action: "hold",
        reasoning: "Failed to parse AI decision, holding for safety",
      };
    }
  }

  async executeTradingDecision(
    decision: TradingDecision
  ): Promise<string | null> {
    console.log(`🚀 Executing trading decision:`, decision);

    try {
      switch (decision.action) {
        case "buy":
          if (
            !decision.tokenAddress ||
            !decision.tokenSymbol ||
            !decision.amount
          ) {
            throw new Error("Invalid buy decision format");
          }

          console.log(
            `💰 Buying ${decision.tokenSymbol} with ${decision.amount} ETH`
          );
          const buyTx = await this.strategyContract.buyToken(
            decision.tokenAddress,
            decision.tokenSymbol,
            decision.amount
          );
          console.log(`✅ Buy executed: ${buyTx}`);
          return buyTx;

        case "sell":
          if (!decision.tokenAddress || !decision.tokenSymbol) {
            throw new Error("Invalid sell decision format");
          }

          console.log(`💸 Selling entire ${decision.tokenSymbol} position`);
          const sellTx = await this.strategyContract.sellToken(
            decision.tokenAddress
          );
          console.log(`✅ Sell executed: ${sellTx}`);
          return sellTx;

        case "hold":
          console.log(`⏸️  Holding position: ${decision.reasoning}`);
          return null;

        default:
          throw new Error(`Unknown action: ${decision.action}`);
      }
    } catch (error) {
      console.error(`❌ Failed to execute ${decision.action}:`, error);
      throw error;
    }
  }

  async runFullTradingCycle(): Promise<void> {
    console.log("\n🎯 STARTING AI TRADING CYCLE");
    console.log("═".repeat(50));

    try {
      // 1. Make AI decision
      const decision = await this.makeDecision();

      // 2. Execute decision
      const txHash = await this.executeTradingDecision(decision);

      // 3. Print summary
      await this.strategyContract.printStrategySummary(
        this.walletProvider.wallet.address
      );

      console.log("\n✅ Trading cycle completed successfully!");
      if (txHash) {
        console.log(`📋 Transaction: ${txHash}`);
      }
    } catch (error) {
      console.error("❌ Trading cycle failed:", error);
    }
  }
}

export default TradingAgent;

// ============ USAGE EXAMPLE ============
/*
import { ethers } from 'ethers';

const config = {
  address: "0x1234...",
  abi: [...]
};

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const strategyContract = new StrategyContract(config, provider, signer);

const agent = new TradingAgent(strategyContract);

// Run single decision
const decision = await agent.makeDecision();
console.log(decision);

// Execute the decision
await agent.executeTradingDecision(decision);

// Run complete cycle
await agent.runFullTradingCycle();
*/
