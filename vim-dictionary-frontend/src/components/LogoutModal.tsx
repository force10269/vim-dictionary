import React from "react";
import Cookies from "js-cookie";
import Modal from "./Modal";
import {
  ModalTitle,
  ModalContent,
  ModalActions,
  Button,
} from "@/styles/index.module";
import { logoutUser } from "../services/userService";

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onLogoutSuccess: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  show,
  onClose,
  onLogoutSuccess,
}) => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      Cookies.remove("token");
      onLogoutSuccess();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalTitle>Log Out</ModalTitle>
      <ModalContent>
        <p>Are you sure you want to log out?</p>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogout}>Log Out</Button>
      </ModalActions>
    </Modal>
  );
};

export default LogoutModal;
