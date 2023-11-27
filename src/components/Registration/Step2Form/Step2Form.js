import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Button } from 'antd';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import location from '../../../assets/img/icons/icons-SignUp/location.svg';

import styles from './Step2Form.module.scss';

const Step2Form = ({ onNext }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.step2}>
				<div className={styles.container}>
					<h2 className={styles.title}>{t('textSignUp.textStep2.titleH2')}</h2>
					<p className={styles.text}>{t('textSignUp.textStep2.description')}</p>

					<Button
						key='location'
						size='large'
						className={styles.button_location}>
						<div className={styles.btn_text}>
							{
								<img
									src={location}
									alt='Location'
								/>
							}
							{t('textSignUp.textStep2.shareTheLocation')}
						</div>
					</Button>
					<div className={styles.spanOr}>{t('textSignUp.or')}</div>
					<Formik
						initialValues={{
							country: '',
							city: '',
						}}
						onSubmit={(values, actions) => {
							onNext();
							console.log(values);
							actions.setSubmitting(false);
						}}>
						{({ isSubmitting, setFieldValue }) => (
							<Form className={styles.form}>
								{/* select country----------------------------------------------------------------------- */}
								<div>
									<label
										className={styles.label}
										htmlFor='country'>
										{t('textSignUp.textStep2.country')}
									</label>
									<div className={styles.selectWrapper}>
										<Field
											as='select'
											name='country'
											className={styles.select}>
											<option
												disabled
												selected
												value=''>
												Обрати країну
											</option>
											<option value='Польша'>Польша</option>
											<option value='Франція'>Франція</option>
											<option value='Україна'>Україна</option>
										</Field>
										<div className={styles.customSelectArrow}></div>
									</div>
								</div>

								{/* select city ----------------------------------------------------------------------- */}
								<div className={styles.m_b}>
									<label
										className={styles.label}
										htmlFor='city'>
										{t('textSignUp.textStep2.city')}
									</label>

									<Field
										as='select'
										name='city'
										className={styles.select}>
										<option
											disabled
											selected
											value=''>
											Обрати місто
										</option>
										<option value='Варшава'>Варшава</option>
										<option value='Париж'>Париж</option>
										<option value='Київ'>Київ</option>
									</Field>
								</div>

								{/* button submit ---------------------------------------------------------- */}

								<ButtonPrimary htmlType='submit'>{t('textSignUp.continue')}</ButtonPrimary>
								<div className={styles.skip_link}>
									<Link
										className={styles.link}
										to='/step3Form'>
										{t('textSignUp.skipNow')}
									</Link>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Step2Form;
