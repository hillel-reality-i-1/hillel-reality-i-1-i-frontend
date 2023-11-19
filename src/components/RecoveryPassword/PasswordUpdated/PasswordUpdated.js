import React from 'react';

import styles from './PasswordUpdated.module.scss'

import successLogo from '../../../assets/img/icons/icons-forgotPassword/success.svg'

export default function PasswordUpdated() {
   
    return (
        <div className={styles.passwordUpdatedSection}>
            <div className={styles.passwordUpdatedSection_wrapper}>

                <div className={styles.passwordUpdatedSection_logo_wrapper}>
                    <img className={styles.passwordUpdatedSection_logo} src={successLogo} alt="success logo" />
                </div>

                <div className={styles.passwordUpdatedSection_section}>
                    <h1 className={styles.passwordUpdatedSection_title}>
                        Success!
                    </h1>
                    <p className={styles.passwordUpdatedSection_description}>
                        Your password has been updated. You can Sign In again
                    </p>
                </div>

                <div className={styles.passwordUpdatedSection_button_wrapper}>
                    <a className={styles.passwordUpdatedSection_button} href="/">
                        Return to Sign In
                    </a>
                </div>

            </div>
        </div>
    );
}