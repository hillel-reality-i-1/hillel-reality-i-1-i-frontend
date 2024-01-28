import React from 'react';
import styles from './UsersLatestActivityLayout.module.scss';
import LatestActivityTabs from '../LatestActivityTabs/LatestActivityTabs';
import { Button, ConfigProvider } from 'antd';

const UsersLatestActivityLayout = () => {
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
					<Button
						type='primary'
						htmlType='button'
						disabled={true}
						className={styles.btn_activity_header}>
						<span className={styles.btn_inner}>Створити допис</span>
					</Button>
				</ConfigProvider>
			</div>
			<LatestActivityTabs />
		</div>
	);
};

export default UsersLatestActivityLayout;
