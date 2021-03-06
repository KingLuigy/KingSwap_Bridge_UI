import React from "react";
import KDialogHeader from "./Header";
import KDialogContent from "./Content";
import { Props } from "./props";
import { KingDialog } from "./styles";

const KDialog: React.FC<Props> = (props) => {
  const { open, title, onClose, content } = props;

  // ======================= VIEWS
  return (
    <KingDialog
      PaperProps={{
        style: { borderRadius: 18 },
      }}
      maxWidth="xs"
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <KDialogHeader title={title} onClose={onClose} />
      <KDialogContent content={content} />
    </KingDialog>
  );
};

export default KDialog;
