import React from 'react';
import styles from './LatestActivityLayout.module.scss';
import LatestActivityTabs from '../LatestActivityTabs/LatestActivityTabs';
import { Button, ConfigProvider } from 'antd';

// import CustomButton from '../../CustomButton/CustomButton';

const LatestActivityLayout = () => {
	return (
		<div className={styles.activity_wrapper}>
			<div className={styles.header_activity}>
				<h4 className={styles.header_activity_title}>Latest activity</h4>
				<ConfigProvider
					theme={{
						token: {
							colorBgContainerDisabled: '#caccd1',
							// colorBorder: 'none',
							colorTextDisabled: '#FDFEFF',
							// colorPrimaryHover: '#3989EC',
							// colorPrimary: '#126FE1',
							// paddingBlock: '14px 16px',
							// fontSize: '18px',
							// colorPrimary: `${type === 'primary' ? '#ffffff' : '#126FE1'}`,
						},
						components: {
							// Button: { paddingBlock: '14px 16px' },
						},
					}}>
					<Button
						type='primary'
						htmlType='button'
						disabled='true'
						className={styles.btn_activity_header}>
						<span className={styles.btn_inner}>Write a post</span>
					</Button>
				</ConfigProvider>
			</div>
			<LatestActivityTabs />
		</div>
	);
};

export default LatestActivityLayout;
