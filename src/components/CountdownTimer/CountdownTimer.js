import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../src/translations/i18n';

import styles from './CountdownTimer.module.scss';

const CountdownTimer = ({ onTimerEnd, style }) => {
	const { t } = useTranslation();
	const [seconds, setSeconds] = useState(60);
	const [showTimer, setShowTimer] = useState(true);

	useEffect(() => {
		let interval;

		if (showTimer && seconds > 0) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		} else {
			clearInterval(interval);
			setShowTimer(false);
			onTimerEnd();
		}

		return () => clearInterval(interval);
	}, [showTimer, seconds]);

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return (
		<>
			{showTimer && (
				<p
					className={styles.timer}
					style={style}>
					{t('textSignUp.sandAgain')}
					{`${minutes < 10 ? `0${minutes}` : minutes}:${
						remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
					}`}{' '}
					{t('textSignUp.seconds')}
				</p>
			)}
		</>
	);
};

export default CountdownTimer;
