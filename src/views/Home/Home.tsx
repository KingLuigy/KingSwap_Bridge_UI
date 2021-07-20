import React, { useContext, useState, useCallback, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import MenuItem from "@material-ui/core/MenuItem";
import { Web3Context } from "../../contexts/Web3Context";
import ConnectWeb3 from "../../components/ConnectWeb3";
import Page from "../../components/Page";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import KTextBox from "../../components/KTextBox";
import CardItem from "../../components/CardItem";
import KButton from "../../components/KButton";
import {
  formatValue,
  getBridgeNetwork,
  getNetworkLabel,
} from "../../utils/helpers";
import { transferTokens } from "../../utils/bridge";
import useAllowance from "../../hooks/useAllowance";
import { HOME_NETWORK, tokensData } from "../../config/constant";
import useBalance from "../../hooks/useBalance";
import KLoading from "../../components/KLoading";

const Home: React.FC = () => {
  const { account, providerChainId: chainId, ethersProvider } = useContext(
    Web3Context
  );
  const filteredTokensData = tokensData.filter((x) => x.chainId === chainId);
  const filteredTargetTokensData = tokensData.filter(
    (x) => x.chainId !== chainId
  );
  const [token, setToken] = useState(filteredTokensData[0]?.index || 0);
  const [amountToTransfer, setAmountToTransfer] = useState(0);
  const [allowed, setAllowed] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [requestedAllowance, setRequestedAllowance] = useState(false);
  const selectedTokenDetail = tokensData.filter((x) => x.index === token)[0];
  const targetTokenDetail = tokensData.filter(
    (x) => x.index === selectedTokenDetail?.targetIndex
  )[0];
  const { allowance, onAllow } = useAllowance(selectedTokenDetail);
  const amount = selectedTokenDetail
    ? ethers.utils.parseUnits(
        amountToTransfer.toString(),
        selectedTokenDetail?.decimal
      )
    : BigNumber.from(0);
  const { fromBalance, toBalance, loading } = useBalance(
    selectedTokenDetail,
    targetTokenDetail
  );
  const [requestedTransfer, setRequestedTransfer] = useState(false);
  const valid =
    account !== "" &&
    chainId &&
    [HOME_NETWORK, getBridgeNetwork(HOME_NETWORK)].indexOf(chainId) >= 0;
  const hasAmount = amount.gt(0);
  const isBalanceEnough = fromBalance.gte(amount);
  const hasAllowance = allowance?.gt(0);

  useEffect(() => {
    const isAllowed =
      hasAmount &&
      isBalanceEnough &&
      (hasAllowance ? allowance.gte(amount) : true);

    setAllowed(isAllowed);
  }, [hasAmount, isBalanceEnough, allowance]);

  const handleAllowance = useCallback(async () => {
    try {
      setRequestedAllowance(true);
      const tx = await onAllow();
      await tx.wait();
    } catch (e) {
      console.log(e);
    } finally {
      setRequestedTransfer(false);
    }
  }, [onAllow]);

  const handleTransfer = useCallback(async () => {
    if (ethersProvider) {
      try {
        setRequestedTransfer(true);
        const tx = await transferTokens(
          ethersProvider,
          selectedTokenDetail,
          account,
          amount
        );
        await tx.wait();
      } catch (e) {
        console.log(e);
      } finally {
        setRequestedTransfer(false);
      }
    }
  }, [
    account,
    amountToTransfer,
    ethersProvider,
    token,
    amount,
    selectedTokenDetail,
  ]);

  useEffect(() => {
    handleChange(filteredTokensData[0]?.index.toString());
  }, [chainId]);

  const handleChange = (selectedValue: string) => {
    setToken(parseInt(selectedValue));
    setAmountToTransfer(0);
  };

  const renderMenuItem = () => {
    return filteredTokensData.map((item, index) => (
      <MenuItem key={index} value={item.index}>
        {item.symbol}
      </MenuItem>
    ));
  };

  const renderTargetMenuItem = () => {
    return filteredTargetTokensData.map((item, index) => (
      <MenuItem key={index} value={item.index}>
        {item.symbol}
      </MenuItem>
    ));
  };

  const renderTransactionButton = () => requestedTransfer || requestedAllowance ? (
    <KLoading progressLabel="Processing..." />
  ) : (
    <KButton
      label={hasAllowance ? "Transfer" : "Approve"}
      disabled={requestedTransfer || requestedAllowance || !allowed}
      onButtonClick={() => {
        hasAllowance ? handleTransfer() : handleAllowance();
      }}
    />
  );

  const handleAmountChange = (amount: string) => {
    setIsTouched(true);
    if (amount.length >= 21) return;
    setAmountToTransfer(parseInt(amount !== "" ? amount : "0"));
  };

  return (
    <Page>
      {!valid ? (
        <ConnectWeb3 />
      ) : (
        <Card>
          <CardContent>
            <CardItem>
              {chainId && (
                <>
                  <KTextBox
                    label={`From ${getNetworkLabel(chainId)}`}
                    onChange={handleAmountChange}
                    value={amountToTransfer.toString()}
                    selectedValue={token.toString()}
                    onSelectedValueChange={handleChange}
                    renderMenuItem={renderMenuItem}
                    rightLabel={
                      selectedTokenDetail && !loading
                        ? formatValue(fromBalance, selectedTokenDetail.decimal)
                        : ""
                    }
                  />
                  {renderTransactionButton()}
                  {isTouched && (
                    <div style={{ color: "red" }}>
                      {!hasAmount && (
                        <div>The amount must be greater than zero</div>
                      )}
                      {!isBalanceEnough && (
                        <div>Insufficient funds on the balance</div>
                      )}
                      {hasAllowance && allowance.lt(amount) && (
                        <div>The amount must be no more than the allowance</div>
                      )}
                    </div>
                  )}
                  <KTextBox
                    label={`To ${getNetworkLabel(getBridgeNetwork(chainId))}`}
                    disabled
                    onChange={handleAmountChange}
                    value={amountToTransfer.toString()}
                    selectedValue={tokensData
                      .filter(
                        (x) => x.chainId === chainId && x.index === token
                      )[0]
                      ?.targetIndex.toString()}
                    onSelectedValueChange={handleChange}
                    renderMenuItem={renderTargetMenuItem}
                    rightLabel={
                      targetTokenDetail && !loading
                        ? formatValue(toBalance, targetTokenDetail.decimal)
                        : ""
                    }
                  />
                </>
              )}
            </CardItem>
          </CardContent>
        </Card>
      )}
    </Page>
  );
};

export default Home;
