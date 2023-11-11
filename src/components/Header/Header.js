import React from 'react';
import { useTranslation } from 'react-i18next';

import '../../translations/i18n';
import logo from '../../assets/img/icons/logo/header_logo.svg'
import bellIcon from '../../assets/img/icons/icons-header/bell.svg'

import styles from './Header.module.scss';

export default function Header() {
    const { t } = useTranslation();
    return (
        <header className={styles.header}>
            <a className={styles.header_logo} href="/">
                <img src={logo} alt="header logo" />
            </a>
            <nav className={styles.header_navigation}>
                <ul className={styles.navigation_menu}>
                    <li className={styles.menu_item}>
                        <a className={styles.item_link} href="/main">
                            {t('textHeader.main')}
                        </a>
                    </li>
                    <li className={styles.menu_item}>
                        <a className={styles.item_link} href="/map">
                            {t('textHeader.map')}
                        </a>
                    </li>
                    <li className={styles.menu_item}>
                        <a className={styles.item_link} href="/events">
                            {t('textHeader.events')}
                        </a>
                    </li>
                    <li className={styles.menu_item}>
                        <a className={styles.item_link} href="/faq">
                            {t('textHeader.faq')}
                        </a>
                    </li>
                </ul>
                <div className={styles.navigation_button}>
                    <a href="/writepost" className={styles.button_link}>
                        {t('textHeader.write_a_post')}
                    </a>
                </div>
                <div className={styles.navigation_account}>
                    <div className={styles.account_bell}>
                        <a className={styles.bell_link} href="/bell">
                            <img className={styles.bell_icon} src={bellIcon} alt="bell icon" />
                        </a>
                    </div>
                    <a className={styles.account_profile} href="/profile">
                    </a>
                </div>
            </nav>
        </header>
    );
}
