import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { useGetUserDataQuery } from '../../../store/services/userApi';
import CropPhotoModal from './CropPhotoModal';
import ProfilePhotoModal from './ProfilePhotoModal';
import DeleteConfirmation from './DeleteConfirmation';
import AddPhotoModal from './AddPhotoModal';
import Toast from '../../Toast/Toast';
import { ReactComponent as Avatar } from '../../../assets/img/icons/user-profile/Avatar.svg';
import { useModalToggle } from '../../modals/CustomModal/customModalHook';
import { onCrop, onFile } from './utils/avatarUtils';

import styles from '../userHead.module.scss';

export default function UserAvatar({data}) {
  const { refetch} = useGetUserDataQuery();
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);

  const [isModalOpen, toggleModal, setIsModalOpen] = useModalToggle(false);
  const [isModalOpen2, togglenModa2] = useModalToggle(false);
  const [isProfilePhotoModal, toggleProfilePhotoModal] = useModalToggle(false);
  const [isDeleteConfirmationModal, toggleDeleteConfirmationModal] = useModalToggle(false);

  const [image, setImage] = useState(null);

  const [cropDetails, setCropDetails] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // const [avatarID, setAvatarId] = useState(null);
  // const [avatarData, setAvatarData] = useState(null);

  // const [croppedImage, setCroppedImage] = useState(null);


  const [avatarID, setAvatarId] = useState(null ?? data.profile_picture?.id);
  const [avatarData, setAvatarData] = useState(
    data.profile_picture
      ? `${process.env.REACT_APP_API_BASE_URL}${data.profile_picture.image}`
      : null
  );
  
  // const fetchImageFromProfile = useCallback(async () => {
  //   try {
  //     const headers = {
  //       Authorization: `Token ${authToken}`,
  //     };
  //     const response = await axios.get(
  //       process.env.REACT_APP_API_BASE_URL + '/api/v1/files/images_by_user_id/66/',
  //       { headers }
  //     );
  //     console.log(response.data);
  //     setAvatarData('http://dmytromigirov.space' + response.data.image);
  //     setAvatarId(response.data.id);
  //     console.log(response.data.id);
  //   } catch (error) {
  //     setAvatarData(null);
  //     console.error('Error during fetch image from profile ', error);
  //   }
  // }, [authToken]);
  // useEffect(() => {
  //   fetchImageFromProfile();
  // }, [fetchImageFromProfile]);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCropDetails(croppedAreaPixels);
  };

  const onFileChange = (e) => {
    onFile(e, setImage);
  };

  const onCropImage = () => {
    onCrop(image, cropDetails, handleUploadAvatar);
  };

  // const onCropImage = () => {
  //   if (!cropDetails || !image) {
  //     console.error('Crop details or image not available.');
  //     return;
  //   }

  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');

  //   const targetSize = 200;
  //   const aspectRatio = cropDetails.width / cropDetails.height;

  //   let newWidth = targetSize;
  //   let newHeight = targetSize;

  //   if (aspectRatio > 1) {
  //     newHeight = targetSize / aspectRatio;
  //   } else {
  //     newWidth = targetSize * aspectRatio;
  //   }

  //   canvas.width = targetSize;
  //   canvas.height = targetSize;

  //   const img = new Image();
  //   img.src = image;

  //   ctx.drawImage(
  //     img,
  //     cropDetails.x,
  //     cropDetails.y,
  //     cropDetails.width,
  //     cropDetails.height,
  //     0,
  //     0,
  //     newWidth,
  //     newHeight
  //   );

  //   canvas.toBlob(
  //     (blob) => {
  //       handleUploadAvatar(blob);
  //     },
  //     'image/jpeg',
  //     0.9
  //   );

  //   // setCroppedImage(canvas.toDataURL('image/jpeg'));
  // };
  const handleUploadAvatar = (file) => {
    if (!file) {
      console.error('Выберите изображение для загрузки.');
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
      .then(()=> refetch())
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
          <Avatar onClick={toggleModal} className={styles.avatar_svg} />
        )}


              {/* {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage} alt='Cropped' />
        </div>
      )} */}
        {showSuccessToast && (
          <Toast
            message='Your changes were successfully saved'
            duration={3000}
          />
        )}
        <AddPhotoModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          togglenModa2={togglenModa2}
          onFileChange={onFileChange}
          isModalOpen2={isModalOpen2}
        />
      </div>

      <CropPhotoModal
        isModalOpen2={isModalOpen2}
        togglenModa2={togglenModa2}
        image={image}
        onCropImage={onCropImage}
        onCropComplete={onCropComplete}
        onFileChange={onFileChange}
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
