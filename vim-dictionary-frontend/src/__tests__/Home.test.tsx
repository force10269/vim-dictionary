import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("renders Vim Dictionary title", () => {
    const title = screen.getByText(/Vim Dictionary/i);
    expect(title).toBeInTheDocument();
  });

  test("renders mode select and changes its value", () => {
    const modeSelect = screen.getByLabelText("Mode:");
    expect(modeSelect).toBeInTheDocument();
    fireEvent.change(modeSelect, { target: { value: "visual" } });
    expect(modeSelect).toHaveValue("visual");
  });

  test("renders search input and types a key", () => {
    const searchInput = screen.getByPlaceholderText("Type keymap (e.g. dd)");
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, "a");
    expect(searchInput).toHaveValue("a");
  });

  test("renders global search input and types a search term", () => {
    const globalSearchInput = screen.getByPlaceholderText("Global search...");
    expect(globalSearchInput).toBeInTheDocument();
    userEvent.type(globalSearchInput, "delete");
    expect(globalSearchInput).toHaveValue("delete");
  });
});

