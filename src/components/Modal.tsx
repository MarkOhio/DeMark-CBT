
import React from "react";
import type { ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ visible, onClose, children }: ModalProps) {
  if (!visible) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button> <br />
        {children}
      </div>
    </div>
  );
}
