import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Checkbox, Input, ConfigProvider } from 'antd';
import { Formik, Form, Field } from 'formik';
import error from '../../../assets/img/icons/icons-SignUp/error.svg';
import success from '../../../assets/img/icons/icons-SignUp/success.svg';
import open_eye from '../../../assets/img/icons/icons-SignUp/open_eye.svg';
import closed_eye from '../../../assets/img/icons/icons-SignUp/closed_eye.svg';
import { fetchRegisterEmail } from '../../../store/slices/authSlice';
import CustomButton from '../../CustomButton/CustomButton';
import { useValidation } from '../../../helpers/validation';

import styles from './SignUpForm.module.scss';
import emailValidationServer from '../../../api/emailValidationServer';

const SignUpForm = ({ signUpFormModalOpen, toggleSignUpFormModal, toggleSignInModal }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const status = useSelector((state) => state.auth?.status);
	const [isError, setIsError] = useState(false);
	const [emailValue, setEmailValue] = useState('');
	const [prevEmailValue, setPrevEmailValue] = useState('');

	const [confirmPasswordError, setConfirmPasswordError] = useState('#0D101D');
	// console.log('confirmPasswordError', confirmPasswordError);
	useEffect(() => {
		if (status === 'error') {
			setIsError(true);
		}
	}, [isError, status]);

	useEffect(() => {
		if (prevEmailValue !== emailValue) {
			setIsError(false);
		}
	}, [emailValue, isError, prevEmailValue]);

	const {
		validateEmail,
		validateCheckBox,
		validateConfirmPassword,
		validatePassword,
		validWarnings,
	} = useValidation();

	// useEffect(() => {
	// 	const isValid = emailValidationServer(value);
	// }, []);

	// 	const someOtherFunction = async (values) => {
	// 		const isValid = await emailValidationServer(values);
	// 		// setActiveButton(isValid);
	// 		// setErrorEmail(!isValid);
	// 		// isValid && setEmailValue(values);
	// };

	const openSignIn = () => {
		toggleSignUpFormModal();
		toggleSignInModal();
	};

	return (
		<>
			<Modal
				open={signUpFormModalOpen}
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
				title={t('textSignUp.signUpWithEmailTitle')}
				onCancel={toggleSignUpFormModal}
				footer={null}>
				<p className={styles.description}>{t('textSignUp.signUpDescription')}</p>

				<Formik
					initialValues={{
						email: '',
						password: '',
						confirmPassword: '',
						checked: false,
					}}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						try {
							// Sending a request to the server
							const user = {
								email: values.email,
								password1: values.password,
								password2: values.confirmPassword,
							};
							setPrevEmailValue(values.email);

							const response = await dispatch(fetchRegisterEmail(user));

							if (fetchRegisterEmail.fulfilled.match(response)) {
								navigate('/verifyInfo');
								resetForm();
							}
							// If there are errors, they will be handled in the fetchRegisterEmail thunk
						} catch (error) {
							console.error(error.response.data.email[0]);
						} finally {
							setSubmitting(false);
						}
					}}>
					{({ isSubmitting, errors, isValid, dirty, values, touched }) => (
						<Form className={styles.form}>
							{/* input email------------------------------------------------- */}
							<div className={styles.inputWrapper}>
								<label
									className={styles.label}
									htmlFor='email'>
									{t('textSignUp.email')}
								</label>

								<ConfigProvider
									theme={{
										token: {
											colorTextPlaceholder: '#47474F',
											colorText: '#0D101D',
											colorBorder: '#126FE1',
											colorBgContainer: '#FDFEFF',
										},
									}}>
									<Field
										name='email'
										validate={(values) => {
											setEmailValue(values);
											return validateEmail(values);
										}}>
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
								</ConfigProvider>
								<div className={styles.error_message_wrapper}>
									{/* check for mail uniqueness============================ */}
									{isError && (
										<div className={`${styles.error} ${styles.error_big_size}`}>
											<div className={styles.img_wrapper}>
												<img
													className={styles.img_er}
													style={{
														width: '24px',
														height: '24px',
														marginRight: '8px',
													}}
													src={error}
													alt='error'
												/>
												{t('textSignUp.error.mailIsAlreadyInUse')}
											</div>
										</div>
									)}
									{/* other error messages ================================= */}
									{errors.email && touched.email && (
										<div className={styles.error}>
											<div className={`${styles.error} ${styles.error_big_size}`}>
												<img
													className={styles.img_er}
													style={{ width: '24px', height: '24px', marginRight: '8px' }}
													src={error}
													alt='error'
												/>
												{errors.email}
											</div>
										</div>
									)}
								</div>
							</div>

							{/* input password------------------------------------------------ */}

							<ConfigProvider
								theme={{
									token: {
										// colorTextPlaceholder: `${errors.password && touched.password && '#B3261E'}`,
										colorTextPlaceholder: '#47474F',
										colorText: `${errors.password && touched.password && '#B3261E'}`,
									},
								}}>
								<div className={styles.inputWrapper}>
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
												style={{ color: errors.password && '#a7a7b2' }}
												className={`${styles.input} ${
													errors.password && touched.password ? styles.invalid : ''
												} ${
													errors.confirmPassword?.success && touched.confirmPassword
														? styles.success
														: ''
												}`}
											/>
										)}
									</Field>

									<div className={styles.error_message_wrapper}>
										{errors.password && touched.password && (
											<ul>
												{validWarnings.map((msg, i) => (
													<li
														className={`${styles.error} ${
															msg.isWarning ? styles.input_success : ''
														}`}
														key={i}>
														<div className={styles.img_wrapper}>
															<img
																className={styles.img_er}
																style={{ width: '16px', height: '16px', marginRight: '4px' }}
																src={!msg.isWarning ? error : success}
																alt='error'
															/>
															{msg.message}
														</div>
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</ConfigProvider>

							{/* input passwordConfirm------------------------------------------------------------ */}
							{/* {console.log(confirmPasswordError?.success)} */}
							<ConfigProvider
								theme={{
									token: {
										// colorTextPlaceholder: `${
										// 	errors.confirmPassword ? touched.confirmPassword && '#B3261E' : '#228326'
										// }`,
										colorTextPlaceholder: '#47474F',
										// colorText: '#0D101D',
										// colorText: `${
										// 	(confirmPasswordError?.error && '#228326') ||
										// 	(confirmPasswordError?.access && '#B3261E') ||
										// 	(!confirmPasswordError?.access && !confirmPasswordError?.error && '#0D101D')
										// }`,
									},
								}}>
								<div className={styles.inputWrapper}>
									<label
										htmlFor='confirmPassword'
										className={styles.label}>
										{t('textSignUp.confirmPassword')}
									</label>
									<Field
										name='confirmPassword'
										validate={(value) => {
											setConfirmPasswordError(errors.confirmPassword);
											return validateConfirmPassword(value);
										}}
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
													errors.confirmPassword?.error && touched.confirmPassword
														? styles.invalid
														: ''
												} ${
													errors.confirmPassword?.success && touched.confirmPassword
														? styles.success
														: ''
												}`}
												// className={`${styles.input} ${
												// 	errors.confirmPassword && touched.confirmPassword ? styles.invalid : ''
												// } `}
												placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
											/>
										)}
									</Field>
									<div className={styles.error_message_wrapper}>
										{/* {console.log(errors)} */}
										{errors.confirmPassword && touched.confirmPassword && (
											// {errors.confirmPassword?.error && touched.confirmPassword && (
											<div className={`${styles.error} ${styles.error_big_size}`}>
												<div className={styles.img_wrapper}>
													<img
														className={styles.img_er}
														style={{ width: '24px', height: '24px', marginRight: '8px' }}
														src={error}
														alt='error'
													/>
													{/* {errors.confirmPassword.error} */}
													{errors.confirmPassword}
												</div>
											</div>
										)}
										{/* // {errors.confirmPassword?.success && touched.confirmPassword && (
										// 	<div className={styles.success}>
										// 		<div className={styles.img_wrapper}>
										// 			<img
										// 				className={styles.img_success}
										// 				style={{ width: '24px', height: '24px', marginRight: '8px' }}
										// 				src={success}
										// 				alt='success'
										// 			/>
										// 			{errors.confirmPassword.success}
										// 		</div>
										// 	</div>
										// )} */}
									</div>
								</div>
							</ConfigProvider>

							{/* checkbox ------------------------------------------ */}
							<label
								style={{ dispay: 'block' }}
								className={styles.checkbox_label}>
								<Field
									type='checkbox'
									name='checked'
									validate={(value) => validateCheckBox(value, t)}
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
									{t('textSignUp.agree')}{' '}
									<Link
										to='/'
										className={styles.link}>
										The Terms and Conditions
									</Link>
								</span>
							</label>
							{/* button submit ----------------------- */}
							<CustomButton
								htmlType='submit'
								type='primary'
								// isDisable={!isValid || !isError || !dirty || isSubmitting}
								isDisable={!isValid || !dirty || isSubmitting}>
								{/* {console.log(!isValid)} */}
								<span className={styles.btn_submit_text}>{t('textSignUp.signUp')}</span>
							</CustomButton>
						</Form>
					)}
				</Formik>
				<span className={styles.bottomLinkWrapper}>
					{t('textSignUp.alreadyHaveAnAccount')}
					<Link
						onClick={openSignIn}
						className={styles.link}>
						{t('textSignUp.signIn')}
					</Link>
				</span>
			</Modal>
		</>
	);
};

export default SignUpForm;
