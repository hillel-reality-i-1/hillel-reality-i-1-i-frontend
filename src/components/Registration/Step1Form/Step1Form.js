import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Input } from 'antd';

import error from '../../../assets/img/icons/icons-SignUp/error.svg';
import CustomButton from '../../CustomButton/CustomButton';
import { useValidation } from '../../../helpers/validation';
import { fetchUpdateName } from '../../../store/slices/authSlice';

import styles from './Step1Form.module.scss';

const Step1Form = ({ onNext }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth?.user);
	const [lastName, setLastName] = useState('');
	const { validateFirstName } = useValidation();

	const handleChangeLastName = (e) => {
		const { value } = e.target;
		const filteredValue = value.replace(/[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ'-]/g, '');
		const truncatedValue = filteredValue.slice(0, 20);
		setLastName(truncatedValue);
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
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							try {
								await dispatch(
									fetchUpdateName({
										id: user?.id,
										first_name: values?.firstName,
										last_name: lastName,
									})
								);
								onNext();
							} catch (error) {
								console.error('Error updating user data:', error);
							}
						}}>
						{({ isSubmitting, isValid, dirty, touched, errors }) => (
							<Form className={styles.form}>
								{/* input first name----------------------------------------------------------------------- */}
								<div className={styles.firstNameWrapper}>
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
												placeholder={t('textSignUp.textStep1.enterYourName')}
												status={errors.firstName ? 'error' : ''}
												className={`${styles.input} ${errors.firstName ? styles.invalid : ''}`}
											/>
										)}
									</Field>
									{errors.firstName && touched.firstName && (
										<div className={styles.error}>
											<div className={styles.img_wrapper}>
												<img
													className={styles.img_er}
													style={{ width: '16px', display: 'block' }}
													src={error}
													alt='error'
												/>
											</div>
											{errors.firstName}
										</div>
									)}
									<span className={styles.infoFirstName}>
										{t('textSignUp.textStep1.infoFirstname')}
									</span>
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
									isDisable={!isValid || !dirty || isSubmitting}>
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
