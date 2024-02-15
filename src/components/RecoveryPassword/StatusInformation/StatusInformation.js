import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import BlueButton from '../../buttons/BlueButton/BlueButton';
import ButtonSignIn from '../../buttons/buttonSignIn/ButtonSignIn'

import headLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'
import envelopeLogo from '../../../assets/img/icons/icons-forgotPassword/envelope.svg'

import styles from './StatusInformation.module.scss';

export default function StatusInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state.message;

    const onClick = () => {
        navigate('/forgotYourPasswordForm');
    };

    return (
        <div className={styles.statusInformation}>
            <div className={styles.statusInformation_wrapper}>
                <div className={styles.statusInformation_logo_wrapper}>
                    <img
                        className={styles.statusInformation_logo}
                        src={headLogo}
                        alt="UHelp logo"
                    />
                    <h2 className={styles.statusInformation_logo_text}>
                        UHelp
                    </h2>
                </div>
                <div className={styles.statusInformation_container}>
                    <div className={styles.statusInformation_envelope_wrapper}>
                        <img src={envelopeLogo} alt='envelope' className={styles.statusInformation_envelope} />
                    </div>
                    <div className={styles.statusInformation_text}>
                        <h2 className={styles.text_title}>
                            {message === 'token expired' ? 'Термін дії посилання завершився' : null}
                            {message === 'token already has been used' ? 'Це посилання вже використано' : null}
                        </h2>
                        <p className={styles.text_description}>
                            {message === 'token expired' ? 'Упс! Це посилання на підтвердження пошти більше не дійсне. Але ви можете запросити ще одне!' : null}
                            {message === 'token already has been used' ? 'Упс! Це посилання на підтвердження пошти вже було використано раніше. Але ви можете запросити ще одне!' : null}
                        </p>
                    </div>

                    <BlueButton text={'Відправити ще раз'} additionalStyles={styles.statusInformation_blue_button} onClick={onClick} />
                    <ButtonSignIn text={'Повернутися на Головну'} additionalStyles={styles.statusInformation_toTheMain_button} />
                </div>
            </div>
        </div>
    )
}