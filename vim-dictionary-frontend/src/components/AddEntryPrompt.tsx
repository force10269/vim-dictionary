import React, { useState } from "react";
import {
  AddPromptContainer,
  AddPromptContent,
} from "@/styles/AddDictionaryPrompt.module";
import { Button } from "@/styles/EntriesModal.module";
import styles from "@/styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface EntryFormData {
  keymap: string;
  description: string;
  mode: string;
  section_id: number;
}

interface AddEntryPromptProps {
  section_id: number;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    entryFormData: EntryFormData
  ) => void;
}

const AddEntryPrompt: React.FC<AddEntryPromptProps> = ({
  section_id,
  onClose,
  onSubmit,
}) => {
  const [entryFormData, setEntryFormData] = useState<EntryFormData>({
    keymap: "",
    description: "",
    mode: "Normal",
    section_id: section_id,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEntryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!entryFormData.keymap || !entryFormData.description) {
      alert("Please enter both the keymap and description fields.");
      return;
    }

    try {
      onSubmit(event, entryFormData);
      onClose();
    } catch (err) {
      console.error("Failed to create entry", err);
      alert("Failed to create entry. Please try again later.");
    }
  };

  return (
    <AddPromptContainer>
      <AddPromptContent>
        <div>
          <form
            className={styles.modalForm}
            onSubmit={handleSubmit}
            style={{ marginTop: "20px" }}
          >
            <Button onClick={onClose} style={{ width: "5vw" }}>
              <FontAwesomeIcon icon={faArrowLeft} size={"1x"} />
            </Button>
            <label htmlFor="keymap">Entry Keymap</label>
            <input
              type="text"
              id="keymap"
              name="keymap"
              value={entryFormData.keymap}
              onChange={handleChange}
            />
            <label htmlFor="description">Entry Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={entryFormData.description}
              onChange={handleChange}
            />
            <button type="submit">Create Entry</button>
          </form>
        </div>
      </AddPromptContent>
    </AddPromptContainer>
  );
};

export default AddEntryPrompt;
