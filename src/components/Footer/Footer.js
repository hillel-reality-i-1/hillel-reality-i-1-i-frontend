import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import '../../translations/i18n';
import footer_logo_1 from '../../assets/img/icons/logo/footer_logo_1.svg';
import footer_logo_2 from '../../assets/img/icons/logo/footer_logo_2.svg';

import styles from './Footer.module.scss';

const Footer = () => {
	const { t } = useTranslation();

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.footer_inner}>
					<div className={styles.footer_logo_wrapper}>
						<Link
							to='/'
							onClick={handleClick}>
							<img
								src={footer_logo_1}
								alt='Logo'
								className={styles.footer_logo}
							/>
							<img
								className={styles.footer_logo_text}
								src={footer_logo_2}
								alt='Logo text'
							/>
						</Link>
					</div>
					<ul className={styles.footer_menu_nav}>
						<li className={styles.footer_menu_nav_item}>
							<Link to='/'>{t('textFooter.home')}</Link>
						</li>
						<li className={styles.footer_menu_nav_item}>
							<Link to='/privacyPolicy'>{t('textFooter.map')}</Link>
						</li>
						<li className={styles.footer_menu_nav_item}>
							<Link to='/privacyPolicy'>{t('textFooter.events')}</Link>
						</li>
						<li className={styles.footer_menu_nav_item}>
							<Link to='/privacyPolicy'>{t('textFooter.faq')}</Link>
						</li>
						<li className={styles.footer_menu_nav_item}>
							<Link to='/privacyPolicy'>{t('textFooter.termsOfUse')}</Link>
						</li>
						<li className={styles.footer_menu_nav_item}>
							<Link to='/privacyPolicy'>{t('textFooter.privacy')}</Link>
						</li>
					</ul>
					<div className={styles.copyright_wrapper}>
						<span className={styles.copyright_text}>
							© Copyright 2024. All Rights Reserved by U-Help
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
