import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import DeleteDictionaryPrompt from "./DeleteDictionaryPrompt";
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
import {
  createDictionary,
  deleteDictionary,
} from "@/services/dictionaryService";
import Cookies from "js-cookie";

interface EntriesModalProps {
  show: boolean;
  onClose: () => void;
  userData: UserData | null;
}

interface DictionaryFormData {
  name: string;
  user_id: number;
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

  const [showCreateDictionaryForm, setShowCreateDictionaryForm] =
    useState(false);
  const [dictionaryFormData, setDictionaryFormData] =
    useState<DictionaryFormData>({ name: "", user_id: 0 });

  const [dictionaryToDelete, setDictionaryToDelete] =
    useState<Dictionary | null>(null);

  const handleViewDictionary = (dictionary: Dictionary) => {
    setCurrentDictionary(dictionary);
  };

  const handleDeleteDictionary = (dictionary: Dictionary) => {
    setDictionaryToDelete(dictionary);
  };

  const handleCreateDictionaryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setDictionaryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateDictionaryFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await createDictionary(dictionaryFormData);
    setShowCreateDictionaryForm(false);
  };

  const handleDeleteDictionarySubmit = async (id: number) => {
    const success = await deleteDictionary(id);
    if (success) {
      setDictionaryToDelete(null);
      // TODO: remove the deleted dictionary from the view
    } else {
      console.error(`Failed to delete dictionary with ID ${id}`);
    }
  };

  const handleCreateDictionaryFormClose = () => {
    setShowCreateDictionaryForm(false);
  };

  const handleDeleteDictionaryClose = () => {
    setDictionaryToDelete(null);
  };

  const handleAddDictionaryClick = () => {
    setShowCreateDictionaryForm(true);
    const user_id = Cookies.get("user_id");
    if (!user_id) {
      console.error("Invalid user ID.");
      return;
    }

    setDictionaryFormData({
      name: "",
      user_id: parseInt(user_id, 10),
    });
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
                <Button onClick={() => handleDeleteDictionary(dictionary)}>
                  Delete
                </Button>
              </div>
            </ModalActions>
          </ModalContent>
        ))}
        <div style={{ display: "flex", alignItems: "center" }}>
          <AddButton onClick={handleAddDictionaryClick}>+</AddButton>
          <span style={{ marginLeft: "10px" }}>Add Dictionary</span>
        </div>
        {showCreateDictionaryForm && (
          <div>
            <form
              className={styles.modalForm}
              onSubmit={handleCreateDictionaryFormSubmit}
              style={{ marginTop: "20px" }}
            >
              <Button
                onClick={handleCreateDictionaryFormClose}
                style={{ width: "5vw" }}
              >
                <FontAwesomeIcon icon={faArrowLeft} size={"1x"} />
              </Button>
              <label htmlFor="name">Dictionary Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dictionaryFormData.name}
                onChange={handleCreateDictionaryInputChange}
              />
              <button type="submit">Create Dictionary</button>
            </form>
          </div>
        )}

        {dictionaryToDelete && (
          <DeleteDictionaryPrompt
            dictionary={dictionaryToDelete}
            onClose={handleDeleteDictionaryClose}
            onSubmit={handleDeleteDictionarySubmit}
          />
        )}
      </>
    );
  };

  const renderSectionsAndEntries = () => {
    if (!userData || !currentDictionary) {
      return <></>;
    }

    const sections = userData.sections.filter(
      (section) => section.dictionary_id === currentDictionary.id
    );

    return (
      <ModalContent>
        <ModalSubTitle>{currentDictionary.name}</ModalSubTitle>
        {sections.map((section: Section) => {
          const entries = userData.entries.filter(
            (entry) => entry.section_id === section.id
          );

          return (
            <div key={section.id}>
              <ModalActions style={{ paddingTop: "3vh" }}>
                <ModalSubTitle>{section.name}</ModalSubTitle>
                <div>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </div>
              </ModalActions>
              <KeyMappingsTable>
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
                  {entries.map((entry: KeyMapping) => (
                    <KeyMappingsRow key={`${entry.keymap}-${entry.mode}`}>
                      <TableCell width="20%">{entry.keymap}</TableCell>
                      <TableCell width="30%">{entry.description}</TableCell>
                      <TableCell>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </TableCell>
                    </KeyMappingsRow>
                  ))}
                  <tr>
                    <td
                      colSpan={3}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <AddButton>+</AddButton>
                      <span style={{ marginLeft: "10px" }}>Add Entry</span>
                    </td>
                  </tr>
                </tbody>
              </KeyMappingsTable>
            </div>
          );
        })}
        <div style={{ display: "flex", alignItems: "center" }}>
          <AddButton style={{ marginTop: "3vh" }}>+</AddButton>
          <span style={{ marginLeft: "10px" }}>Add Section</span>
        </div>
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
