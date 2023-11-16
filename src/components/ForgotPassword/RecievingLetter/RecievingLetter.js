import React from 'react';

import styles from './RecievingLetter.module.scss'

import close from '../../../assets/img/icons/icons-forgotPassword/closelogo.svg'
import logo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'

export default function RecievingLetter() {
    
    return (
        <div className={styles.recievingLetterSection}>
            <div className={styles.recievingLetterSection_wrapper}>

                <a className={styles.recievingLetterSection_close} href="/close">
                    <img className={styles.close_icon} src={close} alt="close icon" />
                </a>

                <a className={styles.recievingLetterSection_logo} href="/">
                    <img className={styles.logo_company} src={logo} alt="company logo" />
                </a>

                <div className={styles.recievingLetterSection_content}>
                    <h1 className={styles.content_title}>
                        Recovery link set
                    </h1>
                    <p className={styles.content_firstdescription}>
                        Please check your inbox.
                    </p>
                    <p className={styles.content_secondarydescription}>
                        We sent a recovery link to <a href="/">mail@gmail.com </a> 
                    </p>
                </div>

                <div className={styles.recievingLetterSection_footer}>
                    <p className={styles.footer_text}>Nothing has been received? </p> 
                    <a className={styles.footer_link} href="/">Resend</a>
                </div>
            </div>
        </div>
    )
}