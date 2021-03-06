import React from "react";
import { StyledCardContent } from "./styles";

const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
);

export default CardContent;
