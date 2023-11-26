import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Input} from 'antd'; 
import axios from 'axios';

import {ReactComponent as CloseIcon} from '../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import miniLogo from '../../assets/img/icons/icons-signIn/mini-logo-signIn.png';
import errorIcon from '../../assets/img/icons/icons-signIn/error-input-icon.png';
import googleIcon from '../../assets/img/icons/icons-signIn/google-button-icon.png';

import styles from './signIn.module.scss';

const API_URL = 'http://127.0.0.1:8000/api/v1/auth/login/';

export default function SignIn() {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignIn = async (values) => {
    try {
      const response = await axios.post(API_URL, values);
      const authToken = response.data.key;
      localStorage.setItem('authTokenUHelp', authToken);
      console.log('Sign-in successful:', response.data);
      closeModal()
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Введіть дійсну пошту (email@example.com) ';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Пароль повинен містити не менше 6 символів.';
      }

      return errors;
    },
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

  return (
    <>
      <p className={styles.signInButton} onClick={openModal}>Sign IN</p>
      {isOpen && (
        <div className={`${styles.shadow} ${styles.fadeIn}`}>
          <div className={`${styles.signIn} `}>
            <div className={styles.signIn__icon} onClick={closeModal}>
              <div className={styles.signIn__icon__helper}></div>
              <img className={styles.signIn__icon__logo}  src={miniLogo}/>
              <CloseIcon className={styles.signIn__icon__close}/>
            </div>

            <div className={styles.signIn__wrapper}>
              <h3 className={styles.signIn__title}>Увійти в аккаунт</h3>
              <p className={styles.signIn__description}>
                Будь ласка, введіть дані для входу до акаунту
              </p>
              <a className={styles.signIn__google} href='/'>
                <img src={googleIcon}/> Продовжити через Google
              </a>

              <p className={styles.signIn__separator}>або</p>

              <form
                className={`${styles.signIn__form} ${styles.form}`}
                onSubmit={formik.handleSubmit}
              >
                <div className={styles.signIn__form__component}>
                  <label className={styles.form__label} >
                    Електронна пошта
                  </label>
                  <Input
                    className={styles.form__input}
                    status={formik.touched.email && formik.errors.email ? 'error' : ''}
                    placeholder='your.email@example.com'
                    type='email'
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div className={styles.form__error}> <img src={errorIcon} /> {formik.errors.email}</div>
                  )}
                </div>

                <div className={styles.signIn__form__component}>
                  <label className={styles.form__label} >
                    Пароль:
                  </label>
                  <Input.Password
                    className={styles.form__input}
                    status={formik.touched.password && formik.errors.password ? 'error' : ''}
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                  />

                  {formik.touched.password && formik.errors.password && (
                    <div className={styles.form__error}> <img src={errorIcon} />{formik.errors.password}</div>
                  )}
                </div>

                <a href='/' className={styles.form__forgotPassword}>
                  Я не пам’ятаю пароль
                </a>
                <button  
                  type='submit' 
                  className={`${styles.form__submit} ${formik.isValid && formik.touched.email && formik.touched.password ? styles.validSubmit : ''}`}
                >
                  Увійти
                </button>
              </form>

              <div className={styles.noAccount}>
                <p className={styles.noAccount__text}>Немає аккаунту?</p>
                <a href='/' className={styles.noAccount__signUp}>
                  Зареєструватися
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}