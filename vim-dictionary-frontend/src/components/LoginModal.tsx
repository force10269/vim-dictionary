import React, { useState } from "react";
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const loginData: LoginData = {
        username: username,
        password: password,
      };
      const result = await loginUser(loginData);
      if (!result) {
        setErrorMessage(result.message);
        return;
      }

      onLoginSuccess();
      onClose();
    } catch (error) {
      setErrorMessage("Some error happened");
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className={styles.modal} style={{ display: show ? "flex" : "none" }}>
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
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
