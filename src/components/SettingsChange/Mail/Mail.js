import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import { ReactComponent as Lock } from '../../../assets/img/icons/settings-icons/lock.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import { ReactComponent as BluePlus } from '../../../assets/img/icons/settings-icons/Blue__Plus.svg';
import Toast from '../../Toast/Toast';

import styles from './mail.module.scss';

const inputStyle = {
    height: '56px',
    borderRadius: '12px',
    marginBottom: '16px',
};


export default function Mail() {
    // const { data, isLoading, refetch } = useGetUserDataQuery();
    const { state } = useLocation();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    return (
        <div className={styles.password}>
            <h4>
                <Lock />
                Пошта
            </h4>
            <p>
                Ваша поточна пошта mail@gmail.com.
            </p>
            {/* <label>Введіть нову пошту</label> */}
            {/* <Input
                style={{
                    ...inputStyle,
                    // borderColor: isValidUsername.instagram ? '' : 'red',
                }}
                size='large'

                placeholder='@username'
            // value={usernames.instagram}
            // defaultValue={data?.instagram}
            // onChange={(e) => handleInputChange('instagram', e.target.value)}
            />
            <p>Ви отримаєте лист на цю пошту для підтвердження </p>
            <label>Введіть ваш пароль</label>
            <Input
                style={{
                    ...inputStyle,
                    // borderColor: isValidUsername.instagram ? '' : 'red',
                }}
                size='large'
                placeholder='@username'
            />
            <p>Забули пароль ?</p>
            <BlueButton
                text={'Зберегти'}
            // additionalStyles={isSaveButtonDisabled ? styles.button : styles.validButton}
            // onClick={handleSaveClick}
            /> */}
        </div>
    )
}
