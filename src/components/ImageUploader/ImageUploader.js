import React from 'react';


import addIcon from '../../assets/img/icons/icons-AboutMe/add_icon.svg'; 

import styles from './ImageUploader.module.scss'; 

const ImageUploader = ({ additionalStyles, handleFileChange }) => {
    return (
        <label className={`${styles.my_portfolio_button} ${additionalStyles}`}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className={styles.my_portfolio_button_input}
            />
            <img src={addIcon} alt="add icon" />
        </label>
    );
};

export default ImageUploader;
