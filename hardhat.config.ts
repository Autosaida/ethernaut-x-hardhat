import { HardhatUserConfig } from "hardhat/config";
import { HardhatNetworkUserConfig, NetworkUserConfig, HardhatNetworkAccountUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";

import { config as dotenvConfig } from "dotenv";
import { resolve } from "path"
dotenvConfig({ path: resolve(__dirname, "./.env") });  // Loads .env file contents into process.env.

const chainIds = {
  sepolia: 11155111,
};

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";


function createNetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    accounts: [PRIVATE_KEY],
    chainId: chainIds[network],
    url: url,
  };
}

function createLocalnetConfig(network: keyof typeof chainIds): HardhatNetworkUserConfig {
  const accounts: HardhatNetworkAccountUserConfig[] = [{
    privateKey: PRIVATE_KEY,
    balance: "1000000000000000000",
  },
  ];
  return {
    accounts: accounts,
    forking: {
      url: "https://" + network + ".infura.io/v3/" + INFURA_API_KEY,
    }
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: createLocalnetConfig("sepolia"),
    sepolia: createNetConfig("sepolia"),
  },
  solidity: {
    compilers: [
      { version: "0.5.17"},
      { version: "0.6.12" },
      { version: "0.8.17" },
    ],
  },
  etherscan: {
    //apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    // enabled: process.env.REPORT_GAS ? true : false,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;