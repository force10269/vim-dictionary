import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  createEntry,
  getEntry,
  getEntriesBySectionId,
  updateEntry,
  deleteEntry,
} from "@/services/entryService";

const mock = new MockAdapter(axios);
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface EntryData {
  keymap: string;
  description: string;
  mode: string;
  section_id: number;
}

describe("entryService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("createEntry", async () => {
    const data = {
      keymap: "i",
      description: "Test Entry",
      mode: "normal",
      section_id: 1,
    };

    mock
      .onPost(`${API_BASE_URL}/api/entries`)
      .reply(201, { message: "Entry created" });

    const response = await createEntry(data);
    expect(response.message).toBe("Entry created");
  });

  test("getEntry", async () => {
    const sectionId = 1;

    const entryData = {
      keymap: "i",
      description: "Test Entry",
      mode: "normal",
      section_id: 1,
    };

    mock
      .onGet(`${API_BASE_URL}/api/entries/${sectionId}`)
      .reply(200, entryData);

    const response = await getEntry(sectionId);
    expect(response).toEqual(entryData);
  });

  test("getEntriesBySectionId", async () => {
    const sectionId = 1;

    const entriesData = [
      {
        id: 1,
        keymap: "i",
        description: "Test Entry 1",
        mode: "normal",
        section_id: sectionId,
      },
      {
        id: 2,
        keymap: "i",
        description: "Test Entry 2",
        mode: "normal",
        section_id: sectionId,
      },
    ];

    mock
      .onGet(`${API_BASE_URL}/api/entries/section/${sectionId}`)
      .reply(200, entriesData);

    const response = await getEntriesBySectionId(sectionId);
    expect(response).toEqual(entriesData);
  });

  test("updateEntry", async () => {
    const entryData: EntryData = {
      keymap: "i",
      description: "Updated test entry",
      mode: "normal",
      section_id: 1,
    };

    const sectionId: number = 1;

    mock
      .onPut(`${API_BASE_URL}/api/entries/${sectionId}`)
      .reply(200, { message: "Entry updated" });

    const response = await updateEntry(entryData, sectionId);
    expect(response.message).toBe("Entry updated");
  });

  test("deleteEntry", async () => {
    const sectionId = 1;

    mock.onDelete(`${API_BASE_URL}/api/entries/${sectionId}`).reply(204);

    const response = await deleteEntry(sectionId);
    expect(response).toBe(true);
  });
});
