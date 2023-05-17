import axios from "axios";
import Cookies from "js-cookie";
import MockAdapter from "axios-mock-adapter";
import { loginUser, registerUser, validateToken } from "@/services/userService";

const mock = new MockAdapter(axios);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

describe("userService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("registerUser", async () => {
    const data = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    mock
      .onPost(`${API_BASE_URL}/api/register`)
      .reply(201, { message: "User registered" });

    const response = await registerUser(data);
    if (response) {
      expect(response.status).toBe(201);
      expect(response.data.message).toBe("User registered");
    }
  });

  test("loginUser", async () => {
    const data = {
      username: "testuser",
      password: "testpassword",
    };

    mock
      .onPost(`${API_BASE_URL}/api/login`)
      .reply(200, { token: "test_token" });

    const response = await loginUser(data);
    expect(response.token).toBe("test_token");
  });

  test("validateToken", async () => {
    Cookies.set("token", "test_token");
    mock.onPost(`${API_BASE_URL}/api/validate_token`, undefined).reply(200);
    const isValid = await validateToken();
    Cookies.remove("token");

    expect(isValid).toBe(true);
  });
});
