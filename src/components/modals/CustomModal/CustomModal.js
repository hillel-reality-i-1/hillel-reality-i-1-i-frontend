import modalStyles from './customModal.module.scss';

export default function CustomModal({ isOpen, onClose, additionalStyles,  children }) {
  return (
    <div className={`${modalStyles.modal} ${isOpen ? modalStyles.open : ''}`}>
      <div className={modalStyles.modalOverlay} onClick={onClose}></div>
      <div className={`${modalStyles.modalContent} ${additionalStyles}`} >
        {children}
      </div>
    </div>
  );
}
