import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Formik, Form, Field } from 'formik';
import { Button, Spin } from 'antd';

import location from '../../../assets/img/icons/icons-SignUp/location.svg';
import { URL_COUNTRY_LIST, URL_CITY_LIST } from '../../../config/API_url';

import CustomButton from '../../CustomButton/CustomButton';
import styles from './Step2Form.module.scss';

const Step2Form = ({ onNext }) => {
	const { t } = useTranslation();
	const [loadingCountries, setLoadingCountries] = useState(true);
	const [loadingCities, setLoadingCities] = useState(true);
	const [countries, setCountries] = useState(null);
	const [cities, setCities] = useState(null);
	const [selectedCountryId, setSelectedCountryId] = useState(null);
	const [cachedCities, setCachedCities] = useState({});

	const getAllCountries = async () => {
		try {
			const data = await axios.get(URL_COUNTRY_LIST);
			return data.data;
		} catch (error) {
			return console.log(error.message);
		}
	};

	const getAllCities = async (url) => {
		let accumulator = [];

		try {
			let nextUrl = url;

			while (nextUrl) {
				const response = await axios.get(nextUrl);
				const newData = response.data.results;
				accumulator = [...accumulator, ...newData];

				nextUrl = response.data.next;
			}

			return accumulator;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [countriesData] = await Promise.all([getAllCountries()]);

				setCountries(countriesData);
			} catch (error) {
				console.error(error.message);
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

				if (selectedCountryId) {
					// Check if cities for the selected country are already cached
					if (cachedCities[selectedCountryId]) {
						setCities(cachedCities[selectedCountryId]);
					} else {
						const citiesData = await getAllCities(URL_CITY_LIST);
						// setAllCities(citiesData.flat(2));

						const filteredCities = citiesData
							.flat(2)
							.filter((city) => city.country === +selectedCountryId);
						setCities(filteredCities);

						// Cache the cities for the selected country
						setCachedCities((prevCachedCities) => ({
							...prevCachedCities,
							[selectedCountryId]: filteredCities,
						}));
					}
				}
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoadingCities(false);
			}
		};

		fetchCitiesData();
	}, [cachedCities, selectedCountryId]);

	const handleCountryChange = (event) => {
		const selectedId = event.target.value;
		setSelectedCountryId(selectedId);
	};

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
											onChange={handleCountryChange}
											value={selectedCountryId || ''}
											className={styles.select}>
											<option
												disabled
												selected
												value=''>
												Обрати країну
											</option>
											{loadingCountries ? (
												<Spin />
											) : (
												countries?.map(({ id, name }) => (
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
										disabled={!selectedCountryId}
										className={`${styles.select} ${!selectedCountryId && styles.select_disabled}`}>
										<option
											selected
											value=''>
											Обрати місто
										</option>
										{loadingCities ? (
											<option disabled>
												<div className={styles.spin_wrapper}>Loading...</div>
											</option>
										) : (
											cities?.map(({ id, name }) => <option key={id}>{name}</option>)
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
