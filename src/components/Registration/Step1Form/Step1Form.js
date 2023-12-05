import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Input } from 'antd';

import error from '../../../assets/img/icons/icons-SignUp/error.svg';
import CustomButton from '../../CustomButton/CustomButton';
import { useValidation } from '../../../helpers/validation';

import styles from './Step1Form.module.scss';

const Step1Form = ({ onNext }) => {
	const { t } = useTranslation();
	const [lastName, setLastName] = useState('');
	const { validateFirstName } = useValidation();

	const handleChangeLastName = (e) => {
		const { value } = e.target;
		const filteredValue = value.replace(/[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ'-]/g, '');
		const truncatedValue = filteredValue.slice(0, 20);
		setLastName(truncatedValue);
	};

	const handleSubmit = (values) => {
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
										validate={(value) => validateFirstName(value)}>
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
								<CustomButton
									htmlType='submit'
									type='primary'
									isDisable={!isValid || !dirty || isSubmitting}
									onClick={handleSubmit}>
									{t('textSignUp.continue')}
								</CustomButton>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Step1Form;
