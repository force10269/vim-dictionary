import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import styles from "@/styles/Modal.module.css";

interface EntriesModalProps {
  show: boolean;
  onClose: () => void;
}

const EntriesModal: React.FC<EntriesModalProps> = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.modal} style={{ display: show ? "flex" : "none" }}>
      {loading ? (
        <LoadingOverlay message="Processing..." />
      ) : (
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <h2 className={styles.modalHeader}>Personal Entries</h2>
        </div>
      )}
    </div>
  );
};

export default EntriesModal;
