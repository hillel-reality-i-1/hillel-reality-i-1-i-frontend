import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import envelopeLogo from '../../../assets/img/icons/icons-forgotPassword/envelope.svg';
import mainLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg';
import passwordReset from '../../../api/passwordReset';
import CountdownTimer from '../../CountdownTimer/CountdownTimer';

import ButtonSignIn from '../../buttons/buttonSignIn/ButtonSignIn';
import styles from './EmailOnTheWay.module.scss';

export default function EmailOnTheWay() {
    const [timer, setTimer] = useState(true);
    const location = useLocation();
    const emailValue = location.state.emailValue || '';
    const { t } = useTranslation();

    const handleTimerEnd = () => {
        setTimer(false)
    }

    const handleResendClick = () => {
        passwordReset(emailValue)
        setTimer(true)
    };

    return (
        <div className={styles.emailOnTheWay}>
            <div className={styles.emailOnTheWay_main}>
                <div className={styles.emailOnTheWay_section}>
                    <div className={styles.section_logo_wrapper}>
                        <img
                            className={styles.section_logo}
                            src={mainLogo}
                            alt="UHelp logo"
                        />
                        <h2 className={styles.section_logo_text}>
                            UHelp
                        </h2>
                    </div>
                    <div className={styles.section_icon_wrapper}>
                        <img
                            className={styles.section_icon}
                            src={envelopeLogo}
                            alt="envelope icon"
                        />
                    </div>
                    <div className={styles.section_text}>
                        <h2 className={styles.section_title}>
                            {t('textEmailOnTheWay.emailOnTheWay')}
                        </h2>
                        <p className={styles.section_description}>
                            {t('textEmailOnTheWay.sentYouPassword')}
                            <span className={styles.description_email}>
                                {emailValue.email}
                            </span>.
                            {' '}
                            {t('textEmailOnTheWay.clickTheLink')}
                        </p>
                    </div>
                    <div className={styles.section_resend}>
                        <p className={styles.resend_text}>
                            {t('textEmailOnTheWay.nothingHasBeenReceived')}
                        </p>
                        {timer === true
                            ? (
                                <div className={styles.resend_timer_wrapper}>
                                    <CountdownTimer onTimerEnd={handleTimerEnd}/>
                                </div>
                            )
                            : (
                                <div className={styles.resend_link_wrapper}>
                                    <a className={styles.resend_link}
                                        href="/"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleResendClick();
                                        }}>
                                        {t('textEmailOnTheWay.resendLink')}
                                    </a>
                                </div>
                            )
                        }
                    </div>
                    <ButtonSignIn text={t('textForgotYourPassword.backToSignIn')} />
                </div>
            </div>
            <div className={styles.emailOnTheWay_asideBackground_wrapper}>
                <div className={styles.emailOnTheWay_asideBackground}>
                </div>
            </div>
        </div>
    );
}