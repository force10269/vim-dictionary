import React, { useState } from "react";
import { KeyMapping } from "@/services/userService";
import {
  DeletePromptContainer,
  DeletePromptContent,
  DeletePromptButton,
} from "@/styles/DeleteDictionaryPrompt.module";

interface DeleteEntryPromptProps {
  entry: KeyMapping;
  onClose: () => void;
  onSubmit: (id: number) => void;
}

const DeleteEntryPrompt: React.FC<DeleteEntryPromptProps> = ({
  entry,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      onSubmit(entry.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete entry", err);
      alert("Failed to delete entry. Please try again later.");
    }
  };

  return (
    <DeletePromptContainer>
      <DeletePromptContent>
        <h2>
          Are you sure you want to delete this entry?
          <br />
          <strong>{entry.keymap}</strong>
        </h2>
        <DeletePromptButton type="submit" onClick={handleSubmit}>
          Yes
        </DeletePromptButton>
        <DeletePromptButton type="button" onClick={onClose}>
          No
        </DeletePromptButton>
      </DeletePromptContent>
    </DeletePromptContainer>
  );
};

export default DeleteEntryPrompt;
