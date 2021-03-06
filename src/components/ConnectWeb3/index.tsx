import { Web3Context } from "../../contexts/Web3Context";
import { useContext } from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { getNetworkName, getBridgeNetwork } from "../../utils/helpers";
import { HOME_NETWORK } from "../../config/constant";
import KButton from "../KButton";
import {
  StyledContainer,
  StyledIcon,
  StyledSubText,
  StyledText,
} from "./styles";

const ConnectWeb3 = () => {
  const {
    connectWeb3,
    providerChainId,
    loading,
    account,
    disconnect,
  } = useContext(Web3Context);
  const valid =
    !!account &&
    providerChainId &&
    [HOME_NETWORK, getBridgeNetwork(HOME_NETWORK)].indexOf(providerChainId) >=
      0;
  return (
    <StyledContainer>
      <StyledIcon valid={valid || false}>
        <AccountBalanceWalletIcon style={{ fontSize: 40 }} />
      </StyledIcon>
      {loading ? (
        <StyledText>Connecting Wallet</StyledText>
      ) : (
        <>
          <StyledText>
            {account ? `Switch to a supported network` : "Connect Wallet"}
          </StyledText>
          <StyledSubText>
            {account
              ? `To access Kingswap Bridge, please switch to ${getNetworkName(
                  HOME_NETWORK
                )} or ${getNetworkName(getBridgeNetwork(HOME_NETWORK))}`
              : "To get started, connect your wallet"}
          </StyledSubText>
        </>
      )}
      {account && !loading ? (
        <KButton
          label="Disconnect"
          disabled={loading || false}
          onButtonClick={disconnect}
        />
      ) : (
        <KButton
          label="Connect"
          disabled={loading || false}
          onButtonClick={connectWeb3}
        />
      )}
    </StyledContainer>
  );
};

export default ConnectWeb3;
