import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SectionData {
  name: string;
  dictionary_id: number;
}

export async function createSection(data: SectionData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/sections`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getSection(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sections/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getSectionsByDictionaryId(dictionary_id: number) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/sections/dictionary/${dictionary_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getAllSections() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sections`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function updateSection(data: SectionData, id: number) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/sections/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function deleteSection(id: number) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/sections/${id}`);
    return response.status === 204;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}
