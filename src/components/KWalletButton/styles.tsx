import styled from "styled-components";

export const Account = styled.button`
  cursor: pointer;
  border-radius: 100px;
  position: relative;
  display: flex;
  background-color: rgb(64, 68, 79) !important;
  font-family: PoppinsLight !important;
  &:hover {
    background-color: rgb(55, 59, 68) !important;
  }

  border: 1px solid #ffffff;
  box-sizing: border-box;
  outline: none;
  padding: 5px;
  align-items: center;

  .title {
    font-size: 13px;
    position: relative;
    margin-left: 9px;
    margin-right: 9px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  .icon {
    width: 25px;
    height: 25px;
    box-sizing: border-box;
    border-radius: 100px;
    border: 1px solid #f58624;
    box-shadow: inset 0px 0px 0px 3px #f58624;
  }
`;

export const Network = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  border-radius: 6px;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 2rem;
  font-size: 0.875rem;
  color: rgb(32, 134, 254);
  font-weight: 600;
  margin-left: 1rem;
`;
