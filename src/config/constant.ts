interface BridgeAddress {
  [index: number]: string;
}

export const BRIDGED_TOKEN_ADDRESS: BridgeAddress = {
  1: "0xD1843507c588e5D0e11413b29779cC97E14e0242", // mainnet bridge for new King to xKing
  100: "0x4c9c971fbEFc93E0900988383DC050632dEeC71E", //xdai bridge for xKing to new King
};
export const BRIDGED_OLD_TOKEN_ADDRESS: BridgeAddress = {
  1: "0x24DD13C6b54E1538061FE8cda14E0C7F27BE9363", // mainnet bridge for old King to xoKing
  100: "0x4EdC94bC630Ee57A7D3FFeDaa03498430B7353ED", //xdai Bridge for xoKing to Old King
};

interface NetworkNamePros {
  [index: number]: string;
}
export const networkNames: NetworkNamePros = {
  1: "ETH Mainnet",
  100: "xDai Chain",
};
interface NetworkLabelPros {
  [index: number]: string;
}
export const networkLabels: NetworkLabelPros = {
  1: "Mainnet",
  100: "xDai",
};

interface ChainUrlsPros {
  [index: number]: {
    rpc: string;
    explorer: string;
    monitor: string;
    chainId: number;
    name: string;
  };
}
export const chainUrls: ChainUrlsPros = {
  100: {
    rpc: "https://rpc.xdaichain.com",
    explorer: "https://blockscout.com/poa/xdai",
    monitor: "https://alm-xdai.herokuapp.com",
    chainId: 100,
    name: networkNames[100],
  },
  1: {
    rpc: `https://mainnet.infura.io/v3/7fd31fc217914b188e05e97a63849bf4`,
    explorer: "https://blockscout.com/eth/mainnet",
    monitor: "https://alm-xdai.herokuapp.com",
    chainId: 1,
    name: networkNames[1],
  },
};

export interface TokensData {
  index: number;
  address: string;
  symbol: string;
  targetIndex: number;
  chainId: number;
  decimal: number;
}
export const tokensData: TokensData[] = [
  {
    index: 0,
    symbol: "$KING",
    address: "0xd2057d71fe3f5b0dc1e3e7722940e1908fc72078",
    targetIndex: 2,
    chainId: 1,
    decimal: 18,
  },
  {
    index: 1,
    symbol: "Old $KING",
    address: "0x5a731151d6510Eb475cc7a0072200cFfC9a3bFe5",
    targetIndex: 3,
    chainId: 1,
    decimal: 18,
  },
  {
    index: 2,
    symbol: "x$KING",
    address: "0xcCd05d20Cc7f1994425Dd21A8939A222D433cD1C",
    targetIndex: 0,
    chainId: 100,
    decimal: 18,
  },
  {
    index: 3,
    symbol: "xo$KING",
    address: "0x27dc94013361e787d36134CA415688DD518AdE1c",
    targetIndex: 1,
    chainId: 100,
    decimal: 18,
  },
];

export const NetworkContextName = "NETWORK";
export const HOME_NETWORK = 100;
