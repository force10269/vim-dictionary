import React, { ReactNode } from "react";
import styles from "@/styles/Modal.module.css";

interface ModalProps {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
