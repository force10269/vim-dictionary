import styled from "styled-components";

export const EditPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  padding: 50px;
`;

export const EditPromptContent = styled.div`
  background-color: #282a36;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
