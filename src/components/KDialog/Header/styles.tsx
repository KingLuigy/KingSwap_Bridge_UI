import styled from "styled-components";
export const KingDialogHeader = styled.div`
  position: relative;
  background-color: rgb(44, 47, 54);
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  text-align: center;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  flex-direction: column;
  color: #ffffff;
  @media screen and (max-width: 1000px) {
    min-height: 58px;
  }

  .headerTitle {
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 14px;
    right: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: transparent;
    outline: none;
    border: 0;
    transition: opacity 0.2s ease-out;
    color: #ffffff;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
`;
