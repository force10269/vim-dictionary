import styled from "styled-components";

export const Title = styled.h1`
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f8f8f2;
  margin-top: 1.5rem;
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
  justify-content: flex-end;
  width: 100%;
  height: 10%;
  padding: 1rem;
  background-color: #44475a;
  border-bottom: 1px solid #f8f8f2;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const IconLink = styled.a`
  color: #f8f8f2;
  margin-left: 1rem;
  font-size: 1.5rem;
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
    width: 150px;
  }

  &:nth-child(2) {
    width: 450px;
  }
`;
