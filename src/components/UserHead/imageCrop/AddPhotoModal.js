import { useState } from 'react';
import { ReactComponent as Avatar } from '../../../assets/img/icons/add-photo-icon/add-photo-avatar.svg';
import { ReactComponent as AddPhoto } from '../../../assets/img/icons/add-photo-icon/image-gallery-plus.svg';
import { ReactComponent as CloseIcon } from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import BlueButton from "../../buttons/BlueButton/BlueButton";
import CustomModal from "../../modals/CustomModal/CustomModal";

import styles from '../userHead.module.scss';

export default function AddPhotoModal({
  isModalOpen,
  toggleModal,
  togglenModa2,
  onFileChange,
  setShowErrorToast
}) {

  const handleFileChange = (event) => {
    try {
      onFileChange(event);
    } catch (error) {

      console.error('addPhotoModal', error.message);
      togglenModa2();
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 5000);
    }
  };

  const handleUploadButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileInputChange = () => {

    togglenModa2();
  };

  return (
    <CustomModal isOpen={isModalOpen} onClose={toggleModal} additionalStyles={styles.modal}>
      <div className={styles.modal__header}>
        <h2 className={styles.modal__header__title}>Додавання фото</h2>
        <CloseIcon className={styles.modal__header__icon} onClick={toggleModal} />
      </div>

      <div className={styles.modal__main}>
        <div className={styles.modal__main__avatar}><Avatar /></div>
        <p className={styles.modal__main__text}>
          Допустимі типи файлів для завантаження (JPEG, JPG, PNG). Максимальний розмір файлу не повинен перевищувати 5 МБ.
        </p>
      </div>

      <div className={styles.modal__footer}>
        <input
          id='fileInput'
          type='file'
          accept='.jpg, .jpeg, .png'
          onChange={handleFileChange}
          style={{ display: 'none' }}
          onClick={(event) => event.target.value = null}
          onInput={handleFileInputChange}
        />
        <BlueButton
          text={'Завантажити '}
          additionalStyles={styles.blueButtonStyles}
          onClick={handleUploadButtonClick}
        >
          <AddPhoto />
        </BlueButton>
      </div>
    </CustomModal>
  );
}
