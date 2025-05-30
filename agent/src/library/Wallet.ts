import { ethers } from "ethers";

class ServerWallet {
  wallet: ethers.Wallet;
  provider: ethers.AlchemyProvider;
  constructor() {
    this.provider = new ethers.AlchemyProvider(
      "goerli",
      process.env.ALCHEMY_API_KEY
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY || "",
      this.provider
    );
  }
  //       const ContractInstance = new ethers
  //           .ContractFactory(ABI, bytecode, Wallet);
  //       const contractInstance =
  //           await ContractInstance.deploy();
  //       await contractInstance.deployed();
  //       console.log("Deployed contract address - ",
  //           contractInstance.address);
  //       const setNameInitialResponse =
  //           await contractInstance.setName("GeeksforGeeks");
  //       await setNameInitialResponse.wait();
  //       let contractReturnedString =
  //           await contractInstance.getName();
  //       console.log("Output value of getName() function "
  //           + "of solidity Smart contract - ",
  //           contractReturnedString);
}

export default ServerWallet;
