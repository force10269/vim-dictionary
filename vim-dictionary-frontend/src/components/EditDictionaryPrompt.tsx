import React, { useState } from "react";
import {
  EditPromptContainer,
  EditPromptContent,
} from "@/styles/EditDictionaryPrompt.module";
import { Button } from "@/styles/EntriesModal.module";
import styles from "@/styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Dictionary } from "@/services/userService";

interface EditDictionaryPromptProps {
  dictionary: Dictionary;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    dictionaryFOrmData: Dictionary
  ) => void;
}

const EditDictionaryPrompt: React.FC<EditDictionaryPromptProps> = ({
  dictionary,
  onClose,
  onSubmit,
}) => {
  const [dictionaryFormData, setDictionaryFormData] =
    useState<Dictionary>(dictionary);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDictionaryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dictionaryFormData.name || dictionaryFormData.name.length < 3) {
      alert(
        "Please enter a valid dictionary name (at least 3 characters long)."
      );
      return;
    }

    try {
      onSubmit(event, dictionaryFormData);
      onClose();
    } catch (err) {
      console.error("Failed to update dictionary", err);
      alert("Failed to update dictionary. Please try again later.");
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
            <label htmlFor="name">Dictionary Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={dictionaryFormData.name}
              onChange={handleChange}
            />
            <button type="submit">Update Dictionary</button>
          </form>
        </div>
      </EditPromptContent>
    </EditPromptContainer>
  );
};

export default EditDictionaryPrompt;
