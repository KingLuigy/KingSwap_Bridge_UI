import { useContext, useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { getBalance } from "../utils/erc20";
import { Web3Context } from "../contexts/Web3Context";
import { getStaticContract } from "../utils/erc20";
import { TokensData } from "../config/constant";
import { getEthersProvider } from "../utils/helpers";

const useBalance = (
  tokenDetail?: TokensData,
  targetTokenDetail?: TokensData
) => {
  const [fromBalance, setFromBalance] = useState(BigNumber.from(0));
  const [toBalance, setToBalance] = useState(BigNumber.from(0));
  const [loading, setLoading] = useState(false);
  const { account } = useContext(Web3Context);
  const ethersProvider = tokenDetail
    ? getEthersProvider(tokenDetail?.chainId)
    : null;
  const targetEthersProvider = targetTokenDetail
    ? getEthersProvider(targetTokenDetail?.chainId)
    : null;
  const fromContract =
    ethersProvider && tokenDetail
      ? getStaticContract(ethersProvider, tokenDetail.address)
      : null;
  const toContract =
    targetEthersProvider && targetTokenDetail
      ? getStaticContract(targetEthersProvider, targetTokenDetail.address)
      : null;

  const fetchBalance = useCallback(async () => {
    if (fromContract && toContract) {
      setLoading(true);
      const fromBalance = await getBalance(fromContract, account);
      const toBalance = await getBalance(toContract, account);
      setFromBalance(fromBalance);
      setToBalance(toBalance);
      setLoading(false);
    }
  }, [account, fromContract, toContract]);

  useEffect(() => {
    fetchBalance();
  }, [tokenDetail, targetTokenDetail, account]);

  return { fromBalance, toBalance, loading };
};

export default useBalance;
