import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Input } from 'antd';

import error from '../../../assets/img/icons/icons-SignUp/error.svg';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

import styles from './Step1Form.module.scss';

const Step1Form = ({ onNext }) => {
	const { t } = useTranslation();
	const [lastName, setLastName] = useState('');

	const validateFirstName = (value) => {
		let error;
		if (!value) {
			error = 'Це поле обов’язкове. Заповніть його';
		} else if (!/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/.test(value)) {
			error = 'Можна використовувати тільки літери';
		}
		return error;
	};

	const handleChangeLastName = (e) => {
		const { value } = e.target;
		// Replace any non-alphabetic characters with an empty string
		const filteredValue = value.replace(/[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ]/g, '');
		setLastName(filteredValue); // Set the filtered value in the state
	};

	const handleSubmit = (values) => {
		console.log(values);
		onNext();
	};

	return (
		<>
			<div className={styles.step1}>
				<div className={styles.container}>
					<h2 className={styles.title}>{t('textSignUp.textStep1.titleH2')}</h2>
					<p className={styles.text}>{t('textSignUp.textStep1.description')}</p>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
						}}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(false);
							onNext();
							console.log(values);
						}}>
						{({ isSubmitting, isValid, dirty, touched, errors }) => (
							<Form className={styles.form}>
								{/* input first name----------------------------------------------------------------------- */}
								<div>
									<label
										htmlFor='span'
										className={`${styles.label} ${styles.label_required}`}>
										{t('textSignUp.textStep1.name')}
									</label>
									<Field
										name='firstName'
										validate={validateFirstName}>
										{({ field }) => (
											<Input
												{...field}
												type='text'
												name='firstName'
												autoComplete='off'
												status={errors.firstName ? 'error' : ''}
												className={`${styles.input} ${errors.firstName ? styles.invalid : ''}`}
											/>
										)}
									</Field>
									{errors.firstName && touched.firstName && (
										<div className={styles.error}>
											<div className='img_wrapper'>
												<img
													className={styles.img_er}
													style={{ width: '20px' }}
													src={error}
													alt='error'
												/>
											</div>
											{errors.firstName}
										</div>
									)}
								</div>

								{/* input last name ----------------------------------------------------------------------- */}
								<div className={styles.m_b}>
									<label
										htmlFor='span'
										className={styles.label}>
										{t('textSignUp.textStep1.lastName')}
									</label>
									<Field name='lastName'>
										{({ field }) => (
											<Input
												{...field}
												type='text'
												name='lastName'
												onChange={handleChangeLastName}
												value={lastName}
												autoComplete='off'
												placeholder={t('textSignUp.textStep1.enterLastName')}
												className={styles.input}
											/>
										)}
									</Field>
								</div>

								{/* button submit ---------------------------------------------------------- */}
								<ButtonPrimary
									htmlType='submit'
									isDisable={!isValid || !dirty || isSubmitting}
									onClick={handleSubmit}>
									{t('textSignUp.continue')}
								</ButtonPrimary>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Step1Form;
