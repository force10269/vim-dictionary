import { ChangeEvent, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Header,
  IconLink,
  Terminal,
  SearchInput,
  ModeSelect,
  ClearButton,
  SearchRow,
  KeyMappingsRow,
  KeyMappingsTable,
  KeyMappingsHeaderRow,
  TableCell,
} from "../styles/index.module";
import { keyMappings } from "@/data/default-dictionary";

interface KeyMapping {
  key: string;
  mode: string;
  description: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("normal");
  const [searchMode, setSearchMode] = useState("soft");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchMode("hard-match");
  };

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const handleClearButtonClick = () => {
    setSearch("");
    setSearchMode("soft-match");
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
    if (e.key === "Enter") {
      handleSearchButtonClick();
      return;
    }

    setSearchMode("soft-match");

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

  const filterKeyMappings = (
    keyMappings: KeyMapping[],
    searchTerm: string,
    mode: string,
    searchMode: string
  ): KeyMapping[] => {
    if (!searchTerm) {
      return keyMappings;
    }

    const filteredMappings = keyMappings.filter((mapping) => {
      if (mode && mapping.mode.toLowerCase() !== mode.toLowerCase()) {
        return false;
      }

      if (searchMode === "hard-match") {
        return (
          mapping.key === searchTerm ||
          mapping.key.toUpperCase() === searchTerm ||
          mapping.key.toLowerCase() === searchTerm
        );
      }

      return (
        mapping.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mapping.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return filteredMappings;
  };

  const filteredMappings = filterKeyMappings(
    keyMappings,
    search,
    mode,
    searchMode
  );

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
        <SearchRow>
          <SearchInput
            id="search"
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Type keymap (e.g. dd)"
            style={{ flexGrow: 1 }}
          />
          <ClearButton onClick={handleClearButtonClick}>Clear</ClearButton>
          <ClearButton onClick={handleSearchButtonClick}>Search</ClearButton>
        </SearchRow>
        <KeyMappingsTable>
          <thead>
            <KeyMappingsHeaderRow>
              <TableCell>Key</TableCell>
              <TableCell>Description</TableCell>
            </KeyMappingsHeaderRow>
          </thead>
          <tbody>
            {filteredMappings.map((mapping: KeyMapping) => (
              <KeyMappingsRow key={`${mapping.key}-${mapping.mode}`}>
                <TableCell>{mapping.key}</TableCell>
                <TableCell>{mapping.description}</TableCell>
              </KeyMappingsRow>
            ))}
          </tbody>
        </KeyMappingsTable>
      </Terminal>
    </Container>
  );
}
