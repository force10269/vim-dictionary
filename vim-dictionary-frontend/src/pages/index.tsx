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
} from "../styles/index.module";
import { keyMappings } from "@/data/default-dictionary";

interface KeyMapping {
  key: string;
  mode: string;
  description: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchBtnInput, setSearchBtnInput] = useState("");
  const [mode, setMode] = useState("normal");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchBtnInput(search);
  };

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const handleClearButtonClick = () => {
    setSearch("");
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
    searchBtnTerm: string
  ): KeyMapping[] => {
    if (!searchTerm && !searchBtnTerm) {
      return keyMappings;
    }

    const filteredMappings = keyMappings.filter((mapping) => {
      if (mode && mapping.mode.toLowerCase() !== mode.toLowerCase()) {
        return false;
      }

      if (searchBtnTerm) {
        return (
          mapping.key === searchBtnTerm ||
          mapping.key.toUpperCase() === searchBtnTerm ||
          mapping.key.toLowerCase() === searchBtnTerm
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
    searchBtnInput
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
        {filteredMappings.map((mapping: KeyMapping) => (
          <div key={`${mapping.key}-${mapping.mode}`}>
            <span>{mapping.key}</span>
            &nbsp;
            <span>{mapping.description}</span>
          </div>
        ))}
      </Terminal>
    </Container>
  );
}
