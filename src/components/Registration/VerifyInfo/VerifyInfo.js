import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import step_logo from '../../../assets/img/icons/logo/step_logo.svg';
import envelope from '../../../assets/img/icons/icons-SignUp/envelope.svg';
import img_aside_info from '../../../assets/img/img-sign-up/img_aside_info.png';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';

import styles from './VerifyInfo.module.scss';

const VerifyInfo = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

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
						<Link
							to={'/stepLayout'}
							className={styles.text_link}>
							{'mail@gmail.com'}
						</Link>
					</div>
					<span className={`${styles.text} ${styles.margin_bottom}`}>
						{t('textSignUp.clickOnTheLink')}
					</span>
					<div className={styles.text}>
						<span className={styles.text}>{t('textSignUp.didntNotGetTheEmail')}</span>
					</div>

					<button className={`${styles.text_link} ${styles.link_send}`}>
						{t('textSignUp.sandAgain')}
					</button>

					<ButtonSecondary onClick={() => navigate('/')}>
						{t('textSignUp.returnToRegistration')}
					</ButtonSecondary>
				</div>

				<aside className={styles.aside}>
					<div className={styles.aside_bg}>
						<img
							src={img_aside_info}
							alt='background'
						/>
					</div>
				</aside>
			</div>
		</>
	);
};

export default VerifyInfo;
