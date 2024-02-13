import React, { useEffect, useState } from 'react';
import axios from '../../../config/axios/axios';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Spin } from 'antd';
import { URL_COUNTRY_LIST, URL_CITY_LIST, URL_LANGUAGE } from '../../../config/API_url';
import CustomButton from '../../CustomButton/CustomButton';
import styles from './Step2Form.module.scss';

const Step2Form = ({ onNext }) => {
	const { t } = useTranslation();
	const [loadingCountries, setLoadingCountries] = useState(true);
	const [loadingCities, setLoadingCities] = useState(true);
	const [countries, setCountries] = useState(null);
	const [cities, setCities] = useState(null);
	const [selectedCountryId, setSelectedCountryId] = useState(null);
	const [selectedCityId, setSelectedCityId] = useState(null);
	const langUK = 'uk/';

	useEffect(() => {
		const fetchLanguage = async () => {
			try {
				const data = await axios.get(`${URL_LANGUAGE}${langUK}`);
				return data;
			} catch (error) {
				return error.message;
			}
		};

		fetchLanguage();
	}, []);

	const getAllCountries = async () => {
		try {
			const data = await axios.get(URL_COUNTRY_LIST);
			return data;
		} catch (error) {
			return error.message;
		}
	};

	const getAllCities = async () => {
		try {
			const data = await axios.get(URL_CITY_LIST);
			return data;
		} catch (error) {
			return error.message;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const countriesData = await getAllCountries();
				getAllCountries && setCountries(countriesData);
			} catch (error) {
				return error.message;
			} finally {
				setLoadingCountries(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchCitiesData = async () => {
			try {
				setLoadingCities(true);
				const citiesData = await getAllCities(URL_CITY_LIST);

				if (selectedCountryId) {
					const filteredCities = citiesData.filter((city) => city.country === +selectedCountryId);
					setCities(filteredCities);
				}
			} catch (error) {
				return error.message;
			} finally {
				setLoadingCities(false);
			}
		};

		fetchCitiesData();
	}, [selectedCountryId]);

	const handleCountryChange = (event) => {
		const selectedId = event.target.value;
		setSelectedCountryId(selectedId);
	};

	const handleCityChange = (event) => {
		const selectedId = event.target.value;
		setSelectedCityId(selectedId);
	};

	return (
		<>
			<div className={styles.step2}>
				<div className={styles.container}>
					<h2 className={styles.title}>{t('textSignUp.textStep2.titleH2')}</h2>
					<p className={styles.text}>{t('textSignUp.textStep2.description')}</p>

					{/* <Button
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
					<div className={styles.spanOr}>{t('textSignUp.or')}</div> */}
					<Formik
						initialValues={{
							country: '',
							city: '',
						}}
						onSubmit={(values, { setSubmitting }) => {
							const data = {
								country_id: +selectedCountryId,
								city_id: +selectedCityId,
							};
							onNext(data);
							setSubmitting(false);
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
											onChange={handleCountryChange}
											value={selectedCountryId || ''}
											className={styles.select}>
											<option
												disabled
												value=''>
												Обрати країну
											</option>
											{loadingCountries ? (
												<option
													value=''
													disabled>
													Loading...
												</option>
											) : (
												countries &&
												countries.map(({ id, name }) => (
													<option
														key={id}
														value={id}>
														{name}
													</option>
												))
											)}
										</Field>
										<div className={styles.customSelectArrow}></div>
									</div>
								</div>

								{/* select city ----------------------------------------------------------------------- */}
								<div className={styles.m_b}>
									<label
										className={styles.label}
										htmlFor='city'>
										<span style={{ marginRight: '10px' }}>{t('textSignUp.textStep2.city')}</span>
										{loadingCities && <Spin size='small' />}
									</label>

									<Field
										as='select'
										name='city'
										onChange={handleCityChange}
										value={selectedCityId || ''}
										disabled={!selectedCountryId}
										className={`${styles.select} ${!selectedCountryId && styles.select_disabled}`}>
										<option value=''>Обрати місто</option>
										{loadingCities ? (
											<option
												value=''
												disabled>
												Loading...
											</option>
										) : (
											cities?.map(({ id, name }) => (
												<option
													key={id}
													value={id}>
													{name}
												</option>
											))
										)}
									</Field>
								</div>

								{/* button submit ---------------------------------------------------------- */}
								<CustomButton
									htmlType='submit'
									type='primary'>
									{t('textSignUp.continue')}
								</CustomButton>
								<div className={styles.skip_link}>
									<button className={styles.link}>{t('textSignUp.skipNow')}</button>
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
