import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Props } from "./props";
import { KingDialogHeader } from "./styles";

const KDialogHeader: React.FC<Props> = (props) => {
  const { title, onClose } = props;

  const handleClose = (): void => {
    onClose();
  };

  return (
    <KingDialogHeader>
      <div className="headerTitle">{title}</div>
      <button className="close" onClick={handleClose}>
        <CloseIcon />
      </button>
    </KingDialogHeader>
  );
};

export default KDialogHeader;
