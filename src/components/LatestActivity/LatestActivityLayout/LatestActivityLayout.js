import React from 'react';
import styles from './LatestActivityLayout.module.scss';
import LatestActivityTabs from '../LatestActivityTabs/LatestActivityTabs';
import CustomButton from '../../CustomButton/CustomButton';

const LatestActivityLayout = () => {
	return (
		<div className={styles.activity_wrapper}>
			<div className={styles.header_activity}>
				<h4 className={styles.header_activity_title}>Latest activity</h4>
				<CustomButton
					type='primary'
					htmlType='button'
					// style={{ padding: '12px 14px', height: '52px', width: 'auto' }}
					isDisable='true'>
					<span className={styles.children_button}>Write a post</span>
				</CustomButton>
			</div>
			<LatestActivityTabs />
		</div>
	);
};

export default LatestActivityLayout;
