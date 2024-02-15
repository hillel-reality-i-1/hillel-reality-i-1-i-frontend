import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'antd';
import axios from 'axios';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import { ReactComponent as Lock } from '../../../assets/img/icons/settings-icons/lock.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error_icon_password.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/img/icons/settings-icons/succes_icon.svg';
import Toast from '../../Toast/Toast';

import styles from './password.module.scss';

const inputStyle = {
    height: '56px',
    borderRadius: '12px',
    marginTop: '8px',
    marginBottom: '16px',
};

const Password = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const [errorsState, setErrorsState] = useState({
        fieldError1: null,
        fieldError2: null,
        fieldError3: null,
        fieldErororPassword: null
    });
    const [confirmedPassword, setConfirmedPassword] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const validatePassword = (password) => {
        const errors = {
            fieldError1: password.length < 8 || password.length > 16,
            fieldError2: !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password),
            fieldError3: !/[a-z]/.test(password) || !/[A-Z]/.test(password),
            fieldErororPassword: password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)
        };
        
        setErrorsState(errors);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value.trim();
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value.trim();
        setConfirmPassword(value);
        if (password) {
            setConfirmedPassword(password === value);
        }
        setConfirmPasswordTouched(true);
    }; 

    const handleSubmit = async () => {
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/password/change/`;
            const token = authToken;
            const response = await axios.post(
                url,
                {
                    'new_password1': password,
                    'new_password2': confirmPassword
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
             
            }, 3500);


        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className={styles.password}>
            <h4>
                <Lock />
                Пароль
            </h4>
            <p>Заради безпеки вашого аккаунту, будь ласка, створіть надійний пароль</p>

            <label>Введіть новий пароль</label>
            <Input.Password
                style={inputStyle}
                size='large'
                placeholder="Введіть пароль"
                visibilityToggle={{ visible: true }}
                onChange={handlePasswordChange}
            />
            {
                password ? <div className={styles.errors}>
                    <p className={errorsState.fieldError1 ? styles.errors__message__red : styles.errors__message__green} >
                        {errorsState.fieldError1 ? <ErrorIcon /> : <SuccessIcon />}
                        Має містити від 8 до 16 символів
                    </p>
                    <p className={errorsState.fieldError2 ? styles.errors__message__red : styles.errors__message__green} >
                        {errorsState.fieldError2 ? <ErrorIcon /> : <SuccessIcon />}
                        Має містити хоча б 1 цифру та символ
                    </p>
                    <p className={errorsState.fieldError3 ? styles.errors__message__red : styles.errors__message__green } >
                        {errorsState.fieldError3 ? <ErrorIcon /> : <SuccessIcon />}
                        Має містити літери верхнього та нижнього регістрів
                    </p>
                </div> : ''
            }
            <label>Підтвердіть новий пароль</label>
            <Input.Password
                style={inputStyle}
                size='large'
                placeholder="Підтвердіть пароль"
                visibilityToggle={{ visible: true }}
                onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordTouched && (
                <div className={styles.errors}>
                    {confirmedPassword ? (
                        <p className={styles.errors__message__green}>
                            <SuccessIcon /> Чудовий пароль!
                        </p>
                    ) : (
                        <p className={styles.errors__message__red }>
                            <ErrorIcon /> Різні паролі. Будь ласка, спробуйте ще раз
                        </p>
                    )}
                </div>
            )}
            <BlueButton
                text={'Зберегти'}
                additionalStyles={confirmPassword === password && !errorsState.fieldErororPassword && confirmPassword !== '' ? styles.validButton : styles.button}
                onClick={handleSubmit}
            />
            {showSuccessToast && (
                <Toast
                    message='Ваші зміни були успішно збережені'
                    duration={3000}
                />
            )}
        </div>
    );
};

export default Password;