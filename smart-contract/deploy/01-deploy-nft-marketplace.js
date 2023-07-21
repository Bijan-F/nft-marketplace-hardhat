const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async function({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    args = [];

    const nftMarketplace = await deploy("NftMarketplace", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations,
    });

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
        log("Verifying...");
        await verify(nftMarketplace.address, args);
    }
    log("--------------------------------------");

};

module.exports.tags = ["all", "nftmp"];