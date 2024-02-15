import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetUserDataQuery } from '../../../store/services/userApi';
import CropPhotoModal from './CropPhotoModal';
import ProfilePhotoModal from './ProfilePhotoModal';
import DeleteConfirmation from './DeleteConfirmation';
import AddPhotoModal from './AddPhotoModal';
import Toast from '../../Toast/Toast';
import { ReactComponent as Avatar } from '../../../assets/img/icons/user-profile/Avatar.svg';
import { ReactComponent as EditPencil } from '../../../assets/img/icons/user-profile/edit_pencil.svg';
import { useModalToggle } from '../../modals/CustomModal/customModalHook';
import { onCrop, onFile } from './utils/avatarUtils';

import styles from '../userHead.module.scss';

export default function UserAvatar({ data }) {
  const { refetch } = useGetUserDataQuery();
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);

  const [isModalOpen, toggleModal, setIsModalOpen] = useModalToggle(false);
  const [isModalOpen2, togglenModa2] = useModalToggle(false);
  const [isProfilePhotoModal, toggleProfilePhotoModal] = useModalToggle(false);
  const [isDeleteConfirmationModal, toggleDeleteConfirmationModal] = useModalToggle(false);

  const [image, setImage] = useState(null);

  const [cropDetails, setCropDetails] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, SetShowErrorToast] = useState(false);
  const [avatarID, setAvatarId] = useState(null ?? data?.profile_picture?.id);
  const [avatarData, setAvatarData] = useState(
    data?.profile_picture
      ? `${process.env.REACT_APP_API_BASE_URL}${data?.profile_picture.image}`
      : null
  );

  const onCropComplete = (_, croppedAreaPixels) => {
    setCropDetails(croppedAreaPixels);
  };

  const onFileChange = (e) => {
    try {
      onFile(e, setImage);
    } catch (error) {
      setImage(null)
      console.error('UserAvatar', error.message);
      togglenModa2();
      SetShowErrorToast(true);
      setTimeout(() => {
        SetShowErrorToast(false);
      }, 5000);
    }
  };

  const onCropImage = () => {
    onCrop(image, cropDetails, handleUploadAvatar);
  };

  const handleUploadAvatar = (file) => {
    if (!file) {
      console.error('Оберіть зображення ');
      return;
    }

    const formData = new FormData();
    formData.append('image', file, 'cropped_image.jpg');

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/upload_img/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${authToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setAvatarData(data.image);
        console.log('Success: photo ', data.image);
        setAvatarId(data.id)
        setIsModalOpen(false);
        togglenModa2();
        setShowSuccessToast(true);

        setTimeout(() => {
          setShowSuccessToast(false);
        }, 5000);
      })
      .then(() => refetch())
      .catch((error) => {
        console.error('Error :', error);
      });
  };

  return (
    <>
      <div className={styles.user__head__avatar}>
        {avatarData ? (
          <img
            src={avatarData}
            className={styles.avatar_img}
            onClick={toggleProfilePhotoModal}
          />
        ) : (
          <Avatar  onClick={toggleModal} className={styles.avatar_svg} />
        )}
        <EditPencil onClick={avatarData ? toggleProfilePhotoModal : toggleModal} className={styles.pencil} />
        {showSuccessToast && (
          <Toast
            message='Ваші зміни були успішно збережені'
            duration={3000}
          />
        )}
        {showErrorToast && (
          <Toast
            message='Розмір фото має бути від 3 кб до 5 Мб. Будь ласка, оберіть інше'
            duration={4000}
            error={'error'}
          />
        )}
        <AddPhotoModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          togglenModa2={togglenModa2}
          onFileChange={onFileChange}
          isModalOpen2={isModalOpen2}
          setShowErrorToast={SetShowErrorToast}
        />
      </div>

      <CropPhotoModal
        isModalOpen2={isModalOpen2}
        togglenModa2={togglenModa2}
        image={image}
        onCropImage={onCropImage}
        onCropComplete={onCropComplete}
        onFileChange={onFileChange}
        setShowErrorToast={SetShowErrorToast}
      />
      <ProfilePhotoModal
        isModalOpen={isProfilePhotoModal}
        toggleModal={toggleProfilePhotoModal}
        togglenModa2={togglenModa2}
        onFileChange={onFileChange}
        isModalOpen2={isModalOpen2}
        image={avatarData}
        toggleDeleteConfirmationModal={toggleDeleteConfirmationModal}
      />
      <DeleteConfirmation
        isModalOpen={isDeleteConfirmationModal}
        toggleModal={toggleDeleteConfirmationModal}
        avatarID={avatarID}
        setAvatarData={setAvatarData}
        refetch={refetch}
      />
    </>
  );
}
