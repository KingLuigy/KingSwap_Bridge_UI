import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Props } from "./props";
import { LoadingWrapper } from "./styles";

const KLoading: React.FC<Props> = (props) => {
  const { progressLabel } = props;

  // ======================= VIEWS
  return (
    <LoadingWrapper>
      <CircularProgress size={30} />
      <div className="progress">{progressLabel}</div>
      {props.children && <div className="extra">{props.children}</div>}
    </LoadingWrapper>
  );
};

export default KLoading;
