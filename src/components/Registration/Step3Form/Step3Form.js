import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Form, Formik, Field } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import CustomButton from '../../CustomButton/CustomButton';
import flag_ua from '../../../assets/img/icons/icons-SignUp/flag_ua.svg';
import flag_pl from '../../../assets/img/icons/icons-SignUp/flag_pl.svg';
import flag_gb from '../../../assets/img/icons/icons-SignUp/flag_gb.svg';
import flag_de from '../../../assets/img/icons/icons-SignUp/flag_de.svg';
import flag_cz from '../../../assets/img/icons/icons-SignUp/flag_cz.svg';
import error from '../../../assets/img/icons/icons-SignUp/error.svg';
import axios from '../../../config/axios/axios';

import styles from './Step3Form.module.scss';
import { URL_USERNAME_OR_PHONE_CHECK_UNIQUE } from '../../../config/API_url';

const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone) => {
	try {
		return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
	} catch (error) {
		return false;
	}
};

const customFlags = [
	{
		iso2: 'ua',
		src: flag_ua,
	},
	{
		iso2: 'pl',
		src: flag_pl,
	},
	{
		iso2: 'gb',
		src: flag_gb,
	},
	{
		iso2: 'de',
		src: flag_de,
	},
	{
		iso2: 'cz',
		src: flag_cz,
	},
];

const ukrainianCountryNames = {
	ua: 'Україна',
	pl: 'Польща',
	gb: 'Велика Британія',
	de: 'Німеччина',
	cz: 'Чехія',
};

// Update country names and select required countries
const updatedCountries = defaultCountries.map((country) => {
	const [name, iso2, dialCode, format, priority, areaCodes] = country;

	// Change the name to Ukrainian if it is defined
	const ukrainianName = ukrainianCountryNames[iso2] || name;

	return [ukrainianName, iso2, dialCode, format, priority, areaCodes];
});

const countries = updatedCountries.filter((country) => {
	const { iso2 } = parseCountry(country);
	return ['ua', 'pl', 'gb', 'cz', 'de'].includes(iso2);
});

const Step3Form = ({ onNext, onPhoneChange }) => {
	const { t } = useTranslation();
	const [phone, setPhone] = useState('');

	const isValid = isPhoneValid(phone);
	const [isNotUniqueness, setNotUniqueness] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const checkUniqueness = async () => {
			try {
				if (isValid) {
					const response = await axios.get(URL_USERNAME_OR_PHONE_CHECK_UNIQUE, {
						params: {
							phone_number: phone,
						},
					});
					setNotUniqueness(response.phone_exists);
				}
			} catch (error) {
				return error.message;
			}
		};
		checkUniqueness();
	}, [errorMessage, isNotUniqueness, isValid, phone]);

	useEffect(() => {
		if (phone.length > 2 && isValid === false) {
			setErrorMessage('Будь ласка, введіть коректний номер телефону');
		} else if (isNotUniqueness === true) {
			setErrorMessage('Цей номер вже використовується. Будь ласка, спробуйте інший');
		} else {
			setErrorMessage('');
		}
	}, [isNotUniqueness, isValid, phone.length]);

	// console.log(phone);

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
						{({ isSubmitting, touched }) => (
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
									{({ field, touched }) => (
										<PhoneInput
											{...field}
											defaultCountry='ua'
											value={phone}
											className={styles.phone_input}
											onChange={(phone) => setPhone(phone)}
											onBlur={field.onBlur}
											countries={countries}
											flags={customFlags}
										/>
									)}
								</Field>

								{touched.numberPhone && (!isValid || isNotUniqueness) && (
									<div className={styles.error}>
										<img
											className={styles.img_er}
											style={{ width: '24px', height: '24px', marginRight: '8px' }}
											src={error}
											alt='error'
										/>
										{errorMessage && errorMessage}
									</div>
								)}

								<div className={styles.btn_submit_wrapper}>
									<CustomButton
										htmlType='submit'
										type='primary'
										isDisable={!isValid || isNotUniqueness}>
										{t('textSignUp.textStep3.getCode')}
									</CustomButton>
								</div>

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
