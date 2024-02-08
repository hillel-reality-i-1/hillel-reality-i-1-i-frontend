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

import styles from './password.module.scss';

const inputStyle = {
    height: '56px',
    borderRadius: '12px',
    marginBottom: '16px',
};

export default function Password() {
    // const { data, isLoading, refetch } = useGetUserDataQuery();
    const { state } = useLocation();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    return (
        <div className={styles.password}>
            <h4>
                <Lock />
                Пароль
            </h4>
            <p>
                Заради безпеки вашого аккаунту, будь ласка, створіть надійний пароль
            </p>
            {/* <label>Введіть поточний пароль</label>
            <Input
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
            <p>Забули пароль?</p>
            <label>Введіть новий пароль</label>
            <Input
                style={{
                    ...inputStyle,
                    // borderColor: isValidUsername.instagram ? '' : 'red',
                }}
                size='large'
                placeholder='@username'
            />
            <label>Підтвердіть новий пароль</label>
            <Input
                style={{
                    ...inputStyle,
                    // borderColor: isValidUsername.instagram ? '' : 'red',
                }}
                size='large'
                placeholder='@username'
            />
            <BlueButton
                text={'Зберегти'}
                // additionalStyles={isSaveButtonDisabled ? styles.button : styles.validButton}
                // onClick={handleSaveClick}
            /> */}
        </div>
    )
}
