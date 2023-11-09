import React from 'react';

import './Header.scss';
import './reset.scss'

import logo from './logoforheader.svg'
import bellIcon from './Icon.svg'

function Header() {

  return (

    <header className='header'>
        <a className="header_logo" href="/">
            <img src={logo} alt="header logo" />
        </a>
        <nav className="header_navigation">
            <ul className="navigation_menu">
                <li className="menu_item">
                    <a className="item_link"  href="/main">
                        Main
                    </a>
                </li>
                <li className="menu_item">
                    <a className="item_link"  href="/map">
                        Map
                    </a>
                </li>
                <li className="menu_item">
                    <a className="item_link"  href="/events">
                        Events
                    </a>
                </li>
                <li className="menu_item">
                    <a className="item_link" href="/faq">
                        FAQ
                    </a>
                </li>
            </ul>
            <div className="navigation_button">
                <a href="/writepost" className="button_link">
                    Write a post
                </a>
            </div>
            <div className="navigation_account">
                <div className="account_bell">
                    <a className="bell_link" href="/bell">
                        <img className="bell_icon" src={bellIcon} alt="bell icon" />
                    </a>
                </div>
                <a className="account_profile" href="/profile">
                </a>
            </div>
      </nav>
    </header>
  );
}

export default Header;
