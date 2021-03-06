import React from "react";
import { Props } from "./props";
import { KingDialogContent } from "./styles";

const KDialogContent: React.FC<Props> = (props) => {
  const { content } = props;
  return <KingDialogContent>{content}</KingDialogContent>;
};

export default KDialogContent;
