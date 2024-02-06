import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './WhiteButtonWithoutIcon.module.scss';

const WhiteButtonWithoutIcon = ({ text }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className={styles.WhiteButtonWithoutIcon_wrapper}>
            {/* Оберните кнопку в элемент Link */}
            <Link to="/" className={styles.WhiteButtonWithoutIcon} onClick={handleClick}>
                {text}
            </Link>
        </div>
    );
}

export default WhiteButtonWithoutIcon;
