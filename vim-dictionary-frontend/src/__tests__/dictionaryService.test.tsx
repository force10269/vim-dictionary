import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  createDictionary,
  getDictionary,
  getDictionariesByUserId,
  updateDictionary,
  deleteDictionary,
} from "@/services/dictionaryService";

const mock = new MockAdapter(axios);
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface DictionaryData {
  name: string;
  user_id: number;
}

describe("dictionaryService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("createDictionary", async () => {
    const data = {
      name: "Test Dictionary",
      user_id: 1,
    };

    mock
      .onPost(`${API_BASE_URL}/api/dictionaries`)
      .reply(201, { message: "Dictionary created" });

    const response = await createDictionary(data);
    expect(response.message).toBe("Dictionary created");
  });

  test("getDictionary", async () => {
    const dictionaryId = 1;

    const dictionaryData = {
      id: dictionaryId,
      name: "Test Dictionary",
      user_id: 1,
    };

    mock
      .onGet(`${API_BASE_URL}/api/dictionaries/${dictionaryId}`)
      .reply(200, dictionaryData);

    const response = await getDictionary(dictionaryId);
    expect(response).toEqual(dictionaryData);
  });

  test("getDictionariesByUserId", async () => {
    const userId = 1;

    const dictionariesData = [
      {
        id: 1,
        name: "Test Dictionary 1",
        user_id: userId,
      },
      {
        id: 2,
        name: "Test Dictionary from the user that are unrelated to the response 2",
        user_id: userId,
      },
    ];

    mock
      .onGet(`${API_BASE_URL}/api/dictionaries/user/${userId}`)
      .reply(200, dictionariesData);

    const response = await getDictionariesByUserId(userId);
    expect(response).toEqual(dictionariesData);
  });

  test("updateDictionary", async () => {
    const dictionaryData: DictionaryData = {
      user_id: 1,
      name: "Updated Test DictionarY",
    };
    const dictionaryId: number = 1;

    mock
      .onPut(`${API_BASE_URL}/api/dictionaries/${dictionaryId}`)
      .reply(200, { message: "Dictionary updated" });

    const response = await updateDictionary(dictionaryData, dictionaryId);
    expect(response.message).toBe("Dictionary updated");
  });

  test("deleteDictionary", async () => {
    const dictionaryId = 1;

    mock
      .onDelete(`${API_BASE_URL}/api/dictionaries/${dictionaryId}`)
      .reply(204);

    const response = await deleteDictionary(dictionaryId);
    expect(response).toBe(true);
  });
});
