import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Modal, Button, Checkbox, Input, ConfigProvider } from 'antd';
import { Formik, Form, Field } from 'formik';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import error from '../../../assets/img/icons/icons-SignUp/error.svg';
import success from '../../../assets/img/icons/icons-SignUp/success.svg';
import open_eye from '../../../assets/img/icons/icons-SignUp/open_eye.svg';
import closed_eye from '../../../assets/img/icons/icons-SignUp/closed_eye.svg';

import styles from './SignUpForm.module.scss';

const SignUpForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState('');
	const [validWarnings, setValidWarnings] = useState([]);

	// validateEmail====================================//

	const validateEmail = (value) => {
		let error;
		if (!value) {
			error = t('textSignUp.error.required');
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = t('textSignUp.error.email');
		}
		return error;
	};

	// validate Password==========================//

	const validatePasswordLength = (value) => {
		if (value.length < 8) {
			return t('textSignUp.error.length');
		}
		return null;
	};

	const validatePasswordSymbol = (value) => {
		if (!/[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
			return t('textSignUp.error.symbolNumber');
		}
		return null;
	};

	const validatePasswordCase = (value) => {
		if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
			return t('textSignUp.error.register');
		}
		return null;
	};

	const validatePassword = (value) => {
		setPassword(value);
		let messages = [];

		// Validate password length
		const lengthError = validatePasswordLength(value);
		if (lengthError) {
			messages.push({ message: lengthError, isWarning: false });
		} else {
			messages.push({ message: t('textSignUp.error.length'), isWarning: true });
		}

		// Validate password symbols
		const symbolError = validatePasswordSymbol(value);
		if (symbolError) {
			messages.push({ message: symbolError, isWarning: false });
		} else {
			messages.push({ message: t('textSignUp.error.symbolNumber'), isWarning: true });
		}

		// Validate password case
		const caseError = validatePasswordCase(value);
		if (caseError) {
			messages.push({ message: caseError, isWarning: false });
		} else {
			messages.push({ message: t('textSignUp.error.register'), isWarning: true });
		}

		// Update the validWarnings state with the array of messages
		setValidWarnings(messages);

		const errors = messages
			.filter((msg) => !msg.isWarning && msg.message !== null)
			.map((msg) => msg.message);

		// Return null when there are no errors
		return errors.length === 0 ? null : errors;
	};

	const validateConfirmPassword = (value, password) => {
		let error;
		if (!value) {
			error = t('textSignUp.error.required');
		} else if (value !== password) {
			error = t('textSignUp.error.coincidence');
		}
		return error;
	};

	const validateCheckBox = (checked) => {
		let error;
		if (!checked) {
			error = t('textSignUp.error.required');
		}
		return error;
	};

	const showModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleSubmit = (values, { setSubmitting }) => {
		setSubmitting(false);
		console.log(values);
		setOpen(false);
		navigate('/verifyInfo');
	};

	return (
		<>
			{' '}
			<Button
				type='primary'
				onClick={showModal}
				className={styles.btn_open_modal}>
				{t('textSignUp.signUpWithEmail')}
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
				title={t('textSignUp.signUpWithEmail')}
				onCancel={handleCancel}
				footer={null}>
				<p className={styles.description}>{t('textSignUp.signUpDescription')}</p>

				<Formik
					initialValues={{
						email: '',
						password: '',
						confirmPassword: '',
						checked: false,
					}}
					onSubmit={(values, { setSubmitting }) => {
						navigate('/verifyInfo');
						setSubmitting(false);
						console.log(values);
					}}>
					{({ isSubmitting, errors, isValid, dirty, values, touched }) => (
						<ConfigProvider
							theme={{
								token: {
									colorBorder: '#126FE1',
									colorBgContainer: '#FDFEFF',
								},
							}}>
							<Form className={styles.form}>
								{/* input email------------------------------------------------- */}
								<div>
									<label
										className={styles.label}
										htmlFor='email'>
										{t('textSignUp.email')}
									</label>
									<Field
										name='email'
										validate={validateEmail}>
										{({ field }) => (
											<Input
												{...field}
												type='email'
												name='email'
												autoComplete='off'
												placeholder='your.email@example.com'
												className={`${styles.input} ${
													errors.email && touched.email ? styles.invalid : ''
												}`}
											/>
										)}
									</Field>
									{errors.email && touched.email && (
										<div className={styles.error}>
											<div className='img_wrapper'>
												<img
													className={styles.img_er}
													style={{ width: '18px' }}
													src={error}
													alt='error'
												/>
											</div>
											{errors.email}
										</div>
									)}
								</div>
								{/* input password------------------------------------------------ */}
								<div>
									<label
										htmlFor='password'
										className={styles.label}>
										{t('textSignUp.password')}
									</label>
									<Field
										name='password'
										validate={(value) => validatePassword(value)}
										autoComplete='off'>
										{({ field }) => (
											<Input.Password
												{...field}
												type='password'
												name='password'
												autoComplete='off'
												iconRender={(visible) =>
													visible ? (
														<img
															src={open_eye}
															alt='eye'
														/>
													) : (
														<img
															src={closed_eye}
															alt='eye'
														/>
													)
												}
												placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
												className={`${styles.input} ${
													errors.password && touched.password ? styles.invalid : ''
												}`}
											/>
										)}
									</Field>
									{errors.password && touched.password && (
										<ul>
											{validWarnings.map((msg, i) => (
												<li
													className={`${styles.error} ${msg.isWarning ? styles.input_success : ''}`}
													key={i}>
													<div className='img_wrapper'>
														<img
															className={styles.img_er}
															style={{ width: '18px' }}
															src={!msg.isWarning ? error : success}
															alt='error'
														/>
													</div>
													{msg.message}
												</li>
											))}
										</ul>
									)}
								</div>

								{/* input passwordConfirm------------------------------------------------------------ */}

								<div>
									<label
										htmlFor='confirmPassword'
										className={styles.label}>
										{t('textSignUp.confirmPassword')}
									</label>
									<Field
										name='confirmPassword'
										validate={(value) => validateConfirmPassword(value, password)}
										value={values}>
										{({ field }) => (
											<Input.Password
												{...field}
												type='password'
												name='confirmPassword'
												autoComplete='off'
												iconRender={(visible) =>
													visible ? (
														<img
															src={open_eye}
															alt='eye'
														/>
													) : (
														<img
															src={closed_eye}
															alt='eye'
														/>
													)
												}
												className={`${styles.input} ${
													errors.confirmPassword && touched.confirmPassword ? styles.invalid : ''
												}`}
												placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
											/>
										)}
									</Field>
									{errors.confirmPassword && touched.confirmPassword && (
										<div className={styles.error}>
											<div className='img_wrapper'>
												<img
													className={styles.img_er}
													style={{ width: '18px' }}
													src={error}
													alt='error'
												/>
											</div>
											{errors.confirmPassword}
										</div>
									)}
								</div>

								{/* checkbox ------------------------------------------ */}

								<label
									style={{ dispay: 'block' }}
									className={styles.checkbox_label}>
									<Field
										type='checkbox'
										name='checked'
										validate={validateCheckBox}
										checked={values.checked}>
										{({ field }) => (
											<Checkbox
												{...field}
												checked={values.checked}
												className={styles.checkbox}
											/>
										)}
									</Field>
									<span className={styles.shecked_text}>
										{t('textSignUp.agree')} <a href='/'>The Terms and Conditions</a>
									</span>
								</label>

								{/* button submit ----------------------- */}

								<ButtonPrimary
									htmlType='submit'
									isDisable={!isValid || !dirty || isSubmitting}
									onClick={handleSubmit}>
									<span className={styles.btn_submit_text}>{t('textSignUp.signUp')}</span>
								</ButtonPrimary>
							</Form>
						</ConfigProvider>
					)}
				</Formik>
				<span className={styles.bottomLinkWrapper}>
					{t('textSignUp.alreadyHaveAnAccount')}
					<a
						href='/'
						type='link'>
						{t('textSignUp.signIn')}
					</a>
				</span>
			</Modal>
		</>
	);
};

export default SignUpForm;
