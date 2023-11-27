import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';

import '../../../translations/i18n';

import logo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'
import error from '../../../assets/img/icons/icons-forgotPassword/error.svg'
import arrowIcon from '../../../assets/img/icons/icons-forgotPassword/arrow.svg'

import styles from './ForgotYourPassword.module.scss'

export default function ForgotYourPassword() {
    const [activeButton, setActiveButton] = useState('');

    const { t } = useTranslation();

    return (
        <div className={styles.forgotYourPassword}>
            <div className={styles.forgotYourPassword_main}>

                <div className={styles.main_logo_wrapper}>
                    <img className={styles.main_logo} src={logo} alt="UHelp logo" />
                    <h2 className={styles.main_icon_text}>UHelp</h2>
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
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                                setActiveButton(false)
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                                setActiveButton(false)
                            } else {
                                setActiveButton(true)
                            }

                            return errors;
                        }}
                        >

                        {({ errors, touched }) => (
                            <Form className={styles.section_form}>
                                <div className={styles.form_wrapper}>
                                    <label className={styles.form_label} htmlFor="email">{t('textForgotYourPassword.email')}</label>
                                    <Field className={errors.email && touched.email ? styles.form_input_wrong : styles.form_input} type="email" id="email" name="email" placeholder="email@gmail.com" required />

                                    {errors.email &&
                                        touched.email &&
                                        <div className={styles.form_error_wrapper}>
                                            <img className={styles.error_img} src={error} alt="warning, no such email" />
                                            <p className={styles.error_text}>
                                                {t('textForgotYourPassword.warningEmail')}
                                            </p>
                                        </div>}
                                </div>

                                <div className={styles.form_button_and_link}>
                                    <button
                                        type="submit"
                                        className={activeButton ? styles.form_button_active : styles.form_button}>

                                        <Link className={activeButton ? styles.button_link_active : styles.button_link} to={activeButton ? '/emailOnTheWay' : '#'}>
                                            {t('textForgotYourPassword.recieveTheLink')}
                                        </Link>
                                    </button>
                                    <div className={styles.link_wrapper}>
                                        <p className={styles.link_text}>{t('textForgotYourPassword.dontHaveAnAccount')} </p>
                                        <a className={styles.link_signup} href="/signup">{t('textForgotYourPassword.signUp')}</a>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={styles.main_button_wrapper}>

                    <a className={styles.main_button} href="/signin">
                        <img className={styles.button_arrow} src={arrowIcon} alt="arrow icon" />
                        {t('textForgotYourPassword.backToSignIn')}
                    </a>
                </div>

            </div>

            <div className={styles.forgotYourPasswordSection_background_wrapper}>
                <div className={styles.forgotYourPasswordSection_background}>
                </div>
            </div>
        </div>
    )
}