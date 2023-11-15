import React from 'react';

import { useTranslation } from 'react-i18next';
import '../../translations/i18n';

import instagram from '../../assets/img/icons/icons-footer/instagram.svg';
import facebook from '../../assets/img/icons/icons-footer/facebook.svg';
import footer_logo from '../../assets/img/icons/logo/footer_logo.svg';

import SignUp from '../Registration/SignUp/SignUp';
import SignUpForm from '../Registration/SignUpForm/SignUpForm';

import styles from './Footer.module.scss';

const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.footer_inner}>
					<div className={styles.footer_col_left}>
						<div className={styles.footer_logo}>
							<a href='/'>
								<img
									src={footer_logo}
									alt='Logo'
								/>
							</a>
						</div>
						<ul className={styles.footer_info}>
							<li className={styles.footer_info_item}>
								<a href='/'>{t('textFooter.terms')}</a>
							</li>
							<li className={styles.footer_info_item}>
								<a href='/'>{t('textFooter.privacy')}</a>
							</li>
							<li className={styles.footer_info_item}>
								<a href='/'>{t('textFooter.help')}</a>
							</li>
							<li className={styles.footer_info_item}>&copy; 2023 U-Help</li>
						</ul>
					</div>
					<div className={styles.footer_col_right}>
						<div className={styles.footer_menu}>
							<h5 className={styles.footer_title}>{t('textFooter.menu')}</h5>
							<ul className={styles.footer_menu_nav}>
								<li className={styles.footer_menu_nav_item}>
									<a href='/'>{t('textFooter.home')}</a>
								</li>
								<li className={styles.footer_menu_nav_item}>
									<a href='/'>{t('textFooter.map')}</a>
								</li>
								<li className={styles.footer_menu_nav_item}>
									<a href='/'>{t('textFooter.events')}</a>
								</li>
								<li className={styles.footer_menu_nav_item}>
									<a href='/'>{t('textFooter.faq')}</a>
								</li>
							</ul>
						</div>
						<div className={styles.footer_contacts}>
							<div>
								<h5 className={styles.footer_title}>{t('textFooter.contacts')}</h5>
								<ul className={styles.footer_menu_nav}>
									<li className={styles.footer_contacts_nav_item}>
										<a href='/'>+3800000000</a>
									</li>
									<li className={styles.footer_contacts_nav_item}>
										<a href='/'>uhelp@gmail.com</a>
									</li>
								</ul>
							</div>
							<ul className={styles.footer_contacts_socmedia}>
								<li className={styles.footer_contacts_socmedia_item}>
									<a href='/'>
										<img
											src={instagram}
											alt='Instagram'
										/>
									</a>
								</li>
								<li className={styles.footer_contacts_socmedia_item}>
									<a href='/'>
										<img
											src={facebook}
											alt='Facebook'
										/>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<SignUp />
			<SignUpForm />
		</footer>
	);
};

export default Footer;
