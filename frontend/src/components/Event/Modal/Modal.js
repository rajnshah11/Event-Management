import React from "react";
import { useSelector } from "react-redux";
import "./Modal.css";

const Modal = ({ title, canCancel, canConfirm, onCancel, onConfirm, confirmText, children }) => {
  const token = useSelector((state) => state.auth.token);
  const isAuthorized = !!token;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h1>{title}</h1>
        </header>
        <section className="modal-content">{children}</section>
        <section className="modal-actions">
          {canCancel && (
            <button className="btn btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          {canConfirm && isAuthorized && (
            <button className="btn btn-confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Modal;