const { network, ethers } = require("hardhat")

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// const { ethers } = require("ethers")

// const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("1")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = []

    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: network.config.blockConfirmations || 1,
    })
    log("log log log log log")
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying.......")
        await verify(basicNft.address, args)
    }
    log("----------------last-----------------")
}

module.exports.tags = ["all", "basicNft"]
