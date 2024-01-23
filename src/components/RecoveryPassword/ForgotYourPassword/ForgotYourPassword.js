import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';

import '../../../translations/i18n';

import logo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'
import error from '../../../assets/img/icons/icons-forgotPassword/error.svg'

import ButtonSignIn from '../../buttons/buttonSignIn/ButtonSignIn';
import passwordReset from '../../../api/passwordReset';
import emailValidationServer from '../../../api/emailValidationServer';

import styles from './ForgotYourPassword.module.scss'

export default function ForgotYourPassword() {
    const [activeButton, setActiveButton] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const someOtherFunction = async (values) => {
        const isValid = await emailValidationServer(values);
        if(isValid === 1) {
            setActiveButton(false);
            setErrorEmail(false);
            setInvalidEmail(true)
        } else if (isValid === false) {
            setActiveButton(false);
            setErrorEmail(!isValid);
            setInvalidEmail(false)
        } else {
            isValid && setEmailValue(values);
            setInvalidEmail(false)
            setActiveButton(true);
        }
        
    };

    return (
        <div className={styles.forgotYourPassword}>
            <div className={styles.forgotYourPassword_main}>
                <div className={styles.main_logo_wrapper}>
                    <img
                        className={styles.main_logo}
                        src={logo}
                        alt="UHelp logo"
                    />
                    <h2 className={styles.main_icon_text}>
                        UHelp
                    </h2>
                </div>
                <div className={styles.forgotYourPassword_section}>
                    <div className={styles.section_text}>
                        <h1 className={styles.text_title}>
                            {t('textForgotYourPassword.forgotYourPassword')}
                        </h1>
                        <p className={styles.text_description}>
                            {t('textForgotYourPassword.createNewPasswordDescription')}
                        </p>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validate={(values) => {
                            someOtherFunction(values);
                        }}
                        onSubmit={() => {
                            navigate(activeButton
                                ? '/emailOnTheWay'
                                : null, { state: { emailValue } });
                                passwordReset(emailValue)
                        }}
                    >
                        {({ touched }) => (
                            <Form className={styles.section_form}>
                                <div className={styles.form_wrapper}>
                                    <label className={styles.form_label} htmlFor="email">
                                        {t('textForgotYourPassword.email')}
                                    </label>
                                    <Field className={errorEmail
                                        && touched.email
                                        ? styles.form_input_wrong
                                        : styles.form_input} 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="email@gmail.com" 
                                        required 
                                    />
                                    {!activeButton
                                        && errorEmail
                                        ? (
                                            <div className={styles.form_error_wrapper}>
                                                <img
                                                    className={styles.error_img}
                                                    src={error}
                                                    alt="warning, no such email"
                                                />
                                                <p className={styles.error_text}>
                                                    {t('textForgotYourPassword.warningEmail')}
                                                </p>
                                            </div>
                                        )
                                        : null
                                    }
                                    {!activeButton
                                        && invalidEmail
                                        ? (
                                            <div className={styles.form_error_wrapper}>
                                                <img
                                                    className={styles.error_img}
                                                    src={error}
                                                    alt="warning, no such email"
                                                />
                                                <p className={styles.error_text}>
                                                    Введіть дійсну пошту (email@example.com)
                                                </p>
                                            </div>
                                        )
                                        : null
                                    }
                                </div>
                                <div className={styles.form_button_and_link}>
                                    <button
                                        type="submit"
                                        className={activeButton
                                            ? styles.form_button_active
                                            : styles.form_button}
                                        disabled={!activeButton}>
                                        <p className={activeButton
                                            ? styles.button_link_active
                                            : styles.button_link}>
                                            {t('textForgotYourPassword.recieveTheLink')} 
                                        </p>
                                    </button>
                                    <div className={styles.link_wrapper}>
                                        <p className={styles.link_text}>
                                            {t('textForgotYourPassword.dontHaveAnAccount')}
                                        </p>
                                        <a className={styles.link_signup} href="/signup">
                                            {t('textForgotYourPassword.signUp')}
                                        </a>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <ButtonSignIn text={t('textForgotYourPassword.backToSignIn')}/>
            </div>
            <div className={styles.forgotYourPasswordSection_background_wrapper}>
                <div className={styles.forgotYourPasswordSection_background}>
                </div>
            </div>
        </div>
    )
}