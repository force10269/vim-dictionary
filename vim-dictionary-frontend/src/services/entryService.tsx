import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface EntryData {
  keymap: string;
  description: string;
  mode: string;
  section_id: number;
}

export async function createEntry(data: EntryData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/entries`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getEntry(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/entries/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getAllEntries() {
  try {
    const response = await axios.get(`${API_BASE_URL}/entries`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function updateEntry(data: EntryData, id: number) {
  try {
    const response = await axios.put(`${API_BASE_URL}/entries/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function deleteEntry(id: number) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/entries/${id}`);
    return response.status === 204;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}
