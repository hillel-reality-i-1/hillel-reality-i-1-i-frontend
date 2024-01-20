import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import miniLogo from '../../assets/img/icons/icons-signIn/mini-logo-signIn.png';
import googleIcon from '../../assets/img/icons/icons-signIn/google-button-icon.png';
import GoogleSignIn from './googleSignIn/GoogleSignIn';
import { validateSignInForm } from '../../helpers/validation';
import SignInForm from './SignInForm/SignInForm';
import { API_URL_SIGN_IN } from '../../config/API_url';
import { setAuthToken, setGoogleAuthToken } from '../../store/slices/signInSlice';

import styles from './signIn.module.scss';

export default function SignIn({
	currentPage,
	signInModalOpen,
	toggleSignInModal,
	toggleSignUpModal,
}) {
	const [loginError, setLoginError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const changeAuthToken = (authToken) => {
		dispatch(setAuthToken(authToken));
	};

	const changeGoogleAuthToken = (authToken) => {
		dispatch(setGoogleAuthToken(authToken));
		toggleSignInModal();
		socialLogin(authToken)
		setLoginError(null);
		setIsAuthenticated(true);
	};

	const openSignUp = () => {
		toggleSignInModal();
		toggleSignUpModal();
	};

	const handleSignIn = async (values) => {
		try {
			const response = await axios.post(API_URL_SIGN_IN, values);
			const authToken = response.data.key;
			changeAuthToken(authToken);
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
		initialStatus: {
			isValid: false, 
		  },
		onSubmit: handleSignIn,
	});

	const buttonStyles = currentPage === 'verifyInfo' ? 'btn_modal_open_varify_info' : 'signInButton';

	const socialLogin = async (google_token) => {
		try {
		  const formData = new FormData();
		  formData.append('access_token', google_token);
		  const response = await axios.post(process.env.REACT_APP_API_BASE_URL +'/api/v1/social-login/', formData);
		  const result = response.data;
		  dispatch(setAuthToken(result.token));
		  navigate(result.redirect_url)
		} catch (error) {
		  console.error('Error during social login:', error.message);
		}
	};

	return (
		<>
			{!isAuthenticated && (
				<a
					className={styles[buttonStyles]}
					onClick={toggleSignInModal}>
					Увійти
				</a>
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
							<h3 className={styles.signIn__title}>Увійти в акаунт</h3>
							<p className={styles.signIn__description}>
								Будь ласка, введіть дані для входу в акаунт
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
								<p className={styles.noAccount__text}>Немає акаунту?</p>
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
		</>
	);
}