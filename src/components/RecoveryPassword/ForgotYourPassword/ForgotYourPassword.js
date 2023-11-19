import React from 'react';

import logo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'

import styles from './ForgotYourPassword.module.scss'

export default function ForgotYourPassword() {
    
    return (
        <div className={styles.forgotYourPasswordSection}>
            <div className={styles.forgotYourPasswordSection_wrapper}>

                <div className={styles.forgotYourPasswordSection_logo_wrapper}>
                    <img className={styles.forgotYourPasswordSection_logo} src={logo} alt="UHelp logo" />
                    <h2 className={styles.forgotYourPasswordSection_icon_text}>UHelp</h2>
                </div>

                <div className={styles.forgotYourPasswordSection_header}>
                    <h1 className={styles.header_title}>
                        Forgot your password?
                    </h1>
                    <p className={styles.header_description}>
                        Enter your account’s email and we’ll send you a link to reset your password
                    </p>
                </div>

                <form className={styles.forgotYourPasswordSection_form}>
                    <label className={styles.form_label} htmlFor="email">Email:</label>
                    <input className={styles.form_input} type="email" id="email" name="email" placeholder="email@gmail.com" required />

                    <a href="/Recievethelink" className={styles.form_button}>
                        Recieve the link
                    </a>
                </form>
                
                <div className={styles.forgotYourPasswordSection_signUp}>
                    <p className={styles.signUp_text}>Don’t have an account? </p> 
                    <a className={styles.signUp_link} href="/">Sign up</a>
                </div>

                <div className={styles.forgotYourPasswordSection_button_wrapper}>
                    <a className={styles.forgotYourPasswordSection_button} href="/">Back to Sign In</a>
                </div>
                
            </div>

            <div className={styles.forgotYourPasswordSection_background_wrapper}>
                <div className={styles.forgotYourPasswordSection_background}>
                
                </div>

            </div>
                
        </div>
    )
}