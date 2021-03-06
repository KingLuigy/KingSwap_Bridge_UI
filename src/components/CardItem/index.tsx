import React from "react";
import { StyledCardItem } from "./styles";

const CardItem: React.FC = ({ children }) => (
  <StyledCardItem>{children}</StyledCardItem>
);

export default CardItem;
