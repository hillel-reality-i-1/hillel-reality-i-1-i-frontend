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
    1
  );

};


export const onFile = (e, setImage) => {
  const file = e.target.files[0];

  if (file) {
    if (file.size > 4.9 * 1024 * 1024) {
      console.error('File size exceeds 5MB limit.');
      throw new Error('File size exceeds 5MB limit.');
      return 
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  }
};
