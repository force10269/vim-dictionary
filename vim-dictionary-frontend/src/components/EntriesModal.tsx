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
} from "@/styles/index.module";

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

    return userData.dictionaries.map((dictionary) => (
      <div key={dictionary.id}>
        <h2>{dictionary.name}</h2>
        <button onClick={() => handleViewDictionary(dictionary)}>View</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ));
  };

  const renderSectionsAndEntries = () => {
    if (!userData) {
      return <></>;
    }
    const sections = userData.sections.filter(
      (section) => section.dictionary_id === currentDictionary?.id
    );
    const entries = userData.entries.filter((entry) =>
      sections.some((section) => section.id === entry.id)
    );

    return (
      <div>
        {sections.map((section: Section) => (
          <div key={section.id}>
            <h3>{section.name}</h3>
            <button>Edit</button>
            <button>Delete</button>
            {entries.map((entry: KeyMapping) => (
              <KeyMappingsTable key={entry.id}>
                <thead>
                  <KeyMappingsHeaderRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Description</TableCell>
                  </KeyMappingsHeaderRow>
                </thead>
                <tbody>
                  <KeyMappingsRow key={`${entry.key}-${entry.mode}`}>
                    <TableCell>{entry.key}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <button>Edit</button>
                    <button>Delete</button>
                  </KeyMappingsRow>
                </tbody>
              </KeyMappingsTable>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.modal} style={{ display: show ? "flex" : "none" }}>
      {loading ? (
        <LoadingOverlay message="Processing..." />
      ) : (
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <h2 className={styles.modalHeader}>Personal Entries</h2>
          {!currentDictionary
            ? renderDictionaries()
            : renderSectionsAndEntries()}
        </div>
      )}
    </div>
  );
};

export default EntriesModal;
