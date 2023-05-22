import styled from "styled-components";
import { Modal, Button as BootstrapButton } from "react-bootstrap";

export const ModalContainer = styled(Modal)`
  .modal-dialog {
    width: 70vw;
    height: 70vh;
    max-width: unset;
    margin: auto;
  }
  .modal-content {
    background-color: #282a36;
    color: #f8f8f2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .modal-header,
  .modal-footer {
    border: none;
  }
`;

export const ModalTitle = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ModalSubTitle = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #f8f8f2;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled(BootstrapButton)`
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

export const AddButton = styled(Button)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const BackButton = styled(Button)`
  position: absolute;
  top: 15px;
  left: 15px;
`;

export const KeyMappingsTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  border: 1px solid #f8f8f2;
`;

export const KeyMappingsHeaderRow = styled.tr`
  background-color: #44475a;
  color: #f8f8f2;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #f8f8f2;
`;

export const KeyMappingsRow = styled.tr`
  &:nth-child(even) {
    background-color: #282a36;
  }
  &:nth-child(odd) {
    background-color: #44475a;
  }
  color: #f8f8f2;
  border-bottom: 1px solid #f8f8f2;
`;

export const TableCell = styled.td`
  padding: 0.5rem;
  width: ${(props) => props.width || "auto"};
`;
