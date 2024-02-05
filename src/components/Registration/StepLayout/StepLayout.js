import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../../config/axios/axios';
import { Steps, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import step_logo from '../../../assets/img/icons/logo/step_logo.svg';
import img_aside_step1 from '../../../assets/img/img-sign-up/img_aside_step1.png';
import img_aside_step2 from '../../../assets/img/img-sign-up/img_aside_step2.png';
import img_aside_step3 from '../../../assets/img/img-sign-up/img_aside_step3.png';
import arrowLeft from '../../../assets/img/icons/icons-SignUp/arrowLeft.svg';
import { fetchAddDataProfile } from '../../../store/slices/authSlice';
import StepForm1 from '../Step1Form/Step1Form';
import StepForm2 from '../Step2Form/Step2Form';
import StepForm3 from '../Step3Form/Step3Form';
import { URL_CONFIRM_EMAIL, URL_SEND_VERIFICATION_CODE } from '../../../config/API_url';

import styles from './StepLayout.module.scss';
import { setAuthToken } from '../../../store/slices/signInSlice';

const StepLayout = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [current, setCurrent] = useState(0);
	const [formData2, setFormData2] = useState({});
	const [phone, setPhone] = useState('');
	const { token } = useParams();

	useEffect(() => {
		const fetchKey = async () => {
			// console.log('test1');
			// const storedToken = localStorage.getItem('authTokenUHelp');
			// if (!storedToken) {
			try {
				// console.log('test2');
				const userToken =
					token &&
					(await axios.post(URL_CONFIRM_EMAIL, {
						key: token,
					}));

				localStorage.setItem('authTokenUHelp', userToken?.token);
				dispatch(setAuthToken(userToken?.token));
				console.log('testResponse', userToken);
				// return;
				// return userToken;
			} catch (error) {
				const errorMsg = error?.response.data.details;
				// console.log(error);
				// console.log(errorMsg);
				// console.log('errorTest');
				// return console.log(errorMsg);
				// if (errorMsg === 'bad signature') {
				// 	return navigate('/*');
				// } else if (errorMsg === 'signature expired') {
				// 	return navigate('/linkExpired');
				// } else if (errorMsg === 'email address does not exist') {
				// 	return navigate('/linkUsed');

				// }
				if (errorMsg.includes('bad signature')) {
					return navigate('/*');
				} else if (errorMsg.includes('signature expired')) {
					return navigate('/linkExpired');
				} else if (errorMsg.includes('email address does not exist')) {
					return navigate('/linkUsed');
				}
			}
			// }
		};

		fetchKey();
	}, [dispatch, navigate, token]);

	const handleForm2Submit = async (data) => {
		if (data.country_id === 0 && data.city_id === 0) {
			data.country_id = null;
			data.city_id = null;
		}

		if (data.city_id === 0) {
			data.city_id = null;
		}

		setFormData2(data);
		next();
	};

	const handleForm3Submit = async (data) => {
		return data;
	};

	const sendVerificationCode = useCallback(async () => {
		try {
			await axios.post(URL_SEND_VERIFICATION_CODE);
		} catch (error) {
			return error.message;
		}
	}, []);

	const steps = [
		{
			title: t('textSignUp.name'),
			content: <StepForm1 onNext={() => next()} />,
			asideImage: img_aside_step1,
		},
		{
			title: t('textSignUp.country'),
			content: <StepForm2 onNext={handleForm2Submit} />,
			asideImage: img_aside_step2,
		},
		{
			title: t('textSignUp.phone'),
			content: (
				<StepForm3
					onNext={handleForm3Submit}
					onPhoneChange={(newPhone) => setPhone(newPhone)}
				/>
			),
			asideImage: img_aside_step3,
		},
	];

	const sendRequestToServer = useCallback(async () => {
		const phoneData = phone.length > 4 ? phone : '';

		try {
			const combinedData = {
				...formData2,
				phone_number: phoneData,
			};
			// dispatch(saveDataUserProfile(combinedData));
			await dispatch(fetchAddDataProfile(combinedData));

			if (phoneData.length > 1) {
				await sendVerificationCode(phoneData);
				navigate('/verifyCodeForm');
			} else {
				await dispatch(fetchAddDataProfile(combinedData));
				navigate('/user');
			}
		} catch (error) {
			return error.message;
		}
	}, [phone, formData2, dispatch, sendVerificationCode, navigate]);

	useEffect(() => {
		if (phone && current === steps.length - 1) {
			sendRequestToServer();
		}
	}, [phone, current, steps.length, sendRequestToServer]);

	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	return (
		<>
			<div className={styles.step_layout}>
				<div className={`${styles.step_layout_main} ${styles.container_main}`}>
					<div className={styles.step_header}>
						<Link
							to='/'
							className={styles.step_logo}>
							<img
								src={step_logo}
								alt='Logo'
							/>
						</Link>
						{current > 0 && (
							<div className={styles.container_novigation}>
								<div className={styles.back}>
									{' '}
									<Link
										onClick={() => prev()}
										className={styles.back_link}>
										<img
											src={arrowLeft}
											alt='Arrow left'
										/>

										<span className={styles.link_text}>{t('textSignUp.back')}</span>
									</Link>
								</div>
							</div>
						)}

						<ConfigProvider
							theme={{
								token: { colorSplit: '#DBDBDD' },
							}}>
							<Steps
								className={styles.step}
								current={current}
								items={items}
								labelPlacement='vertical'
							/>
						</ConfigProvider>
						<div className={styles.step1_wrapper}>{steps[current].content}</div>
					</div>
				</div>
				<aside className={styles.aside}>
					<div className={styles.aside_bg}></div>
				</aside>
			</div>
		</>
	);
};

export default StepLayout;
