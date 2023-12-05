import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Button, Modal } from 'antd';

import google from '../../../assets/img/icons/icons-SignUp/google.svg';
import sign_up1_logo from '../../../assets/img/icons/logo/sign_up1_logo.svg';
import SignUpForm from '../SignUpForm/SignUpForm';

import styles from './SignUp.module.scss';

const ModalFooter = ({ handleCancelFirst }) => {
	const { t } = useTranslation();
	return (
		<>
			<Button
				key='google'
				shape='round'
				size='large'
				className={styles.signUpGoogle}>
				{
					<img
						src={google}
						alt='Google'
					/>
				}
				<span className={styles.signUpWithGoogle}>{t('textSignUp.signUpWithGoogle')}</span>
			</Button>
			<span className={styles.spanOr}>{t('textSignUp.or')}</span>
			<button onClick={handleCancelFirst}>
				<SignUpForm />
			</button>
			<span className={styles.bottomSpan}>
				{t('textSignUp.alreadyHaveAnAccount')}
				<a
					href='/'
					type='link'>
					{t('textSignUp.signIn')}
				</a>
			</span>
		</>
	);
};

const SignUp = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const showModalFirst = () => {
		setOpen(true);
	};

	const handleCancelFirst = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				type='primary'
				className={styles.btn_modal_open}
				onClick={showModalFirst}>
				{t('textSignUp.signUp')}
			</Button>

			<Modal
				open={open}
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
				onCancel={handleCancelFirst}
				footer={<ModalFooter handleCancelFirst={handleCancelFirst} />}>
				<div className={styles.header_modal_wrapper}>
					<Link
						to='/'
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