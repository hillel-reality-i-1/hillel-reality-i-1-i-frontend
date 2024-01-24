import CustomModal from "../../modals/CustomModal/CustomModal";
import { ReactComponent as CloseIcon } from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import ImageCrop from "./ImageCrop";

import styles from '../userHead.module.scss';

export default function CropPhotoModal({ isModalOpen2, togglenModa2, image, onCropImage, onCropComplete, onFileChange }) {
  return (
    <CustomModal isOpen={isModalOpen2} onClose={togglenModa2} additionalStyles={styles.modal}>
      <div className={styles.modal__header}>
        <h2 className={styles.modal__header__title}>Редагування фото</h2>
        <CloseIcon className={styles.modal__header__icon} onClick={togglenModa2} />
      </div>
      <ImageCrop  image={image} onCropImage={onCropImage} onCropComplete={onCropComplete} onFileChange={onFileChange} />

    </CustomModal>
  );
}
