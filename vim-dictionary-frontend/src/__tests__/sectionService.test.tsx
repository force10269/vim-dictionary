import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  createSection,
  getSection,
  getSectionsByDictionaryId,
  updateSection,
  deleteSection,
} from "@/services/sectionService";

const mock = new MockAdapter(axios);
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface SectionData {
  name: string;
  dictionary_id: number;
}

describe("sectionService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("createSection", async () => {
    const data = {
      name: "Test Section",
      dictionary_id: 1,
    };

    mock
      .onPost(`${API_BASE_URL}/api/sections`)
      .reply(201, { message: "Section created" });

    const response = await createSection(data);
    expect(response.message).toBe("Section created");
  });

  test("getSection", async () => {
    const sectionId = 1;

    const sectionData = {
      id: sectionId,
      name: "Test Section",
      user_id: 1,
    };

    mock
      .onGet(`${API_BASE_URL}/api/sections/${sectionId}`)
      .reply(200, sectionData);

    const response = await getSection(sectionId);
    expect(response).toEqual(sectionData);
  });

  test("getSectionsByDictionaryId", async () => {
    const dictionaryId = 1;

    const sectionsData = [
      {
        id: 1,
        name: "Test Section 1",
        dictionary_id: dictionaryId,
      },
      {
        id: 2,
        name: "Test Section from the user that are unrelated to the response 2",
        dictionary_id: dictionaryId,
      },
    ];

    mock
      .onGet(`${API_BASE_URL}/api/sections/dictionary/${dictionaryId}`)
      .reply(200, sectionsData);

    const response = await getSectionsByDictionaryId(dictionaryId);
    expect(response).toEqual(sectionsData);
  });

  test("updateSection", async () => {
    const sectionData: SectionData = {
      dictionary_id: 1,
      name: "Updated Test section",
    };
    const sectionId: number = 1;

    mock
      .onPut(`${API_BASE_URL}/api/sections/${sectionId}`)
      .reply(200, { message: "Section updated" });

    const response = await updateSection(sectionData, sectionId);
    expect(response.message).toBe("Section updated");
  });

  test("deleteSection", async () => {
    const sectionId = 1;

    mock.onDelete(`${API_BASE_URL}/api/sections/${sectionId}`).reply(204);

    const response = await deleteSection(sectionId);
    expect(response).toBe(true);
  });
});
