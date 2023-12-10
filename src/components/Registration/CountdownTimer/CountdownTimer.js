import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import styles from './CountdownTimer.module.scss';

const CountdownTimer = ({ onTimerEnd }) => {
	const { t } = useTranslation();
	const [seconds, setSeconds] = useState(60);
	const [showTimer, setShowTimer] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds((prevSeconds) => {
				if (prevSeconds === 0) {
					setShowTimer(false);
					clearInterval(timer);
					onTimerEnd(); // call the function when the timer ends
				}
				return prevSeconds - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [onTimerEnd]);

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return (
		<>
			{showTimer && (
				<p className={styles.timer}>
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
