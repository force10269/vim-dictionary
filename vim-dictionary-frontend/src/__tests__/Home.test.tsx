import { render, fireEvent, screen, act } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Home />);
    });
  });

  test("renders Vim Dictionary title", () => {
    const title = screen.getByText(/Vim Dictionary/i);
    expect(title).toBeInTheDocument();
  });

  test("renders search input and types a key", () => {
    const searchInput = screen.getByPlaceholderText("Type keymap (e.g. dd)");
    expect(searchInput).toBeInTheDocument();
    fireEvent.keyDown(searchInput, { key: "a" });
    expect(searchInput).toHaveValue("a");
  });

  test("renders global search input and types a search term", async () => {
    const globalSearchInput = screen.getByPlaceholderText("Global search...");
    expect(globalSearchInput).toBeInTheDocument();
    fireEvent.change(globalSearchInput, { target: { value: "delete" } });
    expect(globalSearchInput).toHaveValue("delete");
  });

  test("renders clear button and clears search input", () => {
    const clearButton = screen.getByText("Clear");
    expect(clearButton).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Type keymap (e.g. dd)");
    fireEvent.keyDown(searchInput, { key: "a" });
    expect(searchInput).toHaveValue("a");

    fireEvent.click(clearButton);
    expect(searchInput).toHaveValue("");
  });

  test("renders github link and validates url", () => {
    const githubLink = screen.getByRole("link");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.getAttribute("href")).toBe(
      "https://github.com/force10269/vim-dictionary"
    );
  });

  test("filters key mappings", () => {
    const rowsBeforeFilter = screen.getAllByRole("row");

    const searchInput = screen.getByPlaceholderText("Type keymap (e.g. dd)");
    fireEvent.keyDown(searchInput, { key: "a" });

    const rowsAfterFilter = screen.getAllByRole("row");
    expect(rowsAfterFilter.length).toBeLessThan(rowsBeforeFilter.length);
  });
});
