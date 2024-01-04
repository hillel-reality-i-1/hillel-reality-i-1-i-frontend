import { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from 'antd';

import styles from './imageCrop.module.scss';

const formatter = (value) => `x${value}`;

export default function ImageCrop({ image, onCropImage, onCropComplete, onFileChange }) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const cropper = useRef();

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (value) => {
    setZoom(value);
  };

  return (
    <div className={styles.crop} >
      <div className={styles.crop__container}>
        {image && (
          <Cropper
            ref={cropper}
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
            className={styles.cropped__img}
          />
        )}
      </div>
      <div className={styles.controls}>
        <label>Zoom:</label>
        <Slider
          min={1}
          max={4}
          tooltip={{
            formatter,
          }}
          step={0.1}
          value={zoom}
          onChange={onZoomChange}
        />
      </div>
      <div className={styles.custom_file_input}>
        <label>Change photo</label>
        <input type="file" name="file" accept="image/*" onChange={onFileChange} />
      </div>

      <div className={styles.button_container}>
        <button onClick={onCropImage}>Crop Image</button>
      </div>

    </div>
  );
}
