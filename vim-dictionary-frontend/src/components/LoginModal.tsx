import React, { useState } from "react";
import Cookies from "js-cookie";
import LoadingOverlay from "./LoadingOverlay";
import styles from "@/styles/Modal.module.css";
import { loginUser } from "../services/userService";

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

interface LoginData {
  username: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginData: LoginData = {
        username: username,
        password: password,
      };
      const response = await loginUser(loginData);
      if (!response.token) {
        setErrorMessage("Incorrect login");
        return;
      }

      Cookies.set("token", response.token, {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user_id", response.user_id.toString(), {
        secure: true,
        sameSite: "Strict",
      });
      onLoginSuccess();
      onClose();
    } catch (error) {
      setErrorMessage("Some error happened");
    } finally {
      setLoading(false);
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className={styles.modal} style={{ display: show ? "flex" : "none" }}>
      {loading ? (
        <LoadingOverlay message="Processing..." />
      ) : (
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <h2 className={styles.modalHeader}>Login</h2>
          {errorMessage && (
            <div className={styles.errorMessage}>
              <span>{errorMessage}</span>
              <button
                className={styles.errorCloseButton}
                onClick={clearErrorMessage}
              >
                &times;
              </button>
            </div>
          )}
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="login_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="login_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
