import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Form, Formik, Field } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CustomButton from '../../CustomButton/CustomButton';

import styles from './Step3Form.module.scss';

const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone) => {
	try {
		return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
	} catch (error) {
		return false;
	}
};

const Step3Form = ({ onNext, onPhoneChange }) => {
	const { t } = useTranslation();
	const [phone, setPhone] = useState('');
	const isValid = isPhoneValid(phone);

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
							const data = {
								phone_number: phone,
							};
							onPhoneChange(phone);
							onNext(data);
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
									isDisable={!isValid}>
									{/* style={{ height: '57px' }} */}
									{t('textSignUp.textStep3.getCode')}
								</CustomButton>
								<div className={styles.skip_link}>
									<button
										type='submit'
										className={styles.link}>
										{t('textSignUp.skipNow')}
									</button>
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
