import {
  networkNames,
  networkLabels,
  chainUrls,
  BRIDGED_TOKEN_ADDRESS,
  BRIDGED_OLD_TOKEN_ADDRESS,
  TokensData,
  tokensData,
} from "../config/constant";

export const getNetworkName = (chainId: number) =>
  networkNames[chainId] || "Unknown";
export const getNetworkLabel = (chainId: number) =>
  networkLabels[chainId] || "Unknown";
export const getRPCUrl = (chainId: number) =>
  (chainUrls[chainId] || chainUrls[100]).rpc;
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
  // switch (selectedTokenData.index) {
  //   // mainnet $king to $xking
  //   //  xdai x$king to $king
  //   case 0:
  //   case 2:
      return BRIDGED_TOKEN_ADDRESS[1];
    // mainnet old $king to $xoking
    // xdai $xoking to old $king
  //   case 1:
  //   case 3:
  //     return BRIDGED_OLD_TOKEN_ADDRESS[selectedTokenData.chainId];
  //   default:
  //     return null;
  // }
};
