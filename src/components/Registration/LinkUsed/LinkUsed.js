import { Link, useNavigate } from 'react-router-dom';
import icon_logo_page_link from '../../../assets/img/icons/logo/icon_logo_page_link.svg';
import envelope from '../../../assets/img/icons/icons-SignUp/envelope.svg';
import arrow_back from '../../../assets/img/icons/icons-SignUp/arrow_back.svg';
import { URL_RESEND_EMAIL } from '../../../config/API_url';
import axios from '../../../config/axios/axios';
import CustomButton from '../../CustomButton/CustomButton';
import { ConfigProvider } from 'antd';
import styles from './LinkUsed.module.scss';

const LinkUsed = () => {
	const navigate = useNavigate();

	const user = localStorage.getItem('userData');

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
				<h2 className={styles.title}>Це посилання вже використано</h2>
				<p className={styles.text}>
					Упс! Це посилання на підтвердження пошти вже було використано раніше. Але ви можете
					запросити ще одне!
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
			</div>
		</div>
	);
};

export default LinkUsed;
