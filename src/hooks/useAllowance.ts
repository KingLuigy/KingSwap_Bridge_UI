import { useContext, useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { approve, getAllowance } from "../utils/erc20";
import { Web3Context } from "../contexts/Web3Context";
import { getContract } from "../utils/erc20";
import { TokensData } from "../config/constant";
import { getBridgeNetworkAddress } from "../utils/helpers";

const useAllowance = (selectedTokenData: TokensData) => {
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const { account, ethersProvider } = useContext(Web3Context);
  const address = selectedTokenData?.address;
  const bridgeAddress: string | null = getBridgeNetworkAddress(
    selectedTokenData
  );

  const lpContract =
    ethersProvider && address ? getContract(ethersProvider, address) : null;

  const fetchAllowance = useCallback(async () => {
    if (lpContract && bridgeAddress && account) {
      const allowance = await getAllowance(lpContract, account, bridgeAddress);
      if (allowance) setAllowance(allowance);
    }
  }, [account, lpContract, bridgeAddress]);

  useEffect(() => {
    fetchAllowance();
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchAllowance]);

  const handleAllow = useCallback(async () => {
    if (lpContract && bridgeAddress) {
      try {
        const tx = await approve(lpContract, bridgeAddress, account);
        return tx;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }, [account, lpContract, bridgeAddress]);
  return { onAllow: handleAllow, allowance };
};

export default useAllowance;
