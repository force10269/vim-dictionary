export const keyMappings = [
  { key: "i", mode: "normal", description: "Insert before the cursor" },
  { key: "a", mode: "normal", description: "Insert after the cursor" },
  {
    key: "o",
    mode: "normal",
    description: "Open a new line below the cursor and enter insert mode",
  },
  {
    key: "O",
    mode: "normal",
    description: "Open a new line above the cursor and enter insert mode",
  },
  {
    key: "w",
    mode: "normal",
    description: "Move the cursor to the beginning of the next word",
  },
  {
    key: "b",
    mode: "normal",
    description: "Move the cursor to the beginning of the previous word",
  },
  {
    key: "e",
    mode: "normal",
    description: "Move the cursor to the end of the current word",
  },
  { key: "yy", mode: "normal", description: "Copy the current line" },
  { key: "dd", mode: "normal", description: "Delete the current line" },
  {
    key: "p",
    mode: "normal",
    description: "Paste the last deleted or yanked text after the cursor",
  },
  { key: "u", mode: "normal", description: "Undo the last change" },
  { key: "Ctrl+r", mode: "normal", description: "Redo the last undone change" },
  { key: "v", mode: "normal", description: "Enter visual mode" },
  { key: ":", mode: "normal", description: "Enter command-line mode" },
];
