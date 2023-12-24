import React from 'react';
import { Button, ConfigProvider } from 'antd';

import styles from './CustomButton.module.scss';

const CustomButton = ({ children, onClick, htmlType, isDisable, type }) => {
	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorBgContainerDisabled: '#caccd1',
						colorBorder: 'none',
						colorTextDisabled: '#FDFEFF',
						colorPrimaryHover: '#3989EC',
						colorPrimary: '#126FE1',
						paddingBlock: '14px 16px',
						fontSize: '18px',
						// colorPrimary: `${type === 'primary' ? '#ffffff' : '#126FE1'}`,
					},
					components: {
						Button: { paddingBlock: '14px 16px' },
					},
				}}>
				<Button
					type={type}
					htmlType={htmlType}
					shape='round'
					size='large'
					onClick={onClick}
					disabled={isDisable}
					className={`${styles.btn}  ${
						type === 'primary' ? styles.buttonPrimary : styles.buttonSecondary
					}`}>
					{children}
				</Button>
			</ConfigProvider>
		</>
	);
};

export default CustomButton;
