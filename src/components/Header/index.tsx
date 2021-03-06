import React, { useContext, useState } from "react";
import KWalletButton from "../../components/KWalletButton";
import KDialog from "../../components/KDialog";
import AccountDetail from "../../components/AccountDetails";
import crown from "../../assets/images/crown.png";
import { Web3Context } from "../../contexts/Web3Context";
import { HeaderContainer, StyledLogo } from "./styles";

const Header: React.FC = () => {
  // ================== VARIABLES & HOOKS
  const {
    providerInfo,
    providerChainId,
    account,
    connectWeb3: login,
    disconnect,
  } = useContext(Web3Context);
  const logo = providerInfo ? providerInfo.logo : "";
  const providerName = providerInfo ? providerInfo.name : "";
  const isConnected = !!account;
  const [isAccountDialogVisibile, setIsAccountDialogVisibile] = useState(false);
  // ================== FUNCTION
  const onHandleAccountDialogVisible = () => {
    setIsAccountDialogVisibile(!isAccountDialogVisibile);
  };

  const onClickWalletButton = () => {
    if (isConnected) onHandleAccountDialogVisible();
    else login();
  };

  const logout = () => {
    disconnect();
    onHandleAccountDialogVisible();
  };

  // ================== VIEW
  return (
    <HeaderContainer>
      <StyledLogo>
        <img src={crown} height="50" style={{ marginTop: -4 }} alt="logo" />
        KingSwap Bridge
      </StyledLogo>
      <KWalletButton
        logo={logo}
        address={account}
        providerChainId={providerChainId}
        isConnected={isConnected}
        onClick={onClickWalletButton}
      />
      <KDialog
        open={isAccountDialogVisibile}
        onClose={onHandleAccountDialogVisible}
        content={
          <AccountDetail
            address={account}
            providerName={providerName}
            logo={logo}
            logout={logout}
          />
        }
        title="Account"
      />
    </HeaderContainer>
  );
};

export default Header;
