import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './nick-name.module.scss';

const NickName = () => {
  const { state } = useLocation();
  const { data, isLoading, refetch, } = useGetUserDataQuery();
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const usernameRef = useRef('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateUsername = (value) => {
    if (!/^[A-Za-z0-9_]+$/.test(value)) {
      return 'Поле може містити лише латинські літери (A-Z), цифри (0-9) та символ підкреслення (“_”)';
    }

    if (!/^[A-Za-z]/.test(value)) {
      return 'Нікнейм має починатися з літери і не може закінчуватися символом підкреслення («_»). Будь ласка, введіть коректний нікнейм.';
    }

    if (/_$/.test(value)) {
      return 'Нікнейм має починатися з літери і не може закінчуватися символом підкреслення («_»). Будь ласка, введіть коректний нікнейм.';
    }

    if (value.length < 2 || value.length > 32) {
      return 'Поле має містити від 2 до 32 символів. Будь ласка, заповніть його';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
    setError(validateUsername(inputValue));

  };

  const handleSaveUsername = async () => {
    const validationError = validateUsername(username);

    if (validationError) {
      setError(validationError);
      return;
    }
    console.log(username);
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/user_list/${data.user}/`;
      const token = authToken;

      const response = await axios.patch(
        url,
        { username },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setShowSuccessToast(true);
      refetch()
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3500);


    } catch (error) {
      console.error('Error updating username:', error);
      if (error.response.data.username[0] === 'User з таким username вже існує.') {
        setError('Цей нікнейм вже використовується. Будь ласка, оберіть інший')
      }
    }
  };
  if (isLoading) return <> Loading </>
  return (
    <div className={styles.nickName}>
      <h4>
        <UserSettings />
        Нікнейм
      </h4>
      <p>Це ваше унікальне ім'я у U-Help, яке ви можете легко змінити за бажанням.</p>
      <label>Нікнейм</label>
      <input
        ref={usernameRef}
        className={`${error && styles.nickName__inputError}`}
        placeholder={data.username}
        onChange={handleInputChange}
      />
      {error && <div className={styles.nickName__error}><ErrorIcon /> {error}</div>}
      {showSuccessToast && (
        <Toast
          message='Ваші зміни були успішно збережені'
          duration={3000}
        />
      )}
      <BlueButton
        text={'Зберегти'}
        additionalStyles={(error || usernameRef.current === '') ? styles.button : styles.validButton}
        onClick={handleSaveUsername}
      />
    </div>
  );
};

export default NickName;


