import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { usePhoneInput } from 'react-international-phone';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import { Form, Formik, Field } from 'formik';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import styles from './Step3Form.module.scss';
import CustomButton from '../../CustomButton/CustomButton';

const Step3Form = () => {
	const { t } = useTranslation();
	const novigate = useNavigate();
	const [phone, setPhone] = useState('');

	const handleSubmit = () => {};

	return (
		<>
			<div className={styles.step3}>
				<div className={`${styles.container} ${styles.step3_inner}`}>
					<h2 className={styles.title}>{t('textSignUp.textStep3.titleH2')}</h2>

					<span className={styles.text}>{t('textSignUp.textStep3.description')}</span>
					<Formik
						initialValues={{
							countrySelect: '',
							numberPhone: '',
						}}
						onSubmit={(values, { setSubmitting }) => {
							novigate('/verifyCodeForm');
							setSubmitting(false);
						}}>
						{({ isSubmitting }) => (
							<Form className={styles.form}>
								<label
									htmlFor='span'
									className={styles.label}>
									{t('textSignUp.textStep3.phoneNumber')}
								</label>
								<div style={{ display: 'flex', alignItems: 'center' }}></div>
								<Field
									name='numberPhone'
									autoComplete='off'>
									{({ field }) => (
										<PhoneInput
											defaultCountry='ua'
											value={phone}
											className={styles.phone_input}
											onChange={(phone) => setPhone(phone)}
										/>
									)}
								</Field>
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
