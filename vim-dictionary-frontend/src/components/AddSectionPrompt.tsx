import React, { useState } from "react";
import {
  AddPromptContainer,
  AddPromptContent,
} from "@/styles/AddDictionaryPrompt.module";
import { Button } from "@/styles/EntriesModal.module";
import styles from "@/styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface SectionFormData {
  name: string;
  dictionary_id: number;
}

interface AddSectionPromptProps {
  dictionary_id: number;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    sectionFormData: SectionFormData
  ) => void;
}

const AddSectionPrompt: React.FC<AddSectionPromptProps> = ({
  dictionary_id,
  onClose,
  onSubmit,
}) => {
  const [sectionFormData, setSectionFormData] = useState<SectionFormData>({
    name: "",
    dictionary_id: dictionary_id,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSectionFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sectionFormData.name || sectionFormData.name.length < 3) {
      alert("Please enter a valid section name (at least 3 characters long).");
      return;
    }

    try {
      onSubmit(event, sectionFormData);
      onClose();
    } catch (err) {
      console.error("Failed to create section", err);
      alert("Failed to create section. Please try again later.");
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
            <label htmlFor="name">Section Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={sectionFormData.name}
              onChange={handleChange}
            />
            <button type="submit">Create Section</button>
          </form>
        </div>
      </AddPromptContent>
    </AddPromptContainer>
  );
};

export default AddSectionPrompt;
