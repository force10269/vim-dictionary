import React, { useState } from "react";

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
    if (name === dictionary.name) {
      onSubmit(dictionary.id);
    } else {
      alert("The name you entered did not match the dictionary name.");
    }
  };

  return (
    <div>
      <h2>
        In order to delete this dictionary, please type in the name of the
        dictionary:
        {dictionary.name}
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleChange} />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DeleteDictionaryPrompt;
