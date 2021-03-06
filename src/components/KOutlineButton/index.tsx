import React from "react";
import { Props } from "./props";
import { KingOutlineButton } from "./styles";

const KOutlineButton: React.FC<Props> = (props) => {
  const { label, onOutlineButtonClick } = props;

  // ======================= VIEWS
  return (
    <KingOutlineButton variant="outlined" onClick={onOutlineButtonClick}>
      <span className="label">{label}</span>
    </KingOutlineButton>
  );
};

export default KOutlineButton;
