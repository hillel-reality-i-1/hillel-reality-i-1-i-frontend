import { Link, useNavigate } from 'react-router-dom';
import icon_logo_page_link from '../../../assets/img/icons/logo/icon_logo_page_link.svg';
import envelope from '../../../assets/img/icons/icons-SignUp/envelope.svg';
import arrow_back from '../../../assets/img/icons/icons-SignUp/arrow_back.svg';
import { URL_RESEND_EMAIL } from '../../../config/API_url';
import axios from '../../../config/axios/axios';

import styles from './LinkExpired.module.scss';
import CustomButton from '../../CustomButton/CustomButton';
import { ConfigProvider } from 'antd';
// import { useSelector } from 'react-redux';

const LinkExpired = () => {
	const navigate = useNavigate();

	// const data = useSelector((state) => state.auth?.user);
	// console.log(data);

	const user = localStorage.getItem('userData');
	// console.log('user', user);

	// user && localStorage.setItem('userData', JSON.stringify(user));
	// console.log(user);
	const handleResend = async () => {
		try {
			const data = await axios.post(URL_RESEND_EMAIL, {
				email: user?.email,
			});
			return data;
		} catch (error) {
			return error.message;
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.verify_info_main}>
				<Link
					to='/'
					className={styles.verify_info_main_logo}>
					<img
						src={icon_logo_page_link}
						alt='Logo'
					/>
				</Link>
				<img
					className={styles.img_phone}
					src={envelope}
					alt='Phone'
				/>
				<h2 className={styles.title}>Термін дії посилання завершився</h2>
				<p className={styles.text}>
					Упс! Це посилання на підтвердження пошти більше не дійсне. Але ви можете запросити ще
					одне!
				</p>
				<div className={styles.btn_wrapper}>
					<ConfigProvider
						theme={{
							token: {
								colorPrimaryHover: '#126FE1',
							},
						}}>
						<CustomButton
							type='primary'
							className={styles.btn_send}
							onClick={handleResend}>
							Відправити ще раз
						</CustomButton>
					</ConfigProvider>
					<ConfigProvider
						theme={{
							token: {
								colorPrimaryHover: 'rgba(255, 0, 0, 0)',
							},
						}}>
						<CustomButton
							// type=''
							block={true}
							className={styles.btn_home_back}
							onClick={() => navigate('/')}>
							<div className={styles.button_children}>
								<img
									src={arrow_back}
									alt='back'
									style={{ width: '24px', height: '24px' }}
								/>
								<span className={styles.btn_back}>Повернутися на Головну</span>
							</div>
						</CustomButton>
					</ConfigProvider>
				</div>

				{/* </div> */}
				{/* <span className={`${styles.text} ${styles.margin_bottom}`}>
					{t('textSignUp.clickOnTheLink')}
				</span> */}
				{/* <div className={styles.text}>
					<span className={styles.text}>{t('textSignUp.didntNotGetTheEmail')}</span>
				</div> */}

				{/* <CountdownTimer
					onTimerEnd={handleTimerEnd}
					style={{ margin: '0 0 120px 0' }}
				/> */}
				{/* {showButton && (
					<button
						onClick={handleResend}
						className={`${styles.text_link} ${styles.link_send}`}>
						{t('textSignUp.buttonSandAgain')}
					</button>
				)} */}
				{/* <AuthenticationWrapper currentPage={currentPage} /> */}
			</div>
		</div>
	);
};

export default LinkExpired;
