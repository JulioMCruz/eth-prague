import { ethers } from "ethers";

class ServerWallet {
  wallet: ethers.Wallet;
  provider: ethers.AlchemyProvider;
  constructor() {
    this.provider = new ethers.AlchemyProvider(
      "sepolia",
      process.env.ALCHEMY_API_KEY
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY || "",
      this.provider
    );
  }
  async getWallet(): Promise<ethers.Wallet> {
    return this.wallet;
  }
}

export default ServerWallet;
