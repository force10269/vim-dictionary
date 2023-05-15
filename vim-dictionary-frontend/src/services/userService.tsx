import axios from "axios";

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

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, data);
    return response;
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
  const token = sessionStorage.getItem("token");

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
