import React, { useState } from "react";
import { Section } from "@/services/userService";
import {
  DeletePromptContainer,
  DeletePromptContent,
  DeletePromptButton,
  Input,
} from "@/styles/DeleteDictionaryPrompt.module";

interface DeleteSectionPromptProps {
  section: Section;
  onClose: () => void;
  onSubmit: (id: number) => void;
}

const DeleteSectionPrompt: React.FC<DeleteSectionPromptProps> = ({
  section,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name !== section.name) {
      alert("The name you entered did not match the section name.");
      return;
    }

    try {
      onSubmit(section.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete section", err);
      alert("Failed to delete section. Please try again later.");
    }
  };

  return (
    <DeletePromptContainer>
      <DeletePromptContent>
        <h2>
          In order to delete this section, please type in the name of the
          section:
          <br />
          <strong>{section.name}</strong>
        </h2>
        <form onSubmit={handleSubmit}>
          <Input type="text" value={name} onChange={handleChange} />
          <DeletePromptButton type="submit">Submit</DeletePromptButton>
          <DeletePromptButton type="button" onClick={onClose}>
            Cancel
          </DeletePromptButton>
        </form>
      </DeletePromptContent>
    </DeletePromptContainer>
  );
};

export default DeleteSectionPrompt;
