import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from '../../../config/axios/axios';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import step_logo from '../../../assets/img/icons/logo/step_logo.svg';
import envelope from '../../../assets/img/icons/icons-SignUp/envelope.svg';
import arrow_back from '../../../assets/img/icons/icons-SignUp/arrow_back.svg';

import CountdownTimer from '../../CountdownTimer/CountdownTimer';
import { URL_RESEND_EMAIL } from '../../../config/API_url';
import CustomButton from '../../CustomButton/CustomButton';

import styles from './VerifyInfo.module.scss';
import SignUpForm from '../SignUpForm/SignUpForm';

const VerifyInfo = () => {
	const { t } = useTranslation();
	const [showButton, setShowButton] = useState(false);
	const [timerFinished, setTimerFinished] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);

	const user = useSelector((state) => state.auth?.user);

	user && localStorage.setItem('userData', JSON.stringify(user));

	const handleTimerEnd = () => {
		setTimerFinished(true);
	};

	useEffect(() => {
		if (timerFinished) {
			setShowButton(true);
		}
	}, [timerFinished]);

	const handleResend = async () => {
		try {
			const data = await axios.post(URL_RESEND_EMAIL, {
				email: user.email,
			});
			return data;
		} catch (error) {
			return error.message;
		}
	};
	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className={styles.verify_info}>
				<div className={`${styles.verify_info_main} ${styles.container_main}`}>
					<Link
						to='/'
						className={styles.verify_info_main_logo}>
						<img
							src={step_logo}
							alt='Logo'
						/>
					</Link>
					<img
						className={styles.img_phone}
						src={envelope}
						alt='Phone'
					/>
					<h2 className={styles.title}>{t('textSignUp.h2VerifyInfo')}</h2>
					<div className={styles.flex_text}>
						<span className={styles.text}>{t('textSignUp.weSentALetter')}</span>
						<Link className={styles.text_link}>{user?.email}</Link>
					</div>
					<span className={`${styles.text} ${styles.margin_bottom}`}>
						{t('textSignUp.clickOnTheLink')}
					</span>
					<div className={styles.text}>
						<span className={styles.text}>{t('textSignUp.didntNotGetTheEmail')}</span>
					</div>

					<CountdownTimer
						onTimerEnd={handleTimerEnd}
						style={{ margin: '0 0 120px 0' }}
					/>
					{showButton && (
						<button
							onClick={handleResend}
							className={`${styles.text_link} ${styles.link_send}`}>
							{t('textSignUp.sandAgain')}
						</button>
					)}

					<CustomButton
						htmlType='button'
						type='secondary'
						isDisable={false}
						onClick={openModal}>
						<img
							src={arrow_back}
							alt='back'
						/>
						<span className={styles.btn_back}>{t('textSignUp.returnToRegistration')}</span>
					</CustomButton>
					<SignUpForm
						isOpen={isModalOpen}
						onClose={closeModal}
					/>
				</div>

				<aside className={styles.aside}>
					<div className={styles.aside_bg}></div>
				</aside>
			</div>
		</>
	);
};

export default VerifyInfo;
