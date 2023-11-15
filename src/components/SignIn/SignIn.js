import React from 'react'

import styles from './signIn.module.scss'

import closeIcon from '../../assets/img/icons/icons-signIn/close-signIn-icon.svg'

export default function SignIn() {
  return (
    <div className={styles.shadow}>
      <div className={styles.signIn}>
        <div  className={styles.signIn__icon} ><img src={closeIcon} alt='close button'/></div>

        <div className={styles.signIn__wrapper}>
          <h3 className={styles.signIn__title}>Sign In to your account</h3>
          <p className={styles.signIn__description}>Please, enter the login details for your account</p>
          <a className={styles.signIn__google} href='/'>Sign In with Google</a>

          <p className={styles.signIn__separator}>or</p>

          <form className={`styles.signIn__form  form`}>
            <div className={styles.signIn__form__component}>
              <label className={styles.form__label} htmlFor='email'>Email:</label>
              <input className={styles.form__input} placeholder='your.email@example.com' type="email" id="email" name="email" required />
            </div>

            <div className={styles.signIn__form__component}>
              <label className={styles.form__label} htmlFor='password'>Password:</label>
              <input className={styles.form__input} type='password' id='password' name='password' required />
            </div>
            
              <a href='/' className={styles.form__forgotPassword}>I forgot my password</a>
              <a className={styles.form__submit}>Sign In</a>

          </form>

          <div className={styles.noAccount}>
              <p className={styles.noAccount__text}>Don’t have an account?</p>
              <a href='/' className={styles.noAccount__signUp}>Sign Up</a>
          </div>
        </div>


      </div>     
    </div>

  )
}
