import React, { useState } from "react";
import {
  EditPromptContainer,
  EditPromptContent,
} from "@/styles/EditDictionaryPrompt.module";
import { Button } from "@/styles/EntriesModal.module";
import styles from "@/styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Section } from "@/services/userService";

interface EditSectionPromptProps {
  section: Section;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    sectionFormData: Section
  ) => void;
}

const EditSectionPrompt: React.FC<EditSectionPromptProps> = ({
  section,
  onClose,
  onSubmit,
}) => {
  const [sectionFormData, setSectionFormData] = useState<Section>(section);

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
            <label htmlFor="name">Section Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={sectionFormData.name}
              onChange={handleChange}
            />
            <button type="submit">Update Section</button>
          </form>
        </div>
      </EditPromptContent>
    </EditPromptContainer>
  );
};

export default EditSectionPrompt;
