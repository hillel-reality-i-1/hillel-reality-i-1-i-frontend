import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../translations/i18n';
import logo from '../../assets/img/icons/logo/header_logo.svg';
import AuthenticationWrapper from '../AuthenticationWrapper/AuthenticationWrapper';

import styles from './Header.module.scss';

export default function Header() {
	const { t } = useTranslation();
	return (
		<div className={styles.header}>
			<div className={styles.header_wrapper}>
				<div className={styles.header_logo_wrapper}>
					<Link to='./'>
						<img
							src={logo}
							alt='header logo'
							className={styles.header_logo}
						/>
					</Link>
				</div>
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
					</ul>
					<div className={styles.navigation_button}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<AuthenticationWrapper />
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}
