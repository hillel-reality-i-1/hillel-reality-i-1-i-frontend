import React from 'react';

import logo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'

import styles from './RecoveryPassword.module.scss'

export default function RecoveryPassword() {
    
    return (
        <div className={styles.recoveryPasswordSection}>
            <div className={styles.recoveryPasswordSection_wrapper}>

                <a className={styles.recoveryPasswordSection_logo} href="/">
                    <img className={styles.recoveryPasswordSection_icon} src={logo} alt="close icon" />
                </a>

                <div className={styles.recoveryPasswordSection_header}>
                    <h1 className={styles.header_title}>
                        Forgot your password?
                    </h1>
                    <p className={styles.header_description}>
                        Enter your account’s email and we’ll send you a link to reset your password
                    </p>
                </div>

                <form className={styles.recoveryPasswordSection_form}>
                    <label className={styles.form_label} htmlFor="email">Email:</label>
                    <input className={styles.form_input} type="email" id="email" name="email" placeholder="email@gmail.com" required />

                    <a href="/Recievethelink" className={styles.form_button}>
                        Recieve the link
                    </a>
                </form>
                
                <div className={styles.recoveryPasswordSection_signUp}>
                    <p className={styles.signUp_text}>Don’t have an account? </p> 
                    <a className={styles.signUp_link} href="/">Sign up</a>
                </div>

                <div className={styles.recoveryPasswordSection_button_wrapper}>
                    <a className={styles.recoveryPasswordSection_button} href="/">Back to Sign In</a>
                </div>
                
            </div>
        </div>
    )
}