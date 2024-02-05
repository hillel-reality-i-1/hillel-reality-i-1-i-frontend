import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../translations/i18n';
import logo from '../../assets/img/icons/logo/header_logo.svg';
import AuthenticationWrapper from '../AuthenticationWrapper/AuthenticationWrapper';

import styles from './Header.module.scss';
import ModalInfo from '../ModalInfo/ModalInfo';

export default function Header() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isModalOpen, setModalOpen] = useState(false);
	const [targetLink, setTargetLink] = useState(null);

	const handleLinkClick = (e) => {
		if (pathname === '/postCreationPage') {
			setTargetLink(e.currentTarget.pathname);
			setModalOpen(true);
			e.preventDefault();
		}
	};
	const handleContinueClick = () => {
		setModalOpen(false);
		if (targetLink) {
			navigate(targetLink);
		}
	};
	const closeModal = () => {
		setModalOpen(false);
	};
	return (
		<div className={styles.header}>
			<div className={styles.header_wrapper}>
				<div className={styles.header_logo_wrapper}>
					<Link
						to='/'
						onClick={handleLinkClick}>
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
							<Link
								className={styles.item_link}
								to='/main'
								onClick={handleLinkClick}>
								{t('textHeader.main')}
							</Link>
						</li>
						<li className={styles.menu_item}>
							<Link
								className={styles.item_link}
								to='/map'
								onClick={handleLinkClick}>
								{t('textHeader.map')}
							</Link>
						</li>
						<li className={styles.menu_item}>
							<Link
								className={styles.item_link}
								to='/events'
								onClick={handleLinkClick}>
								{t('textHeader.events')}
							</Link>
						</li>
					</ul>
					<div className={styles.navigation_button}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<AuthenticationWrapper />
						</div>
					</div>
				</nav>
			</div>
			{isModalOpen && (
				<ModalInfo
					onClose={closeModal}
					onContinue={handleContinueClick}
				/>
			)}
		</div>
	);
}
