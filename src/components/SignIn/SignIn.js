import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';

import {ReactComponent as CloseIcon} from '../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import miniLogo from '../../assets/img/icons/icons-signIn/mini-logo-signIn.png';
import googleIcon from '../../assets/img/icons/icons-signIn/google-button-icon.png';
import GoogleSignIn from './googleSignIn/GoogleSignIn';
import { validateSignInForm } from '../../helpers/validation';
import SignInForm from './signInForm/SignInForm';
import { API_URL_SIGN_IN } from '../../config/API_url';

import styles from './signIn.module.scss';

export default function SignIn() {

  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignIn = async (values) => {
    try {
      const response = await axios.post(API_URL_SIGN_IN, values);
      const authToken = response.data.key;
      localStorage.setItem('authTokenUHelp', authToken);
      console.log('Sign-in successful:', response.data);
      closeModal();
      setLoginError(null); 
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      setLoginError('Пошта або пароль введені не вірно. Спробуйте ще раз');
    }
  };
  
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateSignInForm,
    onSubmit: handleSignIn,
  });

  return (
    <>
      {!isAuthenticated && (
        <p className={styles.signInButton} onClick={openModal}>
          Вхід
        </p>
      )}

      {isOpen && (
        <div className={`${styles.shadow} ${styles.fadeIn}`}>
          <div className={`${styles.signIn} `}>
            <div className={styles.signIn__icon} onClick={closeModal}>
              <div className={styles.signIn__icon__helper}></div>
              <img className={styles.signIn__icon__logo}  src={miniLogo} alt='UHelp logo'/>
              <CloseIcon className={styles.signIn__icon__close}/>
            </div>

            <div className={styles.signIn__wrapper}>
              <h3 className={styles.signIn__title}>Увійти в аккаунт</h3>
              <p className={styles.signIn__description}>
                Будь ласка, введіть дані для входу до акаунту
              </p>

              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                <div className={styles.signIn__google} >
                  <img src={googleIcon} alt='google logo'/> <GoogleSignIn />
                </div>
              </GoogleOAuthProvider>

              <p className={styles.signIn__separator}>або</p>

              <SignInForm formik={formik} loginError={loginError}  styles={styles}/>

              <div className={styles.noAccount}>
                <p className={styles.noAccount__text}>Немає аккаунту?</p>
                <a href='/' className={styles.noAccount__signUp}>
                  Зареєструватися
                </a>
              </div>
            </div>
          </div>
        </div> 
      ) 
      }
      {isOpen && <style>{'body { overflow: hidden; } .shadow { overflow: scroll; }'}</style>}
    </>
  );
}