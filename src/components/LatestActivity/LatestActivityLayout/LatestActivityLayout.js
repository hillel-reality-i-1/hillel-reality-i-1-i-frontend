import React from 'react';
import styles from './LatestActivityLayout.module.scss';
import LatestActivityTabs from '../LatestActivityTabs/LatestActivityTabs';
import { Button, ConfigProvider } from 'antd';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';

const LatestActivityLayout = () => {

	const navigate = useNavigate();

	const handlePostCreation = () => {
		navigate('/postCreationPage');
	};

	return (
		<div className={styles.activity_wrapper}>
			<div className={styles.header_activity}>
				<h4 className={styles.header_activity_title}>
					Остання активність
				</h4>
				<ConfigProvider
					theme={{
						token: {
							colorBgContainerDisabled: '#caccd1',
							colorTextDisabled: '#FDFEFF',
						},
						components: {
							// Button: { paddingBlock: '14px 16px' },
						},
					}}>
					<BlueButton
						text={'Створити допис'}
						onClick={handlePostCreation}
						additionalStyles={styles.button}
					/>
				</ConfigProvider>
			</div>
			<LatestActivityTabs />
		</div>
	);
};

export default LatestActivityLayout;
