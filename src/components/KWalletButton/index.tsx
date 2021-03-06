import React from "react";
import { Props } from "./props";
import { Account, Network } from "./styles";
import { formatAddress, getNetworkLabel } from "../../utils/helpers";
import KOutlineButton from "../KOutlineButton";

const KWalletButton: React.FC<Props> = ({
  isConnected,
  logo,
  address,
  providerChainId,
  onClick,
}) => {
  return !isConnected ? (
    <KOutlineButton
      label="Connect to a wallet"
      onOutlineButtonClick={() => onClick()}
    />
  ) : (
    <Account onClick={() => onClick()}>
      {providerChainId && <Network>{getNetworkLabel(providerChainId)}</Network>}
      <span className="title">{formatAddress(address)}</span>
      {logo && <img className="icon" src={logo} alt="" />}
    </Account>
  );
};

export default KWalletButton;
