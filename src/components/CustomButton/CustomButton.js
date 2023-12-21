import React from 'react';
import { Button, ConfigProvider } from 'antd';

import styles from './CustomButton.module.scss';

const CustomButton = ({ children, onClick, htmlType, isDisable, type, style }) => {
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
					type={type}
					htmlType={htmlType}
					shape='round'
					size='large'
					onClick={onClick}
					disabled={isDisable}
					style={style}
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
