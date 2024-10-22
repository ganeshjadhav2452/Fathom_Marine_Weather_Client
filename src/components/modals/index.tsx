import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalHeading: string;
}

const AddCityModal: React.FC<ModalProps> = ({
  isOpen = true,
  onClose,
  children,
  modalHeading,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h3>{modalHeading}</h3>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default AddCityModal;
