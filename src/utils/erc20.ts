import { ethers } from "ethers";
import ERC20 from "../config/abis/ERC20.json";
import { BigNumber } from "ethers";

export const getCurrentAddress = async (
  provider: ethers.providers.Web3Provider
) => {
  const signer = provider.getSigner();
  return await signer.getAddress();
};

export const getCurrentBalance = async (
  provider: ethers.providers.Web3Provider
) => {
  const address = await getCurrentAddress(provider);
  const balance = await provider.getBalance(address);
  return BigNumber.from(balance);
};

export const getContract = (
  provider: ethers.providers.Web3Provider,
  address: string
) => {
  return new ethers.Contract(address, ERC20, provider.getSigner());
};

export const getAllowance = async (
  contract: ethers.Contract,
  owner: string,
  spender: string
): Promise<any> => {
  try {
    const allowance: string = await contract.allowance(owner, spender);
    return allowance;
  } catch (e) {
    return null;
  }
};

export const getBalance = async (
  contract: ethers.Contract,
  userAddress: string
): Promise<BigNumber> => {
  try {
    const balance = await contract.balanceOf(userAddress);
    return BigNumber.from(balance);
  } catch (e) {
    return BigNumber.from(0);
  }
};

export const approve = async (
  contract: ethers.Contract,
  spender: string,
  owner: string
) => {
  return contract.approve(spender, ethers.constants.MaxUint256);
};
