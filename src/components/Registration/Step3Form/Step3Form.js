import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Input } from 'antd';
import { Form, Formik, Field } from 'formik';

import styles from './Step3Form.module.scss';
import CustomButton from '../../CustomButton/CustomButton';

const Step3Form = () => {
	const { t } = useTranslation();
	const novigate = useNavigate();

	const handleSubmit = () => {};

	return (
		<>
			<div className={styles.step3}>
				<div className={`${styles.container} ${styles.step3_inner}`}>
					<h2 className={styles.title}>{t('textSignUp.textStep3.titleH2')}</h2>

					<span className={styles.text}>{t('textSignUp.textStep3.description')}</span>
					<Formik
						initialValues={{
							codeCountry: '',
							numberPhone: '',
						}}
						onSubmit={(values, { setSubmitting }) => {
							novigate('/verifyCodeForm');
							setSubmitting(false);
						}}>
						{({ isSubmitting }) => (
							<Form className={styles.form}>
								{/* select codeCountry----------------------------------------------------------------------- */}
								<label
									htmlFor='span'
									className={styles.label}>
									{t('textSignUp.textStep3.phoneNumber')}
								</label>

								<div className={styles.form_input_wrapper}>
									<div className={styles.select_wrapper}>
										<Field
											as='select'
											name='codeCountry'
											className={styles.select}>
											<option value='+38'>+38</option>
											<option value='+23'>+23</option>
											<option value='+34'>+34</option>
										</Field>
									</div>

									{/* input numberPhone ----------------------------------------------------------------------- */}
									<Field
										name='numberPhone'
										autoComplete='off'>
										{({ field }) => (
											<Input
												{...field}
												type='text'
												name='numberPhone'
												placeholder='000 000 00 00'
												maxLength={8}
												autoComplete='off'
												className={styles.phone_input}
											/>
										)}
									</Field>
								</div>

								{/* button submit ---------------------------------------------------------- */}
								<CustomButton
									htmlType='submit'
									type='primary'
									onClick={handleSubmit}
									disabled={isSubmitting}>
									{t('textSignUp.textStep3.getCode')}
								</CustomButton>
								<div className={styles.skip_link}>
									<Link
										className={styles.link}
										to='/verifyCodeForm'>
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

export default Step3Form;
