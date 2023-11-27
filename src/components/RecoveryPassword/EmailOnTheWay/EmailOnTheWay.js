import React from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import envelopeLogo from '../../../assets/img/icons/icons-forgotPassword/envelope.svg';
import mainLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg';
import arrowIcon from '../../../assets/img/icons/icons-forgotPassword/arrow.svg'

import styles from './EmailOnTheWay.module.scss';

export default function EmailOnTheWay() { 

    const { t } = useTranslation();

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
                            {t('textEmailOnTheWay.emailOnTheWay')}
                        </h2>

                        <p className={styles.section_description}>
                            {t('textEmailOnTheWay.sentYouPassword')} <span className={styles.description_email}>mail@gmail.com</span>. {t('textEmailOnTheWay.clickTheLink')}
                        </p>
                    </div>

                    <div className={styles.section_resend}>

                        <p className={styles.resend_text}>
                            {t('textEmailOnTheWay.nothingHasBeenReceived')}
                        </p>

                        <div className={styles.resend_link_wrapper}>
                            <a className={styles.resend_link} href="/">
                                {t('textEmailOnTheWay.resendLink')}
                            </a>
                        </div>

                    </div>

                    <div className={styles.section_button_wrapper}>

                        <a className={styles.section_button} href="/signin">
                            <img className={styles.button_arrow} src={arrowIcon} alt="arrow icon" />
                            {t('textEmailOnTheWay.backToSignIn')}
                        </a>
                        
                    </div>

                </div>
            </div>

            <div className={styles.emailOnTheWay_asideBackground_wrapper}>
                <div className={styles.emailOnTheWay_asideBackground}>

                </div>
            </div>

        </div>
    );
}