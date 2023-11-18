import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import { Form, Input } from 'antd';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

import styles from './Step1Form.module.scss';

const Step1Form = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.step1}>
				<div className={styles.container}>
					<h2 className={styles.title}>{t('textSignUp.textStep1.titleH2')}</h2>
					<p className={styles.text}>{t('textSignUp.textStep1.description')}</p>
					<Form
						name='step1'
						layout='vertical'
						className={styles.form}>
						<Form.Item
							name='firstName'
							className={styles.form_item}
							label={t('textSignUp.textStep1.name')}>
							<Input
								className={styles.input}
								placeholder={t('textSignUp.textStep1.enterYourName')}
							/>
						</Form.Item>
						<Form.Item
							name='surName'
							className={styles.form_item}
							label={t('textSignUp.textStep1.surname')}>
							<Input
								className={styles.input}
								placeholder={t('textSignUp.textStep1.enterSurname')}
							/>
						</Form.Item>
						<Link to='/Step2Form'>
							<ButtonPrimary>{t('textSignUp.continue')}</ButtonPrimary>
						</Link>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Step1Form;
