import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../../config/axios/axios';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Input } from 'antd';

import phone from '../../../assets/img/icons/icons-SignUp/phone.svg';
import arrowLeft from '../../../assets/img/icons/icons-SignUp/arrowLeft.svg';
import step_logo from '../../../assets/img/icons/logo/step_logo.svg';
import img_aside_step3 from '../../../assets/img/img-sign-up/img_aside_step3.png';
import CustomButton from '../../CustomButton/CustomButton';
import { useValidation } from '../../../helpers/validation';
import { URL_CHECK_VERIFICATION_CODE, URL_SEND_VERIFICATION_CODE } from '../../../config/API_url';
import CountdownTimer from '../../CountdownTimer/CountdownTimer';
import styles from './VerifyCodeForm.module.scss';

const NumericInput = (props) => {
	const { onChange } = props;

	const handleChange = (e) => {
		const { value: inputValue } = e.target;
		const reg = /^[0-9]*$/;
		if (reg.test(inputValue)) {
			onChange(inputValue);
		}
	};

	return (
		<Input
			{...props}
			onChange={handleChange}
			maxLength={1}
		/>
	);
};

const VerifyCodeForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { phone_number } = useSelector((state) => state.auth?.profile);
	const [value1, setValue1] = useState('');
	const [value2, setValue2] = useState('');
	const [value3, setValue3] = useState('');
	const [value4, setValue4] = useState('');
	const [showButton, setShowButton] = useState(false);
	const [timerFinished, setTimerFinished] = useState(false);
	const [error, setError] = useState(null);

	const { validateInputRequired } = useValidation();

	const handleTimerEnd = () => {
		setTimerFinished(true);
	};

	useEffect(() => {
		if (timerFinished) {
			setShowButton(true);
		}
	}, [timerFinished]);

	const handleResend = async () => {
		try {
			await axios.post(URL_SEND_VERIFICATION_CODE);
		} catch (error) {
			return error.message;
		}
	};

	const handleSubmit = async () => {
		const codePhone = `${value1}${value2}${value3}${value4}`;

		try {
			await axios.post(URL_CHECK_VERIFICATION_CODE, {
				verification_code: codePhone,
			});
			navigate('/user');
		} catch (error) {
			error && setError(error);
			return error.message;
		}
	};

	return (
		<>
			<div className={styles.verify_code}>
				<div className={styles.verify_code_main}>
					<Link
						to='/'
						className={`${styles.container} ${styles.verify_info_main_logo}`}>
						<img
							src={step_logo}
							alt='Logo'
						/>
					</Link>
					<div className={styles.container_novigation}>
						<div className={styles.back}>
							{' '}
							<Link
								onClick={() => navigate(-1)}
								className={styles.back_link}>
								<img
									src={arrowLeft}
									alt='Arrow left'
								/>

								<span className={styles.link_text}>{t('textSignUp.back')}</span>
							</Link>
						</div>
					</div>
					<div className={`${styles.container} ${styles.verify_code_inner}`}>
						<img
							className={styles.img_phone}
							src={phone}
							alt='Phone'
						/>
						<h2 className={styles.title}>{t('textSignUp.textVerifyCode.titleH2')}</h2>
						<div className={styles.description}>
							<span className={styles.text}>{t('textSignUp.textVerifyCode.weSentCode')}</span>
							<div className={styles.description_bottom}>
								<span className={styles.text_link}>{phone_number}</span>
								<span className={styles.text}>{t('textSignUp.textVerifyCode.enterCode')}</span>
							</div>
						</div>
						<Formik
							initialValues={{
								code1: '',
								code2: '',
								code3: '',
								code4: '',
							}}
							onSubmit={(values, { setSubmitting }) => {
								handleSubmit();
								setSubmitting(false);
							}}>
							{({ isSubmitting, isValid, dirty }) => (
								<Form className={styles.form}>
									<div
										className={styles.form_input_wrapper}
										style={{ marginBottom: !error && '48px' }}>
										{/* input 1----------------------------------------------------------------------- */}
										<Field
											name='code1'
											validate={(value) => validateInputRequired(value)}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={`${styles.input} ${error ? styles.invalid : ''}`}
													value={value1}
													onChange={setValue1}
													autoComplete='off'
												/>
											)}
										</Field>

										{/* input 2 ----------------------------------------------------------------------- */}
										<Field
											name='code2'
											validate={(value) => validateInputRequired(value)}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={`${styles.input} ${error ? styles.invalid : ''}`}
													value={value2}
													onChange={setValue2}
													autoComplete='off'
												/>
											)}
										</Field>

										{/* input 3----------------------------------------------------------------------- */}
										<Field
											name='code3'
											validate={(value) => validateInputRequired(value)}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={`${styles.input} ${error ? styles.invalid : ''}`}
													value={value3}
													onChange={setValue3}
													autoComplete='off'
												/>
											)}
										</Field>

										{/* input 4----------------------------------------------------------------------- */}
										<Field
											name='code4'
											validate={(value) => validateInputRequired(value)}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={`${styles.input} ${error ? styles.invalid : ''}`}
													value={value4}
													onChange={setValue4}
													autoComplete='off'
												/>
											)}
										</Field>
									</div>
									{error && (
										<div className={styles.errorMessage}>{t('textSignUp.error.errorCode')}</div>
									)}
									{/* button submit ---------------------------------------------------------- */}
									<CustomButton
										htmlType='submit'
										onClick={handleSubmit}
										type='primary'
										style={{ height: '57px' }}
										isDisable={!value1 || !value2 || !value3 || !value4}>
										{t('textSignUp.textVerifyCode.confirmNumber')}
									</CustomButton>
									<div className={styles.form_text_bottom_wrapper}>
										<span className={`${styles.text} ${styles.margin_right}`}>
											{t('textSignUp.textVerifyCode.didntReceiveCode')}
										</span>
										<CountdownTimer
											onTimerEnd={handleTimerEnd}
											style={{ margin: '0 0 120px 0' }}
										/>
										{showButton && (
											<button
												onClick={handleResend}
												className={`${styles.text_link} ${styles.link_send}`}>
												{t('textSignUp.sandAgain')}
											</button>
										)}
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
				<aside className={styles.aside}>
					<div className={styles.aside_bg}>
						<img
							src={img_aside_step3}
							alt='background'
						/>
					</div>
				</aside>
			</div>
		</>
	);
};

export default VerifyCodeForm;
