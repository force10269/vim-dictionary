import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import styles from "@/styles/Modal.module.css";
import {
  Dictionary,
  Section,
  KeyMapping,
  UserData,
} from "@/services/userService";
import {
  KeyMappingsTable,
  KeyMappingsHeaderRow,
  KeyMappingsRow,
  TableCell,
  Button,
  BackButton,
  AddButton,
  ModalTitle,
  ModalSubTitle,
  ModalContent,
  ModalActions,
} from "@/styles/EntriesModal.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface EntriesModalProps {
  show: boolean;
  onClose: () => void;
  userData: UserData | null;
}

const EntriesModal: React.FC<EntriesModalProps> = ({
  show,
  onClose,
  userData,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentDictionary, setCurrentDictionary] = useState<Dictionary | null>(
    null
  );

  const handleViewDictionary = (dictionary: Dictionary) => {
    setCurrentDictionary(dictionary);
  };

  const renderDictionaries = () => {
    if (!userData) {
      return <></>;
    }

    return (
      <>
        {userData.dictionaries.map((dictionary) => (
          <ModalContent key={dictionary.id}>
            <ModalActions>
              <ModalSubTitle>{dictionary.name}</ModalSubTitle>
              <div>
                <Button onClick={() => handleViewDictionary(dictionary)}>
                  View
                </Button>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </div>
            </ModalActions>
          </ModalContent>
        ))}
        <AddButton>+</AddButton>
      </>
    );
  };

  const renderSectionsAndEntries = () => {
    if (!userData) {
      return <></>;
    }
    const sections = userData.sections.filter(
      (section) => section.dictionary_id === currentDictionary?.id
    );

    const entries = userData.entries.filter((entry) =>
      sections.some((section) => section.id === entry.section_id)
    );

    return (
      <ModalContent>
        {sections.map((section: Section) => (
          <div key={section.id}>
            <ModalActions style={{ paddingTop: "3vh" }}>
              <ModalSubTitle>{section.name}</ModalSubTitle>
              <div>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </div>
            </ModalActions>
            {entries.map((entry: KeyMapping) => (
              <KeyMappingsTable key={entry.id}>
                <thead>
                  <KeyMappingsHeaderRow>
                    <TableCell width="20%" style={{ textAlign: "center" }}>
                      Keymap
                    </TableCell>
                    <TableCell width="30%" style={{ textAlign: "center" }}>
                      Description
                    </TableCell>
                    <TableCell width="50%" />
                  </KeyMappingsHeaderRow>
                </thead>
                <tbody>
                  <KeyMappingsRow key={`${entry.keymap}-${entry.mode}`}>
                    <TableCell width="20%">{entry.keymap}</TableCell>
                    <TableCell width="30%">{entry.description}</TableCell>
                    <TableCell>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </TableCell>
                  </KeyMappingsRow>
                </tbody>
              </KeyMappingsTable>
            ))}
            <AddButton style={{ marginTop: "3vh" }}>+</AddButton>
          </div>
        ))}
        <BackButton onClick={() => setCurrentDictionary(null)}>
          <FontAwesomeIcon icon={faArrowLeft} size={"2x"} />
        </BackButton>
      </ModalContent>
    );
  };

  return (
    <div
      className={styles.modal}
      style={{
        display: show ? "flex" : "none",
      }}
    >
      {loading ? (
        <LoadingOverlay message="Processing..." />
      ) : (
        <div
          className={styles.modalContent}
          style={{
            width: "80vw",
            height: "80vh",
            maxWidth: "unset",
            margin: "auto",
            overflowY: "auto",
            maxHeight: "unset",
          }}
        >
          <Button className={styles.closeButton} onClick={onClose}>
            &times;
          </Button>
          <ModalTitle className={styles.modalHeader}>
            Personal Entries
          </ModalTitle>
          {!currentDictionary
            ? renderDictionaries()
            : renderSectionsAndEntries()}
        </div>
      )}
    </div>
  );
};

export default EntriesModal;
