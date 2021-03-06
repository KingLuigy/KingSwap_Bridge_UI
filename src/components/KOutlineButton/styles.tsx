import styled from "styled-components";
import { Button } from "@material-ui/core";
export const KingOutlineButton = styled(Button)`
  border-radius: 100px !important;
  font-size: 15px;
  background-color: rgb(64, 68, 79) !important;
  font-family: PoppinsLight !important;
  &:hover {
    background-color: rgb(55, 59, 68) !important;
  }

  .label {
    color: #ffffff;
    font-weight: 500;
    font-size: 15px;
    white-space: nowrap;
    text-transform: none;
  }
`;
