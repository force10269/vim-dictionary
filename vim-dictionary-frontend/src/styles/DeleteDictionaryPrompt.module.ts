import styled from "styled-components";
import { Button as BootstrapButton } from "react-bootstrap";

export const DeletePromptContainer = styled.div`
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

export const DeletePromptContent = styled.div`
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

export const DeletePromptButton = styled(BootstrapButton)`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem 1rem;
  border-radius: 5px;
  color: #f8f8f2;
  background-color: ${(props) => (props.primary ? "#44475a" : "transparent")};
  border: 1px solid #f8f8f2;

  &:hover {
    color: #f8f8f2;
    background-color: ${(props) => (props.primary ? "#44475a" : "transparent")};
    opacity: 0.8;
  }
`;

export const Input = styled.input`
  background-color: #282a36;
  border: 1px solid #f8f8f2;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 80%;

  &:focus {
    outline: none !important;
    border: 1px solid #719ece;
    box-shadow: 0 0 10px #719ece;
  }
`;
