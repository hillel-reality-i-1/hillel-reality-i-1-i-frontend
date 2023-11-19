import React from 'react';
import styles from './EmailOnTheWay.module.scss';

import envelopeLogo from '../../../assets/img/icons/icons-forgotPassword/envelope.svg';
import mainLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg';

export default function EmailOnTheWay() { 

    return (
        <div className={styles.emailOnTheWay}>

            <div className={styles.emailOnTheWay_main}>

                <div className={styles.emailOnTheWay_section}>

                    <div className={styles.section_logo_wrapper}>
                        <img className={styles.section_logo} src={mainLogo} alt="UHelp logo" />
                        <h2 className={styles.section_logo_text}>UHelp</h2>
                    </div>

                    <div className={styles.section_icon_wrapper}>
                        <img className={styles.section_icon} src={envelopeLogo} alt="envelope icon" />
                    </div>

                    <div className={styles.section_text}>
                        <h2 className={styles.section_title}>
                            Email on the way!
                        </h2>

                        <p className={styles.section_description}>
                            We sent you password reset link to <span className={styles.description_email}>mail@gmail.com</span>. Click the link inside to get started!
                        </p>
                    </div>

                    <div className={styles.section_resend}>

                        <p className={styles.resend_text}>
                            Nothing has been received?
                        </p>

                        <div className={styles.resend_link_wrapper}>
                            <a className={styles.resend_link} href="/">Resend link</a>
                        </div>

                    </div>

                    <a className={styles.section_button} href="/">Back to Sign In</a>

                </div>
            </div>

            <div className={styles.emailOnTheWay_asideBackground_wrapper}>
                <div className={styles.emailOnTheWay_asideBackground}>

                </div>
            </div>

        </div>
    );
}