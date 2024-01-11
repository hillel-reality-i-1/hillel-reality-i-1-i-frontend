import React from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import successLogo from '../../../assets/img/icons/icons-forgotPassword/success.svg'

import styles from './PasswordUpdated.module.scss'

export default function PasswordUpdated() {

    const { t } = useTranslation();
   
    return (
        <div className={styles.passwordUpdatedSection}>
            <div className={styles.passwordUpdatedSection_wrapper}>
                <div className={styles.passwordUpdatedSection_logo_wrapper}>
                    <img className={styles.passwordUpdatedSection_logo} src={successLogo} alt="success logo" />
                </div>
                <div className={styles.passwordUpdatedSection_section}>
                    <h1 className={styles.passwordUpdatedSection_title}>
                        {t('textPasswordUpdated.success')}
                    </h1>
                    <p className={styles.passwordUpdatedSection_description}>
                        {t('textPasswordUpdated.yourPasswordHasBeenUpdated')}
                    </p>
                </div>
                <div className={styles.passwordUpdatedSection_button_wrapper}>
                    <a className={styles.passwordUpdatedSection_button} href="/user">
                        {t('textPasswordUpdated.returnToSignIn')}
                    </a>
                </div>
            </div>
        </div>
    );
}