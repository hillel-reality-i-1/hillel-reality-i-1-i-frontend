import modalStyles from "./customModal.module.scss";

export default function CustomModal({ isOpen, onClose, children }) {
  return (
    <div className={`${modalStyles.modal} ${isOpen ? modalStyles.open : ""}`}>
      <div className={modalStyles.modalOverlay} onClick={onClose}></div>
      <div className={modalStyles.modalContent}>
        {children}
        {/* <button className={modalStyles.modalClose} onClick={onClose}>
          Закрыть
        </button> */}
      </div>
    </div>
  );
}
