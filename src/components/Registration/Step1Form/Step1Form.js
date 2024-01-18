import React from 'react';
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
	const { validateUserName } = useValidation();
	const { validateFullName } = useValidation();

	return (
		<>
			<div className={styles.step1}>
				<div className={styles.container}>
					<h2 className={styles.title}>{t('textSignUp.textStep1.titleH2')}</h2>
					<p className={styles.text}>{t('textSignUp.textStep1.description')}</p>
					<Formik
						// {const getGoogleFullName = window.localStorage.getItem('full_name')
						initialValues={{
							userName: '',
							fullName: window.localStorage.getItem('fullName') || '',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							try {
								await dispatch(
									fetchUpdateName({
										id: user?.id,
										user_name: values?.userName,
										full_name: values?.fullName,
									})
								);
								localStorage.setItem('fullName', '');
								onNext();
							} catch (error) {
								console.error('Error updating user data:', error);
							}
						}}>
						{({ isSubmitting, isValid, dirty, touched, errors }) => (
							<Form className={styles.form}>
								{/* input user name----------------------------------------------------------------------- */}
								<div className={styles.userNameWrapper}>
									<label
										htmlFor='span'
										className={styles.label}>
										Нікнейм
									</label>
									<Field
										name='userName'
										validate={(value) => validateUserName(value)}>
										{({ field }) => (
											<Input
												{...field}
												type='text'
												name='userName'
												autoComplete='off'
												placeholder={t('textSignUp.textStep1.enterUserName')}
												status={errors.userName ? 'error' : ''}
												className={`${styles.input} ${errors.userName ? styles.invalid : ''}`}
											/>
										)}
									</Field>
									{errors.userName && touched.userName && (
										<div className={styles.error}>
											<div className={styles.img_wrapper}>
												<img
													className={styles.img_er}
													style={{ width: '16px', display: 'block' }}
													src={error}
													alt='error'
												/>
											</div>
											{errors.userName}
										</div>
									)}
									<span className={styles.info}>{t('textSignUp.textStep1.infoUserName')}</span>
								</div>

								{/* input full name ----------------------------------------------------------------------- */}
								<div className={styles.fullNameWrapper}>
									<label
										htmlFor='span'
										className={styles.label}>
										{t('textSignUp.textStep1.fullName')}
									</label>
									<Field
										name='fullName'
										validate={(value) => validateFullName(value)}>
										{({ field }) => (
											<Input
												{...field}
												type='text'
												name='fullName'
												autoComplete='off'
												placeholder={t('textSignUp.textStep1.enterFullName')}
												status={errors.fullName ? 'error' : ''}
												className={`${styles.input} ${errors.fullName ? styles.invalid : ''}`}
											/>
										)}
									</Field>
									{errors.fullName && touched.fullName && (
										<div className={styles.error}>
											<div className={styles.img_wrapper}>
												<img
													className={styles.img_er}
													style={{ width: '16px', display: 'block' }}
													src={error}
													alt='error'
												/>
											</div>
											{errors.fullName}
										</div>
									)}
									{/* <span className={styles.info}>{t('textSignUp.textStep1.infoFullName')}</span> */}
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
