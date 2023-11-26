import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input } from 'antd';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import phone from '../../../assets/img/icons/icons-SignUp/phone.svg';
import arrowLeft from '../../../assets/img/icons/icons-SignUp/arrowLeft.svg';
import step_logo from '../../../assets/img/icons/logo/step_logo.svg';
import img_aside_step3 from '../../../assets/img/img-sign-up/img_aside_step3.png';

import styles from './VerifyCodeForm.module.scss';

const validateInput = (value) => {
	let error;
	if (!value) {
		error = 'Required';
	}
	return error;
};

const NumericInput = (props) => {
	const { value, onChange } = props;

	const handleChange = (e) => {
		const { value: inputValue } = e.target;
		const reg = /^[0-9]*$/;
		if (reg.test(inputValue)) {
			onChange(inputValue);
		}

		console.log(value);
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
	const [value1, setValue1] = useState('');
	const [value2, setValue2] = useState('');
	const [value3, setValue3] = useState('');
	const [value4, setValue4] = useState('');

	const handleSubmit = (value1) => {
		console.log(value1);

		navigate('/');
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
								<a href='/'>
									<span className={styles.text_link}>{'+380 000000'}</span>
								</a>
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
								setSubmitting(false);
								console.log(values);
							}}>
							{({ isSubmitting, isValid, dirty }) => (
								<Form className={styles.form}>
									<div className={styles.form_input_wrapper}>
										{/* input 1----------------------------------------------------------------------- */}

										<Field
											name='code1'
											validate={validateInput}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={styles.input}
													value={value1}
													onChange={setValue1}
													autoComplete='off'
												/>
											)}
										</Field>
										<ErrorMessage
											name='email'
											component='div'
										/>

										{/* input 2 ----------------------------------------------------------------------- */}

										<Field
											name='code2'
											validate={validateInput}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={styles.input}
													value={value2}
													onChange={setValue2}
													autoComplete='off'
												/>
											)}
										</Field>
										<ErrorMessage
											name='email'
											component='div'
										/>

										{/* input 3----------------------------------------------------------------------- */}

										<Field
											name='code3'
											validate={validateInput}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={styles.input}
													value={value3}
													onChange={setValue3}
													autoComplete='off'
												/>
											)}
										</Field>
										<ErrorMessage
											name='email'
											component='div'
										/>

										{/* input 4----------------------------------------------------------------------- */}

										<Field
											name='code4'
											validate={validateInput}>
											{({ field }) => (
												<NumericInput
													{...field}
													className={styles.input}
													value={value4}
													onChange={setValue4}
													autoComplete='off'
												/>
											)}
										</Field>
										<ErrorMessage
											name='email'
											component='div'
										/>
									</div>
									{/* button submit ---------------------------------------------------------- */}

									<ButtonPrimary
										htmlType='submit'
										onClick={handleSubmit}>
										{t('textSignUp.textVerifyCode.confirmNumber')}
									</ButtonPrimary>
									<div className={styles.form_text_bottom_wrapper}>
										<span className={`${styles.text} ${styles.margin_right}`}>
											{t('textSignUp.textVerifyCode.didntReceiveCode')}
										</span>
										<a
											href='/'
											className={styles.text_link}>
											{t('textSignUp.textVerifyCode.sendAgain')}
										</a>
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
