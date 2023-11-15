import React from 'react';

import { Button } from 'antd';

import styles from './ButtonPrimary.module.scss';

const ButtonPrimary = ({ children }) => {
	return (
		<>
			<Button
				key='email'
				type='primary'
				shape='round'
				size='large'
				className={styles.signUpEmail}>
				{children}
			</Button>
		</>
	);
};

export default ButtonPrimary;
