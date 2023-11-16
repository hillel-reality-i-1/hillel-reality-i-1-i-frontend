import React from 'react';

import styles from './CreateNewPassword.module.scss'

import close from '../../../assets/img/icons/icons-forgotPassword/closelogo.svg'
import logo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'
import check from '../../../assets/img/icons/icons-forgotPassword/check.svg'
import wrong from '../../../assets/img/icons/icons-forgotPassword/wrong.svg'
import eye from '../../../assets/img/icons/icons-forgotPassword/eye.svg'

export default function CreateNewPassword() {
   
    return (
        <div className={styles.createNewPasswordSection}>
            <div className={styles.createNewPasswordSection_wrapper}>

                 <a className={styles.createNewPasswordSection_close} href="/close">
                    <img className={styles.close_icon} src={close} alt="close icon" />
                </a>
                <a className={styles.createNewPasswordSection_logo} href="/">
                    <img className={styles.logo_company} src={logo} alt="Company logo" />
                </a>

                <div className={styles.createNewPasswordSection_header}>
                    <h1 className={styles.header_title}>
                        Create new password
                    </h1>
                    <p className={styles.header_description}>
                        Title below text
                    </p>
                    
                </div>

                <div className={styles.createNewPasswordSection_form}>
                    <div className={styles.form_forpassword}>
                        <label className={styles.form_label} htmlFor="password">
                            Password:
                        </label>
                        <div className={styles.form_input_wrapper}>
                            <input className={styles.form_input} type="password" id="password" name="password" required />
                            <img src={eye} alt="Eye icon" />
                        </div>
                    </div>

                    <div className={styles.form_requirements}>
                        <p className={styles.requirements_numbers}>
                            <img className={styles.requirements_checklogo} src={check} alt="Check icon" />
                            Must be at least 6 numbers
                        </p>
                        <p className={styles.requirements_symbolsornumbers}>
                            <img src={wrong} alt="Wrong icon" />
                            Must have at least one symbol or number
                        </p>
                        <p className={styles.requirements_upperandlowcase}>
                            <img src={wrong} alt="Wrong icon" />
                            Must have upper and lower case
                        </p>
                    </div>


                    <form className={styles.form_confirmpassword}>
                        <label className={styles.form_label} htmlFor="confirmPassword">
                            Confirm your password:
                        </label>
                        <div className={styles.form_input_wrapper}>
                            <input className={styles.form_input} type="password" id="confirmPassword" name="confirmPassword" required />
                        </div>

                        <a href="/" className={styles.createNewPasswordSection_button}>
                            Save password
                        </a>
                    </form>


                </div>
                
            </div>
        </div>
    );
}