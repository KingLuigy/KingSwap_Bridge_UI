import React from "react";
import copy from "copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Props } from "./props";
import { AccountDetailWrapper } from "./styles";
import KOutlineButton from "../KOutlineButton";
import { formatAddress } from "../../utils/helpers";

const AccountDetail: React.FC<Props> = (props) => {
  const { address, providerName, logo, logout } = props;

  // ======================= FUNCTIONS
  const copyAddress = () => {
    copy(address);
  };

  // ======================= VIEWS
  return (
    <AccountDetailWrapper>
      <div className="block">
        <div className="blockHeader">
          {logo !== "" && <img className="icon" src={logo} alt="" />}
          <span className="providerText">{providerName}</span>
          <KOutlineButton label="Disconnect" onOutlineButtonClick={logout} />
        </div>
        <div className="address">
          <div className="addressContainer">
            <span className="addressText">{formatAddress(address)}</span>
          </div>
          <Tooltip title="Copy">
            <button className="control" onClick={() => copyAddress()}>
              <FileCopyIcon />
            </button>
          </Tooltip>
          <Tooltip title="View On Etherscan">
            <a
              href={`https://etherscan.io/address/${address}`}
              target="_blank noreferrer"
              className="control"
            >
              <VisibilityIcon />
            </a>
          </Tooltip>
        </div>
      </div>
    </AccountDetailWrapper>
  );
};

export default AccountDetail;
