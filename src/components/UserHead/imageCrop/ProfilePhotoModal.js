import { useState } from 'react';
import { ReactComponent as AddPhoto } from '../../../assets/img/icons/add-photo-icon/image-gallery-plus.svg';
import { ReactComponent as CloseIcon } from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import { ReactComponent as Trash } from '../../../assets/img/icons/crop-image-controls/trash-bucket.svg';
import BlueButton from "../../buttons/blueButton/BlueButton";
import CustomModal from "../../modals/CustomModal";

import styles from '../userHead.module.scss';

export default function ProfilePhotoModal({ isModalOpen,
    toggleModal,
    togglenModa2,
    onFileChange,
    image,
    toggleDeleteConfirmationModal
}) {
    const handleFileChange = (event) => {
        onFileChange(event);

    };
    const handleUploadButtonClick = () => {

        document.getElementById('fileInput').click();
        toggleModal()
    };

    const handleFileInputChange = () => {
        togglenModa2();
    };
    const toggleDelete = () => {
        toggleModal()
        toggleDeleteConfirmationModal()
    }
    return (
        <CustomModal isOpen={isModalOpen} onClose={toggleModal} additionalStyles={styles.modal}>
            <div className={styles.modal__header}>
                <h2 className={styles.modal__header__title}>Profile Photo</h2>
                <CloseIcon className={styles.modal__header__icon} onClick={toggleModal} />
            </div>


            <div className={styles.profile__photo}>
                <img className={styles.profile__photo__image} src={image} alt='user profile photo' />
            </div>


            <div className={styles.profile__modal__footer}>
 
                <div 
                    className={styles.custom_file_input} 
                >
                    <a onClick={toggleDelete}><Trash /> Delete photo</a>
                    {/* <input type="file" name="file" accept="image/*" onChange={onFileChange} /> */}
                </div>

                <div className={styles.upload}>
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
                        text={'Upload photo'}
                        additionalStyles={styles.blueButtonStyles}
                        onClick={handleUploadButtonClick}
                    >
                        <AddPhoto />
                    </BlueButton>
                </div>

            </div>

        </CustomModal>
    )
}
