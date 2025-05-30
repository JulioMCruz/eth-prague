import ServerWallet from "./Wallet";

class TradingAgent {
  wallet: ServerWallet;

  constructor() {
    this.wallet = new ServerWallet();
  }

  async makeDecision() {
    // TODO
    // 1. Add a model invocation
    // 2. to maodel give a tool to get all the agents  (hardcode to 3) + get all the state in blochain
    // 3. give the strategy data
    // 4. ask it to give the token address and the amount to sell or buy
    // 5. it cna either sell or buy or hold
  }

  // const decision = "hold";

  //   console.log(`AI decision: ${decision}`);

  //   const userQuery = await terminal.question(`Ask the houdini:`);

  //   const results = streamText({
  //     model: groq("llama-3.3-70b-versatile"),
  //     prompt: `You are a helpful AI assistant. The user has asked: "${userQuery}". Provide a concise and informative response.`,
  //     system: `You are a helpful AI assistant that provides information based on user queries.`,
  //     maxTokens: 250,
  //     temperature: 0.7,
  //   });
  //   let fullResponse = "";
  //   for await (const chunk of results.textStream) {
  //     fullResponse += chunk;
  //     process.stdout.write(chunk);
  //   }
  //   process.stdout.write("\n\n");
}

export default TradingAgent;
