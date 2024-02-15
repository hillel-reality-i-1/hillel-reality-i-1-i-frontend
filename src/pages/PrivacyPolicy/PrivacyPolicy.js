import React from 'react';

import ToTheMainButton from '../../components/buttons/ToTheMainButton/ToTheMainButton';

import headLogo from '../../assets/img/icons/logo/forgotPassword_logo.svg'
import mainLogo from '../../assets/img//img-privacyPolicy/catwithtool.png'

import styles from './PrivacyPolicy.module.scss';

const PrivacyPolicy = () => {
	return (
		<div className={styles.privacyPolicy}>
			<div className={styles.privacyPolicy_wrapper}>
				<div className={styles.privacyPolicy_logo_wrapper}>
					<img
						className={styles.privacyPolicy_logo}
						src={headLogo}
						alt="UHelp logo"
					/>
					<h2 className={styles.privacyPolicy_logo_text}>
						UHelp
					</h2>
				</div>
				<div className={styles.privacyPolicy_container}>
					<div className={styles.privacyPolicy_main_logo_wrapper}>
						<img
							src={mainLogo}
							alt='the cat is working'
						/>
					</div>
					<div className={styles.privacyPolicy_text}>
						<h2 className={styles.text_title}>
							Ми працюємо!
						</h2>
						<p className={styles.text_description}>
							Упс! Ця сторінка ще на етапі розробки.
						</p>
					</div>
					<ToTheMainButton />
				</div>
			</div>
		</div>
	)
};

export default PrivacyPolicy;
