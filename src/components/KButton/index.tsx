import React from "react";
import { Props } from "./props";
import { KingButton } from "./styles";

const KButton: React.FC<Props> = (props) => {
  const { label, disabled, onButtonClick } = props;

  // ======================= VIEWS
  return (
    <KingButton disabled={disabled} variant="contained" onClick={onButtonClick}>
      {label}
    </KingButton>
  );
};

export default KButton;
