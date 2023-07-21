require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("dotenv").config();

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
const COINMARKETCAP_API = process.env.COINMARKETCAP_API;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
      // forking: {
      //   url: MAINNET_RPC_URL,
      // },
    },
    rinkeby: {
      chainId: 4,
      blockConfirmations: 6,
      url: RINKEBY_RPC_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
    }
  },
  solidity: {
    compilers: [
      {version: "0.8.9"},
      {version: "0.6.6"},
      {version: "0.4.19"},
      {version: "0.6.12"}
    ]
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    users: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
  mocha: {
    timeout: 600000, // 600 secends max
  },
};
