import React, { useState } from "react";
import {
  AddPromptContainer,
  AddPromptContent,
} from "@/styles/AddDictionaryPrompt.module";
import { Button } from "@/styles/EntriesModal.module";
import styles from "@/styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface DictionaryFormData {
  name: string;
  user_id: number;
}

interface AddDictionaryPromptProps {
  user_id: number;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    dictionaryFormData: DictionaryFormData
  ) => void;
}

const AddDictionaryPrompt: React.FC<AddDictionaryPromptProps> = ({
  user_id,
  onClose,
  onSubmit,
}) => {
  const [dictionaryFormData, setDictionaryFormData] =
    useState<DictionaryFormData>({ name: "", user_id: user_id });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDictionaryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!dictionaryFormData.name || dictionaryFormData.name.length < 3) {
      alert("Please enter a valid dictionary name (at least 3 characters long).");
      return;
    }

    try {
      onSubmit(event, dictionaryFormData);
      onClose();
    } catch (err) {
      console.error("Failed to create dictionary", err);
      alert("Failed to create dictionary. Please try again later.");
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
            <label htmlFor="name">Dictionary Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={dictionaryFormData.name}
              onChange={handleChange}
            />
            <button type="submit">Create Dictionary</button>
          </form>
        </div>
      </AddPromptContent>
    </AddPromptContainer>
  );
};

export default AddDictionaryPrompt;
