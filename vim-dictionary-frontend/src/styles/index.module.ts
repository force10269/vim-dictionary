import styled from "styled-components";
import { Modal, Button as BootstrapButton } from "react-bootstrap";

export const Title = styled.h1`
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f8f8f2;
  margin-top: 7rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #282a36;
  padding-top: 4rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 1rem;
  background-color: #44475a;
  border-bottom: 1px solid #f8f8f2;
  position: fixed;
  top: 0;
  z-index: 1000;

  @media (min-width: 768px) and (max-width: 991px) {
    height: 12%;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    height: 13%;
  }

  @media (min-width: 1200px) {
    height: 15%;
  }
`;

export const AuthButton = styled.button`
  background-color: #6272a4;
  border: none;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #44475a;
  }
`;

export const GlobalSearchInput = styled.input`
  background-color: #282a36;
  border: 1px solid #f8f8f2;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 40%;

  &:focus {
    outline: none !important;
    border: 1px solid #719ece;
    box-shadow: 0 0 10px #719ece;
  }
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const IconLink = styled.a`
  display: flex;
  align-items: center;
  color: #f8f8f2;
  font-size: 3vw;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 5vw;
  }

  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
`;

export const Terminal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #282a36;
  border-radius: 5px;
  padding: 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  color: #f8f8f2;
  width: 80%;
`;

export const SearchInput = styled.input`
  background-color: #282a36;
  border: 1px solid #f8f8f2;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;

  &:focus {
    outline: none !important;
    border: 1px solid #719ece;
    box-shadow: 0 0 10px #719ece;
  }
`;

export const ModeSelect = styled.select`
  background-color: #282a36;
  border: 1px solid #f8f8f2;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const ClearButton = styled.button`
  background-color: #44475a;
  border: 1px solid #f8f8f2;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

export const KeyMappingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const KeyMappingsHeaderRow = styled.tr`
  font-weight: bold;
  text-align: left;
`;

export const KeyMappingsRow = styled.tr`
  padding: 8px;
  border-bottom: 1px solid #f3f3f3;
`;

export const TableCell = styled.td`
  padding: 8px;

  &:nth-child(1) {
    width: 15%;
  }

  &:nth-child(2) {
    width: 27.5%;
  }
`;

export const ModalContainer = styled(Modal)`
  .modal-dialog {
    max-width: 400px;
    margin: 2rem auto;
  }
  .modal-content {
    background-color: #282a36;
    color: #f8f8f2;
  }
  .modal-header,
  .modal-footer {
    border: none;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const LogoutModalContainer = styled(ModalContainer)`
  background-color: #282a36;
  color: #f8f8f2;
`;

export const ModalTitle = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
