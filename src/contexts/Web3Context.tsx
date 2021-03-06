import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { getRPCUrl } from "../utils/helpers";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal, { getProviderInfo, IProviderInfo } from "web3modal";

export interface Web3StateProps {
  providerChainId?: number;
  ethersProvider: ethers.providers.Web3Provider | null;
}

export interface Web3ContextProps extends Web3StateProps {
  connectWeb3: any;
  loading: boolean;
  disconnect: any;
  account: any;
  providerInfo: IProviderInfo;
}
export const Web3Context = React.createContext<Partial<Web3ContextProps>>({});

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: getRPCUrl(1),
        100: getRPCUrl(100),
      },
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export const Web3Provider = ({ children }: any) => {
  const [web3State, setWeb3State] = useState<Web3StateProps>({
    providerChainId: undefined,
    ethersProvider: null,
  });
  const { providerChainId, ethersProvider } = web3State;
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [providerInfo, setProviderInfo] = useState<IProviderInfo | undefined>(
    undefined
  );

  const setWeb3Provider = useCallback(async (prov, updateAccount = false) => {
    try {
      if (prov) {
        const web3Provider = new Web3(prov);
        const provider = new ethers.providers.Web3Provider(
          web3Provider.currentProvider as any
        );

        const providerNetwork = await provider.getNetwork();
        setWeb3State({
          ethersProvider: provider,
          providerChainId: providerNetwork.chainId,
        });
        if (updateAccount) {
          const signer = provider.getSigner();
          const gotAccount = await signer.getAddress();
          setAccount(gotAccount);
        }
        const providerInfo = getProviderInfo(web3Provider.currentProvider);
        setProviderInfo(providerInfo);
      }
    } catch (error) {
      console.error({ web3ModalError: error });
    }
  }, []);

  const connectWeb3 = useCallback(async () => {
    try {
      setLoading(true);
      const modalProvider = await web3Modal.connect();

      await setWeb3Provider(modalProvider, true);

      // Subscribe to accounts change
      modalProvider.on("accountsChanged", (accounts: Array<string>) => {
        setAccount(accounts[0]);
      });

      // Subscribe to chainId change
      modalProvider.on("chainChanged", (chainId: number) => {
        setWeb3Provider(modalProvider);
      });
    } catch (error) {
      console.error({ web3ModalError: error });
    }
    setLoading(false);
  }, [setWeb3Provider]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setAccount("");
    setWeb3State({ providerChainId: 1, ethersProvider: null });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    if (web3Modal.cachedProvider) {
      connectWeb3();
    } else {
      setLoading(false);
    }
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        ethersProvider,
        connectWeb3,
        loading,
        disconnect,
        providerChainId,
        account,
        providerInfo,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
