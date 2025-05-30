import { ethers } from "ethers";
import cron from "node-cron";
import dotenv from "dotenv";
import * as readline from "node:readline/promises";
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import TradingAgent from "./library/TradingAgent";
import StrategyContract from "./library/StrategyContract";
import ServerWallet from "./library/Wallet";

dotenv.config();

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//TODO

// 1. cron job to call the ai funcitons on period
// 2. AI looks at thje coins data and the portfolio to decide wheter to buy sell / hold
// 3. ai calls the contract to buy / sell /hold
async function main() {
  console.log("Starting AI Agent...");
  const wallet = new ServerWallet();
  const strategyContract = new StrategyContract(
    { address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", abi: [] },
    wallet.provider,
    wallet.wallet
  );
  const tradingAgent = new TradingAgent(strategyContract);

  cron.schedule("*/5 * * * * *", async () => {
    console.log("Running AI decision-making process...");
    tradingAgent.makeDecision();
  });
}

main().catch((error) => {
  console.error("Error in AI Agent:", error);
  process.exit(1);
});
