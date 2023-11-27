import React, { useState, useEffect } from 'react';

import { Input } from 'antd';

import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import '../../../translations/i18n';

import mainLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'

import trueMinIcon from '../../../assets/img/icons/icons-forgotPassword/trueMin.svg'
import trueMaxIcon from '../../../assets/img/icons/icons-forgotPassword/trueMax.svg'
import wrongMax from '../../../assets/img/icons/icons-forgotPassword/wrongMax.svg'
import warningLogo from '../../../assets/img/icons/icons-forgotPassword/error.svg';

import styles from './CreateNewPassword.module.scss'

export default function CreateNewPassword() {
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
    const [isButtonActive, setButtonActive] = useState(false);
    const [errorsValue, setErrorsValue] = useState(true)

    const { t } = useTranslation();

    useEffect(() => {
        setButtonActive(
            confirmPasswordValue.length >= 1 && confirmPasswordValue === passwordValue && !errorsValue
        );
    }, [confirmPasswordValue, passwordValue, errorsValue]);

    return (
        <div className={styles.createNewPassword}>
            <div className={styles.createNewPassword_main}>

                <div className={styles.main_logo_wrapper}>
                    <img className={styles.main_logo} src={mainLogo} alt="UHelp logo" />
                    <h2 className={styles.main_logo_text}>
                        UHelp
                    </h2>
                </div>

                <div className={styles.createNewPassword_section}>

                    <div className={styles.section_text}>
                        <h2 className={styles.section_title}>
                            {t('textCreateNewPassword.createNewPassword')}
                        </h2>

                        <p className={styles.section_description}>
                            {t('textCreateNewPassword.almostDone')}
                        </p>
                    </div>

                    <Formik
                        initialValues={{ password: "", confirmPassword: "" }}

                        validate={(value) => {

                            const errors = {};

                            setPasswordValue(value.password);
                            setConfirmPasswordValue(value.confirmPassword)

                            const validatePassword = (value) => {
                                const errors = [];
                            
                                if (value.length < 8) {
                                  errors.push('mustBeAtLeast8Numbers');
                                }
                            
                                if (!/[0-9!@#$%^&*()_+={}[\]:;<>,±"'|.?~\\/-]/.test(value)) {
                                  errors.push('mustHaveAtLeastOneSymbolOrNumber');
                                }
                            
                                if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
                                  errors.push('mustHaveUpperAndLowerCases');
                                }
                            
                                return errors;
                            };

                            errors.password = validatePassword(value.password);
                            setErrorsValue(errors.password.length);

                            return errors;
                        }}>
                        {({ errors }) => (
                            <Form className={styles.section_form}>

                                <p className={styles.form_block}>
                                    <label htmlFor="password" className={styles.form_label}>
                                        {t('textCreateNewPassword.password')}
                                    </label>
                                    <Field name="password">
                                        {({ field }) => (
                                            <Input.Password {...field} placeholder="password" className={styles.form_input} id="password" required />
                                        )}
                                    </Field>
                                </p>

                                {errors.password && (<div className={styles.form_warning}>
                                    <div className={styles.warning_item_wrapper}>
                                        <p className={styles.warning_item}>
                                            <img className={styles.item_logo} src={errors.password.includes('mustBeAtLeast8Numbers') ? warningLogo : trueMinIcon} alt="warning logo" />
                                            <span className={errors.password.includes('mustBeAtLeast8Numbers') ? styles.item_text : styles.item_text_true}>
                                                {t('textCreateNewPassword.mustBeAtLeast8Numbers')}
                                            </span>
                                        </p>
                                    </div>

                                    <div className={styles.warning_item_wrapper}>
                                        <p className={styles.warning_item}>
                                            <img className={styles.item_logo} src={errors.password.includes('mustHaveAtLeastOneSymbolOrNumber') ? warningLogo : trueMinIcon} alt="warning logo" />
                                            <span className={errors.password.includes('mustHaveAtLeastOneSymbolOrNumber') ? styles.item_text : styles.item_text_true}>
                                                {t('textCreateNewPassword.mustHaveAtLeastOneSymbolOrNumber')}
                                            </span>
                                        </p>
                                    </div>

                                    <div className={styles.warning_item_wrapper}>
                                        <p className={styles.warning_item}>
                                            <img className={styles.item_logo} src={errors.password.includes('mustHaveUpperAndLowerCases') ? warningLogo : trueMinIcon} alt="warning logo" />
                                            <span className={errors.password.includes('mustHaveUpperAndLowerCases') ? styles.item_text : styles.item_text_true}>
                                                {t('textCreateNewPassword.mustHaveUpperAndLowerCases')} 
                                            </span>
                                        </p>
                                    </div>

                                </div>)}

                                <p className={styles.form_block}>
                                    <label htmlFor="confirmPassword" className={styles.form_label}>
                                        {t('textCreateNewPassword.confirmPassword')}:
                                    </label>

                                    <Field name="confirmPassword">
                                        {({ field }) => (
                                            <Input.Password {...field} placeholder="password" className={styles.form_input} id="confirmPassword" required />
                                        )}
                                    </Field>
                                </p>

                                {confirmPasswordValue.length >= 1 && (errorsValue === 0) && (confirmPasswordValue === passwordValue ?
                                    <div className={styles.form_assistiveText}>
                                        <div className={styles.form_assistiveText_wrapper}>
                                            <img src={trueMaxIcon} alt="assistive text" />
                                            <p className={styles.assistiveText_good}>
                                                {t('textCreateNewPassword.greatJob')}
                                            </p>
                                        </div>
                                    </div> :
                                    <div className={styles.form_assistiveText}>
                                        <div className={styles.form_assistiveText_wrapper}>
                                            <img src={wrongMax} alt="assistive text" />
                                            <p className={styles.assistiveText_wrong}>
                                                {t('textCreateNewPassword.passwordsDontMatch')}
                                            </p>
                                        </div>
                                    </div>)
                                }

                                <button type="submit" onClick={() => console.log(passwordValue, passwordValue)} className={isButtonActive ? styles.form_button_active : styles.form_button}>
                                    {t('textCreateNewPassword.savePassword')}
                                </button>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

            <div className={styles.createNewPassword_asideBackground_wrapper}>
                <div className={styles.createNewPassword_asideBackground}>
                </div>
            </div>

        </div>
    );
}


