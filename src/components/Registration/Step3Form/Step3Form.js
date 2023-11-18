import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import arrowLeft from '../../../assets/img/icons/icons-SignUp/arrowLeft.svg';
import ua from '../../../assets/img/icons/icons-SignUp/ua.svg';

import styles from './Step3Form.module.scss';

const options = [
	{
		value: '+38',
		label: (
			<span style={{ display: 'flex' }}>
				{' '}
				<img
					src={ua}
					alt='UA'
				/>
				+38
			</span>
		),
	},
	{
		value: '+56',
		label: '+56',
	},
	{
		value: '+31',
		label: '+31',
	},
	{
		value: '+77',
		label: '+77',
	},
];

const Step3Form = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.step3}>
				<div className={styles.container_novigation}>
					<div className={styles.back}>
						{' '}
						<a
							href='/'
							className={styles.back_link}>
							<img
								src={arrowLeft}
								alt='Arrow left'
							/>

							<span className={styles.link_text}>{t('textSignUp.back')}</span>
						</a>
					</div>
				</div>
				<div className={`${styles.container} ${styles.step3_inner}`}>
					<h2 className={styles.title}>{t('textSignUp.textStep3.titleH2')}</h2>

					<span className={styles.text}>{t('textSignUp.textStep3.description')}</span>
					<Form
						name='step3'
						layout='vertical'
						className={styles.form}>
						<Form.Item
							className={styles.form_item}
							name='numberPhone'
							label={t('textSignUp.textStep3.phoneNumber')}>
							<div className={styles.input_wrapper}>
								<Select
									className={styles.phone_select}
									defaultValue='+38'
									options={options}
								/>
								<Input
									className={styles.phone_input}
									placeholder='000 000 00 00'
								/>
							</div>
						</Form.Item>

						<Link to='/verifyCodeForm'>
							<ButtonPrimary>{t('textSignUp.textStep3.getCode')}</ButtonPrimary>
						</Link>
						<div className={styles.link_skip}>
							<a href='/'>{t('textSignUp.skipNow')}</a>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Step3Form;
