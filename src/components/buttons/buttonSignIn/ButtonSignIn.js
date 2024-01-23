import React from 'react';

import arrowIcon from '../../../assets/img/icons/icons-forgotPassword/arrow.svg'

import styles from './ButtonSignIn.module.scss';

const ButtonSignIn = ({text, additionalStyles}) => {

    return (
        <div className={`${styles.button_wrapper} ${additionalStyles}`}>

            <a className={styles.button} href="/">
                <img className={styles.button_arrow} src={arrowIcon} alt="arrow icon" />
                
                {text}
            </a>
        </div>
    );
};

export default ButtonSignIn;