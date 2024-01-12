import { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from 'antd';

import { ReactComponent as Plus } from '../../../assets/img/icons/crop-image-controls/plus.svg';
import { ReactComponent as Minus } from '../../../assets/img/icons/crop-image-controls/minus.svg';
import BlueButton from '../../buttons/blueButton/BlueButton';

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
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 4)); // Increase zoom by 0.1, up to a maximum of 4


  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Decrease zoom by 0.1, down to a minimum of 1
 
  };
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div className={styles.crop} >
        <div className={styles.crop__wrap}>
          <div className={styles.crop__container}>
            {image && (
              <Cropper
                ref={cropper}
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape='round'
                showGrid={false}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
              />
            )}
          </div>
        </div>

        <div className={styles.controls}>
          {/* <label>Zoom:</label> */}
          <div 
            className={styles.controls__slider}
          >
          <Slider
            min={1}
            max={4}
            tooltip={{
              formatter,
            }}
            step={0.1}
            value={zoom}
            onChange={onZoomChange}
            trackStyle={{
              backgroundColor: '#126FE1',
            }}

          />

            <div
              className={styles.controls__buttons}
            >
              <Minus onClick={handleZoomOut} />
              <Plus onClick={handleZoomIn} />
            </div>
          </div>

        </div>


      </div>

        <div className={styles.button_container}>
          <div className={styles.custom_file_input}>
            <a>Change photo</a>
            <input type='file' name='file' accept='.jpg, .jpeg, .png' onChange={onFileChange} />
          </div>
          <BlueButton text={'Save photo'} additionalStyles={styles.BlueButton} onClick={onCropImage}/>

        </div>
    </div>

  );
}
