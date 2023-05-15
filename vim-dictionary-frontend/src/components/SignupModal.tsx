import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import styles from "@/styles/Modal.module.css";
import { registerUser } from "../services/userService";

interface SignupModalProps {
  show: boolean;
  onClose: () => void;
  onSignupSuccess: () => void;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

const SignupModal: React.FC<SignupModalProps> = ({
  show,
  onClose,
  onSignupSuccess,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const registerData: RegisterData = {
        username: username,
        password: password,
        email: email,
      };
      const result = await registerUser(registerData);
      if (!result) {
        setErrorMessage("Error signing up");
        return;
      }

      onSignupSuccess();
      onClose();
    } catch (error) {
      setErrorMessage("Some error occurred.");
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
          <h2 className={styles.modalHeader}>Sign Up</h2>
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
              id="sign_up_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="sign_up_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="sign_up_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default SignupModal;
