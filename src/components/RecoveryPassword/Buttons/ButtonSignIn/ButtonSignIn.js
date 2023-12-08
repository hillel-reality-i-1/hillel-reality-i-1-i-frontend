import React from 'react';

import '../../../../translations/i18n';
import arrowIcon from '../../../../assets/img/icons/icons-forgotPassword/arrow.svg';
import { useTranslation } from 'react-i18next';

import styles from './ButtonSignIn.module.scss';

const ButtonSignIn = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.button_wrapper}>

            <a className={styles.button} href="/signin">
                <img className={styles.button_arrow} src={arrowIcon} alt="arrow icon" />
                {t('textForgotYourPassword.backToSignIn')}
            </a>
        </div>
    );
};

export default ButtonSignIn;