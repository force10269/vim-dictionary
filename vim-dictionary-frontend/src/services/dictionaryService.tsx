import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface DictionaryData {
  name: string;
  user_id: number;
}

export async function createDictionary(data: DictionaryData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/dictionaries`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getDictionary(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/dictionaries/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getDictionariesByUserId(user_id: number) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/dictionaries/user/${user_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function updateDictionary(data: DictionaryData, id: number) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/dictionaries/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function deleteDictionary(id: number) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/dictionaries/${id}`
    );
    return response.status === 204;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}
