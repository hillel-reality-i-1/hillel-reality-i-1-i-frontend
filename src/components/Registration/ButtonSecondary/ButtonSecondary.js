import React from 'react';

import { Button } from 'antd';

import styles from './ButtonSecondary.module.scss';

const ButtonSecondary = ({ children, onClick }) => {
	return (
		<>
			<Button
				key='reg'
				shape='round'
				onClick={onClick}
				className={styles.buttonSecondary}>
				{children}
			</Button>
		</>
	);
};

export default ButtonSecondary;
