import React, { useState } from "react";
import {
  EditPromptContainer,
  EditPromptContent,
} from "@/styles/EditDictionaryPrompt.module";
import { Button } from "@/styles/EntriesModal.module";
import styles from "@/styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { KeyMapping } from "@/services/userService";

interface EditEntryPromptProps {
  entry: KeyMapping;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    entryFormData: KeyMapping
  ) => void;
}

const EditEntryPrompt: React.FC<EditEntryPromptProps> = ({
  entry,
  onClose,
  onSubmit,
}) => {
  const [entryFormData, setEntryFormData] = useState<KeyMapping>(entry);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEntryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Entry edit validation

    try {
      onSubmit(event, entryFormData);
      onClose();
    } catch (err) {
      console.error("Failed to update entry", err);
      alert("Failed to update entry. Please try again later.");
    }
  };

  return (
    <EditPromptContainer>
      <EditPromptContent>
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
            <button type="submit">Update Entry</button>
          </form>
        </div>
      </EditPromptContent>
    </EditPromptContainer>
  );
};

export default EditEntryPrompt;
