import React from 'react';

import { useTranslation } from 'react-i18next';

import '../../translations/i18n';
import logo from '../../assets/img/icons/logo/header_logo.svg';

import SignUp from '../Registration/SignUp/SignUp';

import styles from './Header.module.scss';

export default function Header() {
	const { t } = useTranslation();
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<a
					className={styles.header_logo}
					href='/'>
					<img
						src={logo}
						alt='header logo'
					/>
				</a>
				<nav className={styles.header_navigation}>
					<ul className={styles.navigation_menu}>
						<li className={styles.menu_item}>
							<a
								className={styles.item_link}
								href='/main'>
								{t('textHeader.main')}
							</a>
						</li>
						<li className={styles.menu_item}>
							<a
								className={styles.item_link}
								href='/map'>
								{t('textHeader.map')}
							</a>
						</li>
						<li className={styles.menu_item}>
							<a
								className={styles.item_link}
								href='/events'>
								{t('textHeader.events')}
							</a>
						</li>
						<li className={styles.menu_item}>
							<a
								className={styles.item_link}
								href='/faq'>
								{t('textHeader.faq')}
							</a>
						</li>
					</ul>
					<div className={styles.navigation_button}>
						<a
							href='/signin'
							className={styles.button_link}>
							Sign In
						</a>
						<a
							href='/signup'
							className={styles.button_link}>
							Sign Up
						</a>
						<a
							href='/forgotYourPasswordForm'
							className={styles.button_link}>
							Recovery password
						</a>
					</div>
					<SignUp />
				</nav>
			</header>
		</div>
	);
}
