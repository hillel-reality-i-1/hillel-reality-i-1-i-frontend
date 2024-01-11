import { useState } from "react";
import { useSelector } from "react-redux";

import { ReactComponent as Plus } from "../../assets/img/icons/user-profile/Plus.svg";
import { ReactComponent as Pen } from "../../assets/img/icons/user-profile/Pen.svg";
import { ReactComponent as Avatar } from "../../assets/img/icons/user-profile/Avatar.svg";
import { ReactComponent as CloseIcon } from "../../assets/img/icons/icons-signIn/close-signIn-icon.svg";
import { ReactComponent as AddPhoto } from "../../assets/img/icons/add-photo-icon/image-gallery-plus.svg";
import userProfileVerifiedIcon from '../../assets/img/icons/user-profile/verifiedIcon.svg';
import locationIcon from '../../assets/img/icons/user-profile/location.svg'

import CustomModal from "../modals/CustomModal";
import BlueButton from "../buttons/blueButton/BlueButton";
import ImageCrop from "./imageCrop/ImageCrop";
import AddPhotoModal from "./imageCrop/AddPhotoModal";

import styles from "./userHead.module.scss";
import CropPhotoModal from "./imageCrop/CropPhotoModal";


export default function UserHead({ userData }) {

  const authToken = useSelector((state) => state.signIn.authTokenUHelp);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglenModa2 = () => {
    setIsModalOpen2(!isModalOpen2);
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

  const onCropComplete = (_, croppedAreaPixels) => {
    setCropDetails(croppedAreaPixels);

    console.log(croppedAreaPixels.width / croppedAreaPixels.height);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };


  const onCropImage = () => {
    if (!cropDetails) {
      console.error("Crop details not available.");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = cropDetails.width;
    canvas.height = cropDetails.height;

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
      cropDetails.width,
      cropDetails.height
    );

    canvas.toBlob((blob) => {
      // handleUploadAvatar(blob);
    }, 'image/jpeg', 0.9);
    setCroppedImage(canvas.toDataURL('image/jpeg'));
  };

  const handleUploadAvatar = (file) => {
    if (!file) {
      console.error('Выберите изображение для загрузки.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file, 'cropped_image.jpg');

    fetch('http://dmytromigirov.space/api/v1/users/upload_img/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className={styles.user__head__avatar}>
        <Avatar onClick={toggleModal} />
        {/* <img src="http://dmytromigirov.space/files/image/6PTVDnbTmpdmxok0HCGAVsPSyQvsE974j3tDADbeH59JQHMEWZwPqK96Zi8meAwA/file.jpg"/> */}
        <AddPhotoModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          togglenModa2={togglenModa2}
          onFileChange={onFileChange}
          isModalOpen2={isModalOpen2}
        />
      </div>
      {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
      <CropPhotoModal
        isModalOpen2={isModalOpen2}
        togglenModa2={togglenModa2}
        image={image}
        onCropImage={onCropImage}
        onCropComplete={onCropComplete}
        onFileChange={onFileChange}
      />

      <div className={styles.user__head__info}>
        <div className={styles.info_nameAndUserName_block}>
          <div className={styles.name_block}>
            <p className={styles.name}>
              {
                userData.full_name ?
                  userData.full_name
                  : null
              }
            </p>
            {
              userData.phone_verified ?
                <img alt="user profile verified icon" src={userProfileVerifiedIcon} />
                : null
            }
          </div>
          <p className={styles.info_nameAndUserName_username}>
            {
              userData.username
                ? (`@` + userData.username)
                : null
            }
          </p>
        </div>

        {
          (userData.country && userData.country.name
            && userData.city && userData.city.name)
            ? <div className={styles.location_true}>
              <img alt="location icon" src={locationIcon} />
              <p className={styles.location_true_text}>
                {
                  (userData.country.name + `, ` + userData.city.name)
                }
              </p>
            </div>
            : <p className={styles.location}>
              <Plus />
              Add location
            </p>
        }

      </div>
      <div className={styles.user__head__edit}>
        <p>
          <Pen /> Редагувати профіль
        </p>
      </div>
    </>
  );
}
