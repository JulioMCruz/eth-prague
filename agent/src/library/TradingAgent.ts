import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import ServerWallet from "./Wallet";
import StrategyContract from "./StrategyContract";
import { tokens } from "../constant/tokens";

interface TradingDecision {
  action: "buy" | "sell" | "hold";
  tokenAddress?: string;
  tokenSymbol?: string;
  amount?: string;
  reasoning?: string;
}

interface MemeToken {
  id: number;
  name: string;
  symbol: string;
  address: string;
  slug: string;
  cmcRank: number;
  marketPairCount: number;
  circulatingSupply: number;
  selfReportedCirculatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  ath: number;
  atl: number;
  high24h: number;
  low24h: number;
  isActive: number;
  lastUpdated: string;
  dateAdded: string;
  quotes: Array<{
    name: string;
    price: number;
    volume24h: number;
    volume7d: number;
    volume30d: number;
    marketCap: number;
    selfReportedMarketCap: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    lastUpdated: string;
    percentChange30d: number;
    percentChange60d: number;
    percentChange90d: number;
    fullyDilluttedMarketCap: number;
    marketCapByTotalSupply: number;
    dominance: number;
    turnover: number;
    ytdPriceChangePercentage: number;
    percentChange1y: number;
  }>;
  isAudited: boolean;
  auditInfoList: Array<any>;
  badges: Array<any>;
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
        availableCash: "0.1", // ETH
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

  async getTrendingMemeCoins(): Promise<any> {
    console.log("🔥 Getting trending meme coins...");

    const memeCoins = await fetch(
      "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=100&sortBy=rank&sortType=desc&cryptoType=all&tagType=all&audited=false&tagSlugs=memes&platformId=199&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap"
    );

    if (!memeCoins.ok) {
      console.error("❌ Failed to fetch trending meme coins");
      return tokens;
    }

    const data = await memeCoins.json();
    const trendingCoins: MemeToken[] = data.data.cryptoCurrencyList;

    return tokens;
  }

  async getAIDecision(
    strategyState: any,
    trendingCoins: MemeToken[]
  ): Promise<TradingDecision> {
    console.log("🧠 Getting AI trading decision...");

    const prompt = this.buildTradingPrompt(strategyState, trendingCoins);

    try {
      const results = streamText({
        model: groq("llama-3.1-8b-instant"),
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
- ${coin.symbol} (${coin.name}): $${coin.quotes[0].price} USD
  Market Cap: $${coin.quotes[0].marketCap} USD
  Volume (24h): $${coin.quotes[0].volume24h} USD
  Circulating Supply: ${coin.circulatingSupply} ${coin.symbol}
  ATH: $${coin.ath} USD, ATL: $${coin.atl} USD
  Last Updated: ${coin.lastUpdated}
  Badges: ${coin.badges.join(", ") || "None"}
  Audit Info: ${coin.isAudited ? "Audited" : "Not Audited"}
  Trading Pairs: ${coin.marketPairCount}
  Trading Volume (7d): $${coin.quotes[0].volume7d} USD
  Trading Volume (30d): $${coin.quotes[0].volume30d} USD
  Address: ${coin.address}
`
  )
  .join("")}

TRADING RULES:
1. Consider selling positions with >20% loss (stop loss)
2. Consider selling positions with >50% gain (take profit)  
3. Look for trending coins with high volume
4. Don't use more than 30% of available cash per trade
5. Maximum 1 positions at once

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
