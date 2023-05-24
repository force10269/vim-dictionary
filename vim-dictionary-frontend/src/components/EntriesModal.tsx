import React, { useState, useEffect } from "react";
import LoadingOverlay from "./LoadingOverlay";
import AddDictionaryPrompt from "./AddDictionaryPrompt";
import EditDictionaryPrompt from "./EditDictionaryPrompt";
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
  updateDictionary,
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
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
  const [currentDictionary, setCurrentDictionary] = useState<Dictionary | null>(
    null
  );
  const [showEditDictionaryForm, setShowEditDictionaryForm] = useState(false);
  const [dictionaryToEdit, setDictionaryToEdit] = useState<Dictionary | null>(
    null
  );

  useEffect(() => {
    if (userData) {
      setDictionaries(userData.dictionaries);
    }
  }, [userData]);

  const [showCreateDictionaryForm, setShowCreateDictionaryForm] =
    useState(false);

  const [dictionaryToDelete, setDictionaryToDelete] =
    useState<Dictionary | null>(null);

  const handleViewDictionary = (dictionary: Dictionary) => {
    setCurrentDictionary(dictionary);
  };

  const handleDeleteDictionary = (dictionary: Dictionary) => {
    setDictionaryToDelete(dictionary);
  };

  const handleCreateDictionaryFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    dictionaryFormData: DictionaryFormData
  ) => {
    event.preventDefault();
    const response = await createDictionary(dictionaryFormData);
    const newDictionary = {
      id: response.id,
      name: response.name,
      user_id: response.user_id,
    };
    setDictionaries((prev) => [...prev, newDictionary]);
    setShowCreateDictionaryForm(false);
  };

  const handleEditDictionaryFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    dictionaryFormData: Dictionary
  ) => {
    event.preventDefault();
    const response = await updateDictionary(
      dictionaryFormData,
      dictionaryFormData.id
    );
    if (response) {
      setDictionaries(
        dictionaries.map((dictionary) => {
          if (dictionary.id === response.id) {
            return response;
          }

          return dictionary;
        })
      );
    } else {
      console.error(`Failed to update dictionary with ID ${response.id}`);
    }
  };

  const handleDeleteDictionarySubmit = async (id: number) => {
    const success = await deleteDictionary(id);
    if (success) {
      setDictionaries((prev) => prev.filter((dict) => dict.id !== id));
      setDictionaryToDelete(null);
    } else {
      console.error(`Failed to delete dictionary with ID ${id}`);
    }
  };

  const handleCreateDictionaryFormClose = () => {
    setShowCreateDictionaryForm(false);
  };

  const handleEditDictionaryFormClose = () => {
    setShowEditDictionaryForm(false);
    setDictionaryToEdit(null);
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

    setUserId(parseInt(user_id, 10));
  };

  const handleEditDictionaryClick = (dictionary: Dictionary) => {
    setDictionaryToEdit(dictionary);
    setShowEditDictionaryForm(true);
  };

  const renderDictionaries = () => {
    if (!userData) {
      return <></>;
    }

    return (
      <>
        {dictionaries.map((dictionary) => (
          <ModalContent key={dictionary.id}>
            <ModalActions>
              <ModalSubTitle>{dictionary.name}</ModalSubTitle>
              <div>
                <Button onClick={() => handleViewDictionary(dictionary)}>
                  View
                </Button>
                <Button onClick={() => handleEditDictionaryClick(dictionary)}>
                  Edit
                </Button>
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
          <AddDictionaryPrompt
            user_id={userId}
            onClose={handleCreateDictionaryFormClose}
            onSubmit={handleCreateDictionaryFormSubmit}
          />
        )}
        {showEditDictionaryForm && dictionaryToEdit && (
          <EditDictionaryPrompt
            dictionary={dictionaryToEdit}
            onClose={handleEditDictionaryFormClose}
            onSubmit={handleEditDictionaryFormSubmit}
          />
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
