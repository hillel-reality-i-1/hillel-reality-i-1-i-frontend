import React from 'react';

import ToTheMainButton from '../../components/buttons/ToTheMainButton/ToTheMainButton';

import headLogo from '../../assets/img/icons/logo/forgotPassword_logo.svg'
import mainLogo from '../../assets/img/img-404/main_picture_404.png'

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {

	return (
		<div className={styles.notFoundPage}>
			<div className={styles.notFoundPage_wrapper}>
				<div className={styles.notFoundPage_logo_wrapper}>
					<img
						className={styles.notFoundPage_logo}
						src={headLogo}
						alt="UHelp logo"
					/>
					<h2 className={styles.notFoundPage_logo_text}>
						UHelp
					</h2>
				</div>
				<div className={styles.notFoundPage_container}>
					<div className={styles.notFoundPage_main_logo_wrapper}>
						<img
							src={mainLogo}
							alt='main 404 logo'
						/>
					</div>
					<div className={styles.notFoundPage_text}>
						<h1 className={styles.text_title}>
							404
						</h1>
						<h2 className={styles.text_title_secondary}>
							Щось пішло не так!
						</h2>
						<p className={styles.text_description}>
							Упс! Цієї сторінки не існує або в посиланні була допущена помилка.
						</p>
					</div>
					<ToTheMainButton />
				</div>
			</div>
		</div>
	)
}

