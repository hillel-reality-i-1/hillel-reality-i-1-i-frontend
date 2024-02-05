import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import { ReactComponent as Briefcase } from '../../../assets/img/icons/settings-icons/briefcase.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './services.module.scss';

export default function Services() {
    const { data, isLoading, refetch } = useGetUserDataQuery();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    return (
        <div className={styles.services}>
            <h4>
                <Briefcase />
                Послуги
            </h4>
            <p>Розширте ваш Профіль, додавши до 5 послуг. Це допоможе більш повно відображати ваші унікальні навички.</p>
        </div>
    )
}
