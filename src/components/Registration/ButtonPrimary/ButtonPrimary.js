import React from 'react';

import { Button, ConfigProvider } from 'antd';

import styles from './ButtonPrimary.module.scss';

const ButtonPrimary = ({ children, htmlType, isDisable }) => {
	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorBgContainerDisabled: '#caccd1',
						colorBorder: 'none',
						colorTextDisabled: '#FDFEFF',
						colorPrimaryHover: '#3989EC',
					},
				}}>
				<Button
					key='email'
					type='primary'
					htmlType='htmlType'
					shape='round'
					size='large'
					disabled={isDisable}
					className={styles.signUpPrimary}>
					{children}
				</Button>
			</ConfigProvider>
		</>
	);
};

export default ButtonPrimary;
