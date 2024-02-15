import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './full-name.module.scss';

export default function FullName() {
  const { data, isLoading, refetch, } = useGetUserDataQuery();
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const fullNameRef = useRef('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const validateFullName = (value) => {
    if (!value.trim()) {
      return 'Це обов’язкове поле. Будь ласка, заповніть його';
    }

    if (value.length < 2 || value.length > 50) {
      return 'Поле має містити від 2 до 50 символів. Будь ласка, заповніть його';
    }

    const invalidCharsRegex = /[^a-zA-Zа-яА-ЯІЇҐєії'\s-]/u;
    if (invalidCharsRegex.test(value)) {
      return 'Ім\'я може містити лише кириличні або латинські літери, символи апострофа (’) або дефісу (-). Будь ласка, введіть коректне ім\'я';
    }

    const startsOrEndsWithInvalidChars = /^['-]|['-]$/;
    if (startsOrEndsWithInvalidChars.test(value)) {
      return 'Ім\'я не може починатися або закінчуватися символами апострофа (’) або дефісу (-). Будь ласка, введіть коректне ім\'я';
    }

    return '';
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFullName(inputValue);
    setError(validateFullName(inputValue));

  };
  const handleSaveFullName = async () => {
    const validationError = validateFullName(fullName);

    if (validationError) {
      setError(validationError);
      return;
    }

  
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/user_list/${data.user}/`;
      const token = authToken;

      const response = await axios.patch(
        url,
        { full_name: fullName },
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

    }
  };
  if (isLoading) { return <> Loading </> }
  return (
    <div className={styles.fullName}>
      <h4>
        <UserSettings />
        Повне ім’я
      </h4>
      <p>
        Будь ласка, введіть своє справжнє ім'я. Це допоможе іншим користувачам
        вас знаходити та краще розпізнавати.
      </p>
      <label>Повне ім’я</label>
      <input
        ref={fullNameRef}
        className={`${error && styles.fullName__inputError}`}
        placeholder={data.full_name}
        onChange={handleInputChange}
      />
      {error && <div className={styles.fullName__error}><ErrorIcon /> {error}</div>}
      {showSuccessToast && (
        <Toast
          message='Ваші зміни були успішно збережені'
          duration={3000}
        />
      )}
      <BlueButton
        text={'Зберегти'}
        additionalStyles={(error || fullNameRef.current === '') ? styles.button : styles.validButton}
        onClick={handleSaveFullName}
      />
    </div>
  );
}
