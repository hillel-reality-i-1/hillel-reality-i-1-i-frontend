import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import envelope from '../../../assets/img/icons/icons-SignUp/envelope.svg';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

import styles from './VerifyInfo.module.scss';

const VerifyInfo = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className={`${styles.verify_info} ${styles.container}`}>
				<img
					className={styles.img_phone}
					src={envelope}
					alt='Phone'
				/>
				<h2 className={styles.title}>{t('textSignUp.h2VerifyInfo')}</h2>
				<div className={styles.flex_text}>
					<span className={styles.text}>{t('textSignUp.weSentALetter')}</span>
					<Link
						to={'/step1Form'}
						className={styles.text_link}>
						{'mail@gmail.com'}
					</Link>
				</div>
				<span className={`${styles.text} ${styles.margin_bottom}`}>
					{t('textSignUp.clickOnTheLink')}
				</span>
				<div className={styles.text}>
					<span className={styles.text}>{t('textSignUp.didntNotGetTheEmail')}</span>
					{/* <span>{t('textSignUp.sandAgain')}</span>
					<span>{'0:45 s'}</span> */}
				</div>

				<button className={`${styles.text_link} ${styles.link_send}`}>
					{t('textSignUp.sandAgain')}
				</button>
				<ButtonPrimary>{t('textSignUp.returnToRegistration')}</ButtonPrimary>
			</div>
		</>
	);
};

export default VerifyInfo;
