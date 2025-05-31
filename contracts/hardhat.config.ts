import 'dotenv/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-foundry';
import { HardhatUserConfig } from 'hardhat/config';
import process from 'process';

const account = process.env.PRIVATE_KEY;

if (!account) {
  throw new Error('Not private KEY');
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.23',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000
          }
        }
      }
    ]
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './build/cache',
    artifacts: './build/artifacts'
  },
  gasReporter: {
    enabled: true,
    outputFile: './test/gas-report.txt',
    noColors: true
  },
  networks: {
    localhost: {
      chainId: 31337,
      url: 'http://localhost:8545'
    },
    sepolia: {
      url: 'https://ethereum-sepolia-rpc.publicnode.com',
      chainId: 11155111,
      accounts: [account]
    },
    baseSepolia: {
      url: 'https://base-sepolia.g.alchemy.com/v2/demo',
      chainId: 84532,
      accounts: [account]
    }
  }
};

export default config;
