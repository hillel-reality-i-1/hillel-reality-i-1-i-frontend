import React from 'react';

import { Button } from 'antd';

import styles from './ButtonSecondary.module.scss';

const ButtonSecondary = ({ children }) => {
	return (
		<>
			<Button
				key='email'
				shape='round'
				size='large'
				className={styles.signUpEmail}>
				{children}
			</Button>
		</>
	);
};

export default ButtonSecondary;
