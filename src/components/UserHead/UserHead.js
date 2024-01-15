import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

import { ReactComponent as Plus } from "../../assets/img/icons/user-profile/Plus.svg";
import { ReactComponent as Pen } from "../../assets/img/icons/user-profile/Pen.svg";
import { ReactComponent as Avatar } from "../../assets/img/icons/user-profile/Avatar.svg";
import { ReactComponent as CloseIcon } from "../../assets/img/icons/icons-signIn/close-signIn-icon.svg";
import { ReactComponent as AddPhoto } from "../../assets/img/icons/add-photo-icon/image-gallery-plus.svg";
import verified_icon from '../../assets/img/icons/user-profile/verified_icon.png'
import CropPhotoModal from "./imageCrop/CropPhotoModal";
import AddPhotoModal from "./imageCrop/AddPhotoModal";
import CustomModal from "../modals/CustomModal/CustomModal";
import BlueButton from "../buttons/BlueButton/BlueButton";
import ImageCrop from "./imageCrop/ImageCrop";

import styles from "./userHead.module.scss";
import ProfilePhotoModal from "./imageCrop/ProfilePhotoModal";
import Toast from "../Toast/Toast";
import DeleteConfirmation from "./imageCrop/DeleteConfirmation";
import axios from "axios";

export default function UserHead() {
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isProfilePhotoModal, setProfilePhotoModal] = useState(false)
  const [isDeleteConfirmationModal, setDeleteConfiramtionModal ] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglenModa2 = () => {
    setIsModalOpen2(!isModalOpen2);
  };
  const toggleProfilePhotoModal = () => {
    setProfilePhotoModal(!isProfilePhotoModal);
  };
  const toggleDeleteConfirmationModal = () => {
    console.log('del confirm');
    setDeleteConfiramtionModal(!isDeleteConfirmationModal);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  /////////////
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropDetails, setCropDetails] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false); 
  const [avatarID, setAvatarId] = useState(null)
  const [avatarData, setAvatarData] = useState(null)
  useEffect(()=> {
    const fetchImageFromProfile = async () => {
      try {
        const headers = {
          Authorization: `Token ${authToken}`
        };
        const response = await axios.get('http://dmytromigirov.space/api/v1/files/images_by_user_id/66/', { headers });
        console.log(response.data);
        setAvatarData('http://dmytromigirov.space' + response.data.image)
        setAvatarId(response.data.id)
        console.log(response.data.id);
      } catch (error) {
        setAvatarData(null)
        console.error('Error during fetch image from profile ', error);
      }
    };
    fetchImageFromProfile()
  }, [avatarData])
  const onCropComplete = (_, croppedAreaPixels) => {
    setCropDetails(croppedAreaPixels);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      if (file.size > 4.9 * 1024 * 1024) {
        console.error('File size exceeds 5MB limit.');
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImage(e.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const onCropImage = () => {
    if (!cropDetails || !image) {
      console.error('Crop details or image not available.');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");

    const targetSize = 200;
    const aspectRatio = cropDetails.width / cropDetails.height;

    let newWidth = targetSize;
    let newHeight = targetSize;

    if (aspectRatio > 1) {
      newHeight = targetSize / aspectRatio;
    } else {
      newWidth = targetSize * aspectRatio;
    }

    canvas.width = targetSize;
    canvas.height = targetSize;

    const img = new Image();
    img.src = image;

    ctx.drawImage(
      img,
      cropDetails.x,
      cropDetails.y,
      cropDetails.width,
      cropDetails.height,
      0,
      0,
      newWidth,
      newHeight
    );

    canvas.toBlob(
      (blob) => {
        handleUploadAvatar(blob);
      },
      'image/jpeg',
      0.9
    );

    setCroppedImage(canvas.toDataURL('image/jpeg'));
  };

  const handleUploadAvatar = (file) => {
    if (!file) {
      console.error("Выберите изображение для загрузки.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file, "cropped_image.jpg");

    fetch('http://dmytromigirov.space/api/v1/users/upload_img/', {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setAvatarData(data.image)
        setIsModalOpen(false)
        togglenModa2()
        setShowSuccessToast(true); 
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className={styles.user__head__avatar}>
        
        {avatarData ? <img src={avatarData} className={styles.avatar_img} onClick={toggleProfilePhotoModal}/> : <Avatar onClick={toggleModal} className={styles.avatar_svg}/>}
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
      {/* <img src={imageCloudinary} /> */}
      {/* {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage} alt='Cropped' />
        </div>
      )} */}
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
      /> 

      <div className={styles.user__head__info}>
        <p className={styles.name}>Lily <Tooltip placement="topLeft" title={'Your profile is verified'} ><img  src={verified_icon }/> </Tooltip> </p>
        <p className={styles.nick__name}>@Lily</p>
        <p className={styles.location}>
          <Plus />
          Add location
        </p>
      </div>
      <div className={styles.user__head__edit}>
        <Link to='/settings'>
          <p>
            <Pen /> edit
          </p>
        </Link>

      </div>
    </>
  );
}
