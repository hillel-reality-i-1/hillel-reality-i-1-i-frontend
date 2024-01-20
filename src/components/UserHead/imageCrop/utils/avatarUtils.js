export const onCrop = (image, cropDetails, handleUploadAvatar) => {
  if (!cropDetails || !image) {
    console.error('Crop details or image not available.');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

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
  // console.log(image);
};

// export const handleUploadAvatar = (
//   file,
//   authToken,
//   setAvatarData,
//   setAvatarId,
//   setIsModalOpen,
//   togglenModa2,
//   setShowSuccessToast
// ) => {
//   if (!file) {
//     console.error('Выберите изображение для загрузки.');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('image', file, 'cropped_image.jpg');

//   fetch('http://195.189.226.99/api/v1/users/upload_img/', {
//     method: 'POST',
//     headers: {
//       Authorization: `Token ${authToken}`,
//     },
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // console.log('Success:', data);
//       setAvatarData(data.image);
//       setAvatarId(data.id);
//       setIsModalOpen(false);
//       togglenModa2();
//       setShowSuccessToast(true);
//       setTimeout(() => {
//         setShowSuccessToast(false);
//       }, 5000);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };

export const onFile = (e, setImage) => {
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
