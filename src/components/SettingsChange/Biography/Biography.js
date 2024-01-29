import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './biography.module.scss';
export default function Biography() {
    return (
        <div className={styles.biography}>
            <h4>
                <UserSettings />
                Біографія
            </h4>
            <p>Будемо раді дізнатися більше про вас! Поділіться своєю історією, досвідом, інтересами та чимось, що вас вражає.</p>
            <textarea
                cols='33'
                resize='vertical'
                placeholder='Розкажіть про себе...'
            >
            </textarea>

            <BlueButton
                text={'Зберегти'}
                additionalStyles={styles.button}
            />
        </div >

    )
}
