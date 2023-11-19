import React from 'react';

import mainLogo from '../../../assets/img/icons/logo/forgotPassword_logo.svg'

import styles from './CreateNewPassword.module.scss'

export default function CreateNewPassword() {
   
    return (
        <div className={styles.createNewPassword}>
            <div className={styles.createNewPassword_main }>

                <div className={styles.main_logo_wrapper}>
                    <img className={styles.main_logo} src={mainLogo} alt="UHelp logo" />
                    <h2 className={styles.main_logo_text}>
                        UHelp
                    </h2>
                </div> 

                <div className={styles.createNewPassword_section}>

                    <div className={styles.section_text}>
                        <h2 className={styles.section_title}>
                            Create new password
                        </h2>

                        <p className={styles.section_description}>
                            Almost done. Enter your new password
                        </p>
                    </div>

                    <form className={styles.section_form}>
                        <p className={styles.form_block}>
                            <label htmlFor="password" className={styles.form_label}>
                                Password
                            </label>
                            <input type="password" id="password" name="password" required className={styles.form_input}/>
                        </p>
                        <p className={styles.form_block}>
                            <label htmlFor="confirm-password" className={styles.form_label}>
                                Confirm Password:
                            </label>
                            <input type="password" id="confirm-password" name="confirm-password" required className={styles.form_input}/>
                        </p>
                    </form>

                    <a href="/" className={styles.section_button}>
                        Save password
                    </a>

                </div>
            </div>

            <div className={styles.createNewPassword_asideBackground_wrapper}>
                <div className={styles.createNewPassword_asideBackground}>
                </div>
            </div>

        </div>
    );
}


