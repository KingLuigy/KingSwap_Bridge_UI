import { Contract } from "ethers";
import { ethers } from "ethers";
import { getBridgeNetworkAddress } from "./helpers";
export const relayTokens = async (
  ethersProvider: ethers.providers.Web3Provider,
  token: any,
  receiver: any,
  amount: number
) => {
  const signer = ethersProvider.getSigner();
  const bridgeAddress = getBridgeNetworkAddress(token);
  const abi = ["function relayTokens(address, uint256)"];
  if (bridgeAddress) {
    const mediatorContract = new Contract(bridgeAddress, abi, signer);
    return mediatorContract.relayTokens(receiver, amount);
  } else {
    return null;
  }
};

export const transferTokens = async (
  ethersProvider: ethers.providers.Web3Provider,
  token: any,
  receiver: any,
  amount: any
) => {
  return relayTokens(ethersProvider, token, receiver, amount);
};
