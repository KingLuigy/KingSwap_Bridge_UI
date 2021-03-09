import styled from "styled-components";

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .progress {
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
    color: #f58624;
  }

  .extra {
    padding-top: 30px;
    text-align: center;
    font-size: 14px;
    min-height: 34px;
    display: flex;
    align-items: center;
  }
`;
