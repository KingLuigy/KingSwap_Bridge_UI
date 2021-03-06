import React, { useContext, useState, useCallback, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Web3Context } from "../../contexts/Web3Context";
import ConnectWeb3 from "../../components/ConnectWeb3";
import Page from "../../components/Page";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import KTextBox from "../../components/KTextBox";
import CardItem from "../../components/CardItem";
import KButton from "../../components/KButton";
import { getBridgeNetwork, getNetworkLabel } from "../../utils/helpers";
import { transferTokens } from "../../utils/bridge";
import useAllowance from "../../hooks/useAllowance";
import { HOME_NETWORK, tokensData } from "../../config/constant";

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
  const [requestedAllowance, setRequestedAllowance] = useState(false);
  const { allowance, onAllow } = useAllowance(tokensData[token]);
  const [requestedTransfer, setRequestedTransfer] = useState(false);
  const valid =
    !!account &&
    chainId &&
    [HOME_NETWORK, getBridgeNetwork(HOME_NETWORK)].indexOf(chainId) >= 0;

  const handleAllowance = useCallback(async () => {
    try {
      setRequestedAllowance(true);
      const txHash = await onAllow();
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedAllowance(false);
      }
    } catch (e) {
      setRequestedAllowance(false);
      console.log(e);
    }
  }, [onAllow]);

  const handleTransfer = useCallback(async () => {
    if (ethersProvider) {
      try {
        setRequestedTransfer(true);
        const txHash = await transferTokens(
          ethersProvider,
          tokensData.filter((x) => x.index === token)[0],
          account,
          amountToTransfer
        );
        // user rejected tx or didn't go thru
        if (!txHash) {
          setRequestedTransfer(false);
        }
      } catch (e) {
        setRequestedTransfer(false);
        console.log(e);
      }
    }
  }, [account, amountToTransfer, ethersProvider, token]);

  useEffect(() => {
    handleChange(filteredTokensData[0]?.index.toString());
  }, [chainId]);

  const handleChange = (selectedValue: string) => {
    setToken(parseInt(selectedValue));
  };

  const renderMenuItem = () => {
    return filteredTokensData.map((item) => (
      <MenuItem value={item.index}>{item.symbol}</MenuItem>
    ));
  };

  const renderTartgetMenuItem = () => {
    return filteredTargetTokensData.map((item) => (
      <MenuItem value={item.index}>{item.symbol}</MenuItem>
    ));
  };

  const renderTransactionButton = () => {
    return (
      <KButton
        label={allowance?.gte(0) ? "Transfer" : "Approve"}
        disabled={requestedAllowance || requestedTransfer}
        onButtonClick={() =>
          allowance?.gte(0) ? handleTransfer() : handleAllowance()
        }
      />
    );
  };

  const handleAmountChange = (amount: string) => {
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
                  />
                  {renderTransactionButton()}
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
                    renderMenuItem={renderTartgetMenuItem}
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
