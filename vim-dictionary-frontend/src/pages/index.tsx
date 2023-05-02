import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #282a36;
  padding-top: 4rem;
`;

const Header = styled.header`
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

const IconLink = styled.a`
  color: #f8f8f2;
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const Terminal = styled.div`
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

const SearchInput = styled.input`
  background-color: #282a36;
  border: 1px solid #f8f8f2;
  border-radius: 5px;
  color: #f8f8f2;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;
`;

const ModeSelect = styled.select`
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

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("normal");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const getExpressiveKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    switch (key) {
      case " ":
        return "<Space>";
      case "Control":
        return "<Ctrl>";
      case "Alt":
        return "<Alt>";
      default:
        return key;
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Backspace") {
      setSearch((prevSearch) => prevSearch.slice(0, -1));
      return;
    } else if (
      e.key === "Shift" ||
      e.key === "Enter" ||
      e.key === "CapsLock" ||
      e.key === "Meta"
    ) {
      return;
    }

    const expressiveKey = getExpressiveKey(e);
    setSearch((prevSearch) => prevSearch + expressiveKey);
  };

  return (
    <Container>
      <Head>
        <title>Vim Dictionary</title>
        <meta name="description" content="A Vim shortcuts dictionary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <IconLink
          href="https://github.com/force10269/vim-dictionary"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} size={"sm"} />
        </IconLink>
        <IconLink href="#">
          <FontAwesomeIcon icon={faUser} size={"sm"} />
        </IconLink>
      </Header>

      <Terminal>
        <label htmlFor="mode">Mode:</label>
        <ModeSelect id="mode" value={mode} onChange={handleModeChange}>
          <option value="normal">Normal</option>
          <option value="visual">Visual</option>
          <option value="visual">Visual</option>
          <option value="insert">Insert</option>
          <option value="command">Command</option>
          <option value="replace">Replace</option>
        </ModeSelect>
        <label htmlFor="search">Search:</label>
        <SearchInput
          id="search"
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          placeholder="Type keymap (e.g. dd)"
        />
      </Terminal>
    </Container>
  );
}
