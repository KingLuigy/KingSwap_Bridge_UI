import styled from "styled-components";

export const StyledText = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
`;

export const StyledSubText = styled.div`
  color: rgb(195, 197, 203);
  margin-bottom: 1rem;
  text-align: center;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(33, 36, 41);
  border-radius: 1rem;
  width: calc(100% - 2rem);
  margin-top: 5rem;
  padding: 2rem;
  max-width: 27.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const StyledIcon = styled.div<{ valid: boolean }>`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: ${(props) =>
    props.valid ? "rgb(32, 134, 254)" : "rgb(239, 93, 93)"};
  border-radius: 50%;
  padding: 1rem;
  color: rgb(255, 255, 255);
  margin-bottom: 1rem;
`;
