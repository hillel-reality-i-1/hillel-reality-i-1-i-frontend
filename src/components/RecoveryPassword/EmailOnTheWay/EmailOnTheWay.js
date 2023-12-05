import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import envelopeLogo from '../../../assets/img/icons/icons-forgotPassword/envelope.svg';
import mainLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg';
import submitPasswordReset from '../SubmitPasswordReset/submitPasswordReset';

import ButtonSignIn from '../Buttons/ButtonSignIn/ButtonSignIn';
import styles from './EmailOnTheWay.module.scss';

export default function EmailOnTheWay() {
    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const location = useLocation();
    const emailValue = location.state.emailValue || '';

    const { t } = useTranslation();

    useEffect(() => {
        if (isTimerRunning) {
            const timerInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);

                if (timer === 0) {
                    setIsTimerRunning(false);
                    clearInterval(timerInterval);
                }
            }, 1000);

            return () => clearInterval(timerInterval);
        }
    }, [isTimerRunning, timer]);

    const handleResendClick = () => {

        submitPasswordReset(emailValue)
        setTimer(60);
        setIsTimerRunning(true);
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
                        {timer > 0
                            ? (
                                <div className={styles.resend_timer}>
                                    <span className={styles.timer_text}>
                                        {t('textEmailOnTheWay.resendIn')}
                                        {' '}
                                        {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')} 
                                        {' '}
                                        {t('textEmailOnTheWay.seconds')}
                                    </span>
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
                    <ButtonSignIn />
                </div>
            </div>
            <div className={styles.emailOnTheWay_asideBackground_wrapper}>
                <div className={styles.emailOnTheWay_asideBackground}>
                </div>
            </div>
        </div>
    );
}