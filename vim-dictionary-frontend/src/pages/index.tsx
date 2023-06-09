import React, { ChangeEvent, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Title,
  Container,
  Header,
  AuthButton,
  GlobalSearchInput,
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
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import LogoutModal from "@/components/LogoutModal";
import EntriesModal from "@/components/EntriesModal";
import { keyMappings } from "@/data/default-dictionary";
import { UserData, getUserData, validateToken } from "@/services/userService";
import LoadingOverlay from "@/components/LoadingOverlay";

interface KeyMapping {
  key: string;
  mode: string;
  description: string;
  section?: string;
  dictionary?: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [mode, setMode] = useState("normal");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [entriesModalVisible, setEntriesModalVisible] = useState(false);
  const [keyMappingData, setKeyMappingData] = useState<KeyMapping[]>([]);
  const [userDataFetched, setUserDataFetched] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);
      const isValid = await validateToken();

      if (isValid) {
        const userId = Cookies.get("user_id");
        if (typeof userId === "string" && !userDataFetched) {
          const userDataFromServer = await getUserData(userId);
          setUserData(userDataFromServer);
          setLoggedIn(true);
          setUserDataFetched(true);
        }
      } else {
        Cookies.remove("token");
        setLoggedIn(false);
        setUserDataFetched(false);
      }

      setLoading(false);
    };

    initializeUser();
  }, [loggedIn]);

  useEffect(() => {
    if (userData) {
      const userMappings = userData.entries.map((entry) => {
        const section = userData.sections.find(
          (section) => section.id === entry.section_id
        );
        const dictionary = section
          ? userData.dictionaries.find(
              (dict) => dict.id === section.dictionary_id
            )
          : null;

        return {
          key: entry.keymap,
          mode: entry.mode,
          description: entry.description,
          section: section ? section.name : "",
          dictionary: dictionary ? dictionary.name : "",
        };
      }) as KeyMapping[];

      setKeyMappingData(userMappings);
    }
  }, [userData]);

  const allMappings = [...keyMappingData, ...keyMappings];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGlobalSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue !== globalSearch) {
      setGlobalSearch(newValue);
    }
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
      case "Tab":
        return "<Tab>";
      case "Delete":
        return "<Del>";
      case "Home":
        return "<Home>";
      case "End":
        return "<End>";
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

  const filterKeyMappings = (
    keyMappings: Array<KeyMapping>,
    searchTerm: string
  ) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return keyMappings.filter((mapping) =>
      mapping.key.toLowerCase().startsWith(lowerSearchTerm)
    );
  };

  const filterGlobalSearch = (
    keyMappings: Array<KeyMapping>,
    globalSearch: string
  ) => {
    const lowerGlobalSearch = globalSearch.toLowerCase();
    return keyMappings.filter((mapping) => {
      const consolidatedMapping = (
        mapping.key +
        mapping.description +
        (mapping.section || "") +
        (mapping.dictionary || "")
      ).toLowerCase();
      return consolidatedMapping.includes(lowerGlobalSearch);
    });
  };

  const filteredMappings = (() => {
    let result = allMappings;

    if (search) {
      result = filterKeyMappings(result, search);
    }

    if (globalSearch) {
      result = filterGlobalSearch(result, globalSearch);
    }

    return result;
  })();

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
          <FontAwesomeIcon icon={faGithub} size={"2x"} />
        </IconLink>
        <GlobalSearchInput
          id="global-search"
          type="text"
          value={globalSearch}
          onChange={handleGlobalSearchChange}
          placeholder="Global search..."
          aria-label="Global search"
        />
        {loading ? (
          <LoadingOverlay message="Loading..." />
        ) : !loggedIn ? (
          <>
            <AuthButton onClick={() => setLoginModalVisible(true)}>
              Log In
            </AuthButton>
            <AuthButton onClick={() => setSignupModalVisible(true)}>
              Sign Up
            </AuthButton>
            <LoginModal
              show={loginModalVisible}
              onClose={() => setLoginModalVisible(false)}
              onLoginSuccess={() => {
                setLoggedIn(true);
                setLoginModalVisible(false);
              }}
            />
            <SignupModal
              show={signupModalVisible}
              onClose={() => setSignupModalVisible(false)}
              onSignupSuccess={() => {
                setLoggedIn(true);
                setSignupModalVisible(false);
              }}
            />
          </>
        ) : (
          <>
            <AuthButton onClick={() => setEntriesModalVisible(true)}>
              My Entries
            </AuthButton>
            <AuthButton onClick={() => setLogoutModalVisible(true)}>
              Log Out
            </AuthButton>
            <LogoutModal
              show={logoutModalVisible}
              onClose={() => setLogoutModalVisible(false)}
              onLogoutSuccess={() => {
                setLoggedIn(false);
                setLogoutModalVisible(false);
                setKeyMappingData(keyMappings);
                setUserData(null);
              }}
            />
            <EntriesModal
              show={entriesModalVisible}
              onClose={() => setEntriesModalVisible(false)}
              userData={userData}
              setUserData={setUserData}
            />
          </>
        )}
      </Header>

      <Title>Vim Dictionary</Title>
      <Terminal>
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
        </SearchRow>
        {filteredMappings.length > 0 ? (
          <KeyMappingsTable>
            <thead>
              <KeyMappingsHeaderRow>
                <TableCell>Key</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Dictionary</TableCell>
              </KeyMappingsHeaderRow>
            </thead>
            <tbody>
              {filteredMappings.map((mapping: KeyMapping, index: number) => (
                <KeyMappingsRow key={index}>
                  <TableCell>{mapping.key}</TableCell>
                  <TableCell>{mapping.description}</TableCell>
                  <TableCell>{mapping.section || "Default"}</TableCell>
                  <TableCell>{mapping.dictionary || "Default"}</TableCell>
                </KeyMappingsRow>
              ))}
            </tbody>
          </KeyMappingsTable>
        ) : search ? (
          <p>No results</p>
        ) : null}
      </Terminal>
    </Container>
  );
}
