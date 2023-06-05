import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

interface LoginData {
  username: string;
  password: string;
}

export interface Dictionary {
  id: number;
  name: string;
  user_id: number;
}

export interface Section {
  id: number;
  name: string;
  dictionary_id: number;
}

export interface KeyMapping {
  id: number;
  section_id: number;
  keymap: string;
  mode: string;
  description: string;
}

export interface UserData {
  dictionaries: Dictionary[];
  sections: Section[];
  entries: KeyMapping[];
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function loginUser(data: LoginData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function logoutUser() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/logout`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function validateToken(): Promise<boolean> {
  const token = Cookies.get("token");

  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/validate_token`,
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Failed to validate:", error);
    return false;
  }
}

export async function getUserData(user_id: string): Promise<UserData> {
  // const cachedData = localStorage.getItem("user_data");
  //
  // if (cachedData) {
  //   return JSON.parse(cachedData);
  // }

  const response = await axios.get(`${API_BASE_URL}/api/user_data/${user_id}`);
  const userData: UserData = {
    dictionaries: response.data.dictionaries,
    sections: response.data.sections,
    entries: response.data.entries,
  };

  localStorage.setItem("user_data", JSON.stringify(userData));

  return userData;
}
