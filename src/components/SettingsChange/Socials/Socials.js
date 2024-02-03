import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Input, Switch } from 'antd';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-facebook.svg';
import { ReactComponent as InstIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-inst.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-linkedin.svg';
import { ReactComponent as TelegramIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-telegram.svg';
import Toast from '../../Toast/Toast';

import styles from './socials.module.scss';

const inputStyle = {
    height: '56px',
    borderRadius: '12px',
    marginBottom: '16px',
};

export default function Socials() {
    const { data, isLoading, refetch } = useGetUserDataQuery();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);

    const [statusButton, setStatusButton] = useState('error');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [checked, setChecked] = useState(false);
    const [inputChanged, setInputChanged] = useState(false);
    const [usernames, setUsernames] = useState({
        telegram: data?.telegram !== null ? data?.telegram : null,
        instagram: data?.instagram !== null ? data?.instagram : null,
        facebook: data?.facebook !== null ? data?.facebook : null,
        linkedin: data?.linkedin !== null ? data?.linkedin : null,
    });

    const [isValidUsername, setIsValidUsername] = useState({
        telegram: true,
        instagram: true,
        facebook: true,
        linkedin: true,
    });

    useEffect(() => {
        const getSocialsStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/accounts/contacts-visibility/`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    }
                })
                setChecked(response.data.social_accounts)
               
                
            } catch (err) {
                console.error(err.toJSON())
            }
        }
        getSocialsStatus()
    }, [])
    const validateUsername = (key, value) => {
        const regex = /^[A-Za-z0-9_@]+$/;
        setIsValidUsername((prev) => ({
            ...prev,
            [key]: regex.test(value),
        }));
    };

    const handleInputChange = (key, value) => {
        setUsernames((prev) => ({
            ...prev,
            [key]: value,
        }));
        validateUsername(key, value);
        setInputChanged(true);
    };
    const handleSaveClick = async () => {
        const userProfileUrl = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/user_profile/${data.id}/`;
        const headers = {
            Authorization: `Token ${authToken}`,
        };
        const patchData = {
            telegram: usernames.telegram,
            instagram: usernames.instagram,
            facebook: usernames.facebook,
            linkedin: usernames.linkedin,
        };

        try {
            const response = await axios.patch(userProfileUrl, patchData, { headers });
            setShowSuccessToast(true);
            setInputChanged(false);

            refetch();
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 3500);

        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const onChange = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/v1/accounts/contacts-visibility/`,
                {
                    contact_type: 'social_accounts',
                },
                {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                }
            );
            setChecked(!checked);
            return response.data;
        } catch (err) {
            console.error(err.toJSON());
        }
    };
    const isSaveButtonDisabled = !inputChanged || Object.values(isValidUsername).some((isValid) => !isValid);
    if (isLoading) return <> Loading </>

    return (
        <div className={styles.socials}>
            <h4>
                <UserSettings />
                Нікнейм
            </h4>
            <p>Будь ласка, за бажанням поділіться вашими соціальними мережами.</p>
            <div>
                <Input
                    style={{
                        ...inputStyle,
                        borderColor: isValidUsername.telegram ? '' : 'red',
                    }}
                    size='large'
                    prefix={<TelegramIcon />}
                    placeholder='@username'
                    // value={usernames.telegram}
                    defaultValue={data?.telegram}
                    onChange={(e) => handleInputChange('telegram', e.target.value)}
                />
                {!isValidUsername.telegram && <div className={styles.socials__error}><ErrorIcon /> 'Поле може містити лише латинські літери (A-Z), цифри (0-9) та символ підкреслення (“_”)' </div>}
                <Input
                    style={{
                        ...inputStyle,
                        borderColor: isValidUsername.instagram ? '' : 'red',
                    }}
                    size='large'
                    prefix={<InstIcon />}
                    placeholder='@username'
                    // value={usernames.instagram}
                    defaultValue={data?.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                />
                {!isValidUsername.instagram && <div className={styles.socials__error}><ErrorIcon /> 'Поле може містити лише латинські літери (A-Z), цифри (0-9) та символ підкреслення (“_”)' </div>}
                <Input
                    style={{
                        ...inputStyle,
                        borderColor: isValidUsername.facebook ? '' : 'red',
                    }}
                    size='large'
                    prefix={<FacebookIcon />}
                    placeholder='https://www.facebook.com/example'
                    // value={usernames.facebook}
                    defaultValue={data?.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                />
                {!isValidUsername.facebook && <div className={styles.socials__error}><ErrorIcon /> 'Поле може містити лише латинські літери (A-Z), цифри (0-9) та символ підкреслення (“_”)' </div>}
                <Input
                    style={{
                        ...inputStyle,
                        borderColor: isValidUsername.linkedin ? '' : 'red',
                    }}
                    size='large'
                    prefix={<LinkedinIcon />}
                    placeholder='https://www.linkedin.com/example'
                    // value={usernames.linkedin}
                    defaultValue={data?.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                />
                {!isValidUsername.linkedin && <div className={styles.socials__error}><ErrorIcon /> 'Поле може містити лише латинські літери (A-Z), цифри (0-9) та символ підкреслення (“_”)' </div>}
            </div>
            {/* <div className={styles.custom__input}>
                <FacebookIcon className={styles.custom__input__icon} />
                <input />
            </div> */}
            <div className={styles.socials__switcher}>
                <Switch checked={checked} onChange={onChange} />
                {checked ? <p>Сховати соціальні мережі у Профілі</p> : <p>Показувати соціальні мережі у Профілі</p>}
                
            </div>
            <BlueButton
                text={'Зберегти'}
                additionalStyles={isSaveButtonDisabled ? styles.button : styles.validButton}
                onClick={handleSaveClick}
            />

            {showSuccessToast && (
                <Toast
                    message='Ваші зміни були успішно збережені'
                    duration={3000}
                />
            )}
        </div>
    )
}
