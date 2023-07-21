const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async function({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [];

    const basicNft = await deploy("BasicNft", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations,
    });

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
        log("Verifying...");
        await verify(basicNft.address, args);
    }
    log("--------------------------------------");
};

module.exports.tags = ["all", "basicnft"];