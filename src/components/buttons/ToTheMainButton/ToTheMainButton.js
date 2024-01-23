import React from 'react';

import styles from './ToTheMainButton.module.scss';

import arrowIcon from '../../../assets/img/icons/to-the-main-button/array_icon.svg'

export default function ToTheMainButton() {

    return (
        <div className={styles.button_wrapper}>

            <a className={styles.button} href="/">
                Повернутися на Головну
                <img className={styles.button_arrow} src={arrowIcon} alt="arrow icon" />
            </a>
        </div>
    )
}