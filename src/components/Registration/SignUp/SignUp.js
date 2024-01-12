import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Button, ConfigProvider, Modal } from 'antd';
import google from '../../../assets/img/icons/icons-SignUp/google.svg';
import sign_up1_logo from '../../../assets/img/icons/logo/sign_up1_logo.svg';
import arrow_back from '../../../assets/img/icons/icons-SignUp/arrow_back.svg';
import CustomButton from '../../CustomButton/CustomButton';
import GoogleSignIn from '../../SignIn/googleSignIn/GoogleSignIn';
import { setAuthToken, setGoogleAuthToken } from '../../../store/slices/signInSlice';
import axios from '../../../config/axios/axios';

import styles from './SignUp.module.scss';
import { URL_AUTH_GOOGLE } from '../../../config/API_url';

const ModalFooter = ({ toggleSignUpModal, toggleSignInModal, toggleSignUpFormModal }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const changeAuthToken = (authToken) => {
	// 	dispatch(setAuthToken(authToken));
	// };

	const changeGoogleAuthToken = (authToken) => {
		dispatch(setGoogleAuthToken(authToken));
		toggleSignUpModal();
		socialLogin(authToken);
	};

	const openSinUpForm = () => {
		toggleSignUpModal();
		toggleSignUpFormModal();
	};

	const openSinIn = () => {
		toggleSignUpModal();
		toggleSignInModal();
	};

	const socialLogin = async (google_token) => {
		try {
			const formData = new FormData();
			formData.append('access_token', google_token);
			const response = await axios.post(URL_AUTH_GOOGLE, formData);
			localStorage.setItem('userId', response.user_id);
			localStorage.setItem('fullName', response.full_name);
			dispatch(setAuthToken(response.token));
			navigate(response.redirect_url);
		} catch (error) {
			console.error('Error during social login:', error.message);
		}
	};

	return (
		<>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
				<div className={styles.signUpGoogle}>
					<img
						src={google}
						alt='google logo'
					/>
					<GoogleSignIn changeGoogleAuthToken={changeGoogleAuthToken} />
				</div>
			</GoogleOAuthProvider>
			<span className={styles.spanOr}>{t('textSignUp.or')}</span>
			<CustomButton
				type='primary'
				htmlType='button'
				onClick={openSinUpForm}>
				<span className={styles.button_pr_inner}>{t('textSignUp.signUpWithEmail')}</span>
			</CustomButton>
			<span className={styles.bottomSpan}>
				{t('textSignUp.alreadyHaveAnAccount')}
				<Link
					type='link'
					onClick={openSinIn}>
					{t('textSignUp.signIn')}
				</Link>
			</span>
		</>
	);
};

const SignUp = ({
	signUpModalOpen,
	toggleSignUpModal,
	toggleSignUpFormModal,
	toggleSignInModal,
	currentPage,
}) => {
	const { t } = useTranslation();

	const buttonStyles =
		currentPage === 'verifyInfo' ? 'btn_modal_open_varify_info' : 'btn_modal_open';

	const buttonChildren =
		currentPage === 'verifyInfo' ? (
			<div className={styles.button_children}>
				<img
					src={arrow_back}
					alt='back'
					style={{ width: '24px', height: '24px' }}
				/>
				<span className={styles.btn_back}>{t('textSignUp.returnToRegistration')}</span>{' '}
			</div>
		) : (
			t('textSignUp.signUp')
		);

	const buttonHover = currentPage === 'verifyInfo' ? 'rgba(255, 0, 0, 0)' : '#3989EC';
	const buttonType = currentPage === 'verifyInfo' ? 'primary' : '';

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimaryHover: buttonHover,
					},
				}}>
				<Button
					type={buttonType}
					block={true}
					className={styles[buttonStyles]}
					onClick={toggleSignUpModal}>
					{buttonChildren}
				</Button>
			</ConfigProvider>

			<Modal
				open={signUpModalOpen}
				closeIcon={
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M13.8179 12L20.623 5.19488C21.1257 4.69347 21.1257 3.87843 20.623 3.37702C20.1203 2.87433 19.3077 2.87433 18.805 3.37702L12 10.182L5.19496 3.37702C4.69226 2.87433 3.87972 2.87433 3.37702 3.37702C2.87433 3.87843 2.87433 4.69347 3.37702 5.19488L10.1821 12L3.37702 18.805C2.87433 19.3064 2.87433 20.1215 3.37702 20.6229C3.62773 20.8736 3.95686 20.9996 4.28599 20.9996C4.61512 20.9996 4.94425 20.8736 5.19496 20.6229L12 13.8179L18.805 20.6229C19.0557 20.8736 19.3849 20.9996 19.714 20.9996C20.0431 20.9996 20.3723 20.8736 20.623 20.6229C21.1257 20.1215 21.1257 19.3064 20.623 18.805L13.8179 12Z'
							fill='#03091C'
						/>
					</svg>
				}
				centered
				width={580}
				className={styles.modal}
				onCancel={toggleSignUpModal}
				footer={
					<ModalFooter
						toggleSignUpModal={toggleSignUpModal}
						toggleSignInModal={toggleSignInModal}
						toggleSignUpFormModal={toggleSignUpFormModal}
					/>
				}>
				<div className={styles.header_modal_wrapper}>
					<Link
						to={'/'}
						className={styles.logo}>
						<img
							src={sign_up1_logo}
							alt='Logo'
						/>
					</Link>
					<h4 className={styles.title}>{`${t('textSignUp.signUpTo')} U-Help`}</h4>
					<p className={styles.description}>{t('textSignUp.signUpDescription')}</p>
				</div>
			</Modal>
		</>
	);
};

export default SignUp;
