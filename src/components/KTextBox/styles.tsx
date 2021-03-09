import { createStyles, InputBase, withStyles, Select } from "@material-ui/core";
import styled from "styled-components";
export const KingTextBox = styled.div`
  border: 1px solid rgb(44, 47, 54);
  background-color: rgb(33, 36, 41);
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  z-index: 1;
`;

export const StyledTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 0.75rem;
  font-family: PoppinsLight;
  line-height: 1rem;
  padding: 0.75rem 1rem 0px;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  -webkit-box-align: center;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
`;

export const StyledLabel = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  align-items: center;
  font-weight: 500;
  font-family: PoppinsLight;
  font-size: 14px;
  color: rgb(195, 197, 203);

  &.rightlabel {
    display: block;
    text-align: right;
  }
`;

export const KingTextField = withStyles(() =>
  createStyles({
    input: {
      color: "rgb(255, 255, 255)",
      position: "relative",
      fontWeight: 500,
      fontFamily: "PoppinsLight",
      outline: "none",
      border: "none",
      flex: "1 1 auto",
      backgroundColor: "rgb(33, 36, 41)",
      fontSize: 24,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      padding: 0,
      appearance: "textfield",
    },
  })
)(InputBase);

export const StyledSelect = withStyles(() =>
  createStyles({
    root: {
      color: "rgb(255, 255, 255)",
      outline: "none",
      border: "none",
      fontWeight: 500,
      fontSize: 24,
      fontFamily: "PoppinsLight",
    },
    icon: {
      color: "rgb(255, 255, 255)",
    },
  })
)(Select);
