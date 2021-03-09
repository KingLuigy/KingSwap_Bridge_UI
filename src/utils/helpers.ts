import { BigNumber, utils, ethers } from "ethers";
import memoize from "fast-memoize";
import {
  networkNames,
  networkLabels,
  chainUrls,
  BRIDGED_TOKEN_ADDRESS,
  BRIDGED_OLD_TOKEN_ADDRESS,
  TokensData,
} from "../config/constant";

export const getNetworkName = (chainId: number) =>
  networkNames[chainId] || "Unknown";
export const getNetworkLabel = (chainId: number) =>
  networkLabels[chainId] || "Unknown";
export const getRPCUrl = (chainId: number) =>
  (chainUrls[chainId] || chainUrls[100]).rpc;

const memoized = memoize(
  (url: string) => new ethers.providers.StaticJsonRpcProvider(url)
);

export const getEthersProvider = (chainId: number) => {
  const localRPCUrl = window.localStorage.getItem(
    chainId === 100 ? "xdai-rpc-url" : "mainnet-rpc-url"
  );
  const rpcURL = localRPCUrl || getRPCUrl(chainId);
  return memoized(rpcURL);
};

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
export const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-6);
};

export const getBridgeNetwork = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 100;
    case 100:
    default:
      return 1;
  }
};

export const getBridgeNetworkAddress = (selectedTokenData: TokensData) => {
  if (selectedTokenData) {
    switch (selectedTokenData.index) {
      // mainnet $king to $xking
      //  xdai x$king to $king
      case 0:
      case 2:
        return BRIDGED_TOKEN_ADDRESS[selectedTokenData.chainId];
      // mainnet old $king to $xoking
      // xdai $xoking to old $king
      case 1:
      case 3:
        return BRIDGED_OLD_TOKEN_ADDRESS[selectedTokenData.chainId];
      default:
        return null;
    }
  }
  return null;
};

export const formatValue = (num: BigNumber, dec: number) => {
  const str = utils.formatUnits(num, dec);
  if (str.length > 50) {
    const expStr = Number(str).toExponential().replace(/e\+?/, " x 10^");
    const split = expStr.split(" x 10^");
    const first = Number(split[0]).toLocaleString("en", {
      maximumFractionDigits: 4,
    });
    return `${first} x 10^${split[1]}`;
  }
  return Number(str).toLocaleString("en", { maximumFractionDigits: 4 });
};
