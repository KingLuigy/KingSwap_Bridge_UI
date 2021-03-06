import styled from "styled-components";
export const AccountDetailWrapper = styled.div`
  min-width: 300px;
  .icon {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 100px;
    border: 1px solid #f58624;
    box-shadow: inset 0px 0px 0px 3px #f58624;
    margin-right: 11px;
  }

  .block {
    padding: 15px 15px 11px 15px;
  }

  .blockHeader {
    display: flex;
    align-items: center;
  }

  .blockHeaderTitle {
    font-size: 15px;
  }

  .address {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 41px;
  }

  .providerText {
    font-size: 16px;
    margin-right: 11px;
  }

  .addressContainer {
    width: 200px;
  }

  .addressIcon {
    width: 12px;
    height: 12px;
    border-radius: 100px;
    margin-right: 11px;
  }

  .addressText {
    font-size: 20px;
  }

  .controls {
    display: flex;
    align-items: center;
  }

  .control {
    cursor: pointer;
    font-size: 15px;
    color: #9aa0ad;
    display: flex;
    align-items: center;
    border: 0;
    outline: none;
    min-height: 32px;
    padding: 0;
    background: transparent;
    transition: all 0.2s ease-out;
    text-decoration: none;

    &:not(:last-child) {
      margin-right: 14px;
    }

    &:hover {
      color: #1c2230;
      svg {
        path {
          fill: #1c2230;
        }
      }
    }

    &:active {
      opacity: 0.6;
    }

    svg {
      margin-right: 8px;

      path {
        transition: all 0.2s ease-out;
      }
    }
  }
`;
