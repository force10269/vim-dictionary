import React, { useState } from "react";
import { Dictionary } from "@/services/userService";
import {
  DeletePromptContainer,
  DeletePromptContent,
  DeletePromptButton,
  Input,
} from "@/styles/DeleteDictionaryPrompt.module";

interface DeleteDictionaryPromptProps {
  dictionary: Dictionary;
  onClose: () => void;
  onSubmit: (id: number) => void;
}

const DeleteDictionaryPrompt: React.FC<DeleteDictionaryPromptProps> = ({
  dictionary,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name !== dictionary.name) {
      alert("The name you entered did not match the dictionary name.");
      return;
    }

    try {
      onSubmit(dictionary.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete dictionary", err);
      alert("Failed to delete dictionary. Please try again later.");
    }
  };

  return (
    <DeletePromptContainer>
      <DeletePromptContent>
        <h2>
          In order to delete this dictionary, please type in the name of the
          dictionary:
          <br />
          <strong>{dictionary.name}</strong>
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

export default DeleteDictionaryPrompt;
