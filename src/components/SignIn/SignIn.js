import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import miniLogo from '../../assets/img/icons/icons-signIn/mini-logo-signIn.png';
import googleIcon from '../../assets/img/icons/icons-signIn/google-button-icon.png';
import GoogleSignIn from './googleSignIn/GoogleSignIn';
import { validateSignInForm } from '../../helpers/validation';
import SignInForm from './signInForm/SignInForm';
import { API_URL_SIGN_IN } from '../../config/API_url';
import { clearAuthToken, setAuthToken, setGoogleAuthToken } from '../../store/slices/signInSlice';

import styles from './signIn.module.scss';
import { useAuthModal } from '../AuthModalContext/AuthModalContext';
import SignUp from '../Registration/SignUp/SignUp';

export default function SignIn({ signInModalOpen, toggleSignInModal, toggleSignUpModal }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const dispatch = useDispatch();
	const authToken = useSelector((state) => state.signIn.authTokenUHelp);

	const changeAuthToken = (authToken) => {
		dispatch(setAuthToken(authToken));
	};
	const changeGoogleAuthToken = (authToken) => {
		dispatch(setGoogleAuthToken(authToken));
		toggleSignInModal();
		setLoginError(null);
		setIsAuthenticated(true);
	};
	const delAuthToken = () => {
		// Dispatch the action with a new token
		dispatch(clearAuthToken());
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const openSignUp = () => {
		toggleSignInModal();
		toggleSignUpModal();
	};
	const handleSignIn = async (values) => {
		try {
			const response = await axios.post(' http://dmytromigirov.space/api/v1/auth/login/', values);
			const authToken = response.data.key;
			// localStorage.setItem('authTokenUHelp', authToken);
			console.log('Sign-in successful:', response.data);
			changeAuthToken(authToken);
			closeModal();
			setLoginError(null);
			setIsAuthenticated(true);
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
			{/* <p>signInModalOpen: {signInModalOpen ? 'Open' : 'Closed'}</p> */}
			{!isAuthenticated && (
				<p
					className={styles.signInButton}
					onClick={toggleSignInModal}>
					Увійти
				</p>
			)}

			{signInModalOpen && (
				<div className={`${styles.shadow} ${styles.fadeIn}`}>
					<div className={`${styles.signIn} `}>
						<div
							className={styles.signIn__icon}
							onClick={toggleSignInModal}>
							<div className={styles.signIn__icon__helper}></div>
							<img
								className={styles.signIn__icon__logo}
								src={miniLogo}
								alt='UHelp logo'
							/>
							<CloseIcon className={styles.signIn__icon__close} />
						</div>

						<div className={styles.signIn__wrapper}>
							<h3 className={styles.signIn__title}>Увійти в аккаунт</h3>
							<p className={styles.signIn__description}>
								Будь ласка, введіть дані для входу до акаунту
							</p>

							<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
								<div className={styles.signIn__google}>
									<img
										src={googleIcon}
										alt='google logo'
									/>{' '}
									<GoogleSignIn changeGoogleAuthToken={changeGoogleAuthToken} />
								</div>
							</GoogleOAuthProvider>

							<p className={styles.signIn__separator}>або</p>

							<SignInForm
								formik={formik}
								loginError={loginError}
								styles={styles}
							/>

							<div className={styles.noAccount}>
								<p className={styles.noAccount__text}>Немає аккаунту?</p>
								<p
									className={styles.noAccount__signUp}
									onClick={openSignUp}>
									Зареєструватися
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{isOpen && <style>{'body { overflow: hidden; } .shadow { overflow: scroll; }'}</style>}
		</>
	);
}
