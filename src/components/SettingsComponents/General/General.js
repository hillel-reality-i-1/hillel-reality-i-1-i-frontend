import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from 'antd';

import { clearAuthToken } from '../../../store/slices/signInSlice';
import { ReactComponent as CloseIcon } from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error_icon_password.svg';
import { ReactComponent as CryingCat } from '../../../assets/img/settingsPage/Crying-cat.svg';
import CustomModal from '../../modals/CustomModal/CustomModal';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import styles from './general.module.scss';

const inputStyle = {
  height: '56px',
  borderRadius: '12px',
  marginBottom: '8px',
};

export default function General() {
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [deletedModal, setDeletedModal] = useState(false);
  const [error, setError] = useState(false)
  const [inputVal, setInputVal] = useState('')

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleApprove = () => {
    if (!contentModal) {
      handleSubmit()
    } else {
      contentModal ? setContentModal(!contentModal) : setDeletedModal(!deletedModal)
    }
    
  }
  const handlePassword = (e) => {
    const value = e.target.value.trim();
    setInputVal(value)
    setError(false)
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/accounts/delete/`,
        {
          data: {
            'password': inputVal
          },
          headers: {
            'Authorization': `Token ${authToken}` 
          }
        }
      );
      if (response.status === 204) {
        setDeletedModal(true)
        setTimeout(() => {
          dispatch(clearAuthToken())
          navigate('/')
        }, 5000)

      } else {
        console.error('Error deleting account:', response.statusText);
        setError(true);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError(true);
    }
  };

  return (
    <>
      {/* <h2 className={styles.title}><Lock /> Загальні </h2>
        <div className={styles.wrapper}>
          <div className={styles.info}><p className={styles.info__type}>Мова</p> <Link className={styles.info__link}>English<Arrow /> </Link> </div>
        </div> */}
      <div className={styles.general__footer}> <a onClick={toggleModal}> Видалити Профіль</a> </div>

      <CustomModal
        isOpen={isModalOpen}
        additionalStyles={styles.modal}
      >
        <div className={styles.modal__header}>

          {deletedModal ?
            <h2 className={styles.modal__header__title}>Профіль видалено!</h2>
            :
            <>
              <h2 className={styles.modal__header__title}>Видалити профіль?</h2>
              <CloseIcon className={styles.modal__header__icon} onClick={toggleModal} />
            </>
          }

        </div>
        {deletedModal ?
          <div className={styles.modal__mainDeleted}>
            <CryingCat />
            <div>
              <p className={styles.modal__mainDeleted__text}>Чекаємо на нову зустріч з вами!</p>
              <p className={styles.modal__mainDeleted__text}>Незабаром вас буде перенаправлено на головну сторінку U-Help.</p>
            </div>
          </div>
          :
        <>
            <div className={styles.modal__main}>

              {contentModal ?
                <>
                  
                  <CryingCat />

                  <p className={styles.modal__main__text}>
                    Впевнені, що хочете залишити нас? Ваша присутність для нас була особливою, і нам дуже шкода вас втрачати.
                    <br />
                    Дякуємо за ваші пости та коментарі на U-Help.
                    <br />
                    Чекаємо на ваше повернення!
                  </p>

                </>
                :
                <div className={styles.password}>
                  <p className={styles.modal__main__text} >Для підтвердження видалення профілю, будь ласка, введіть ваш пароль.</p>
                  <label>Пароль</label>
                  <Input.Password
                    style={{
                      ...inputStyle,
                      borderColor: error ? 'red' : '' ,
                    }}
                    size='large'
                    placeholder="input password"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                    onChange={handlePassword}
                  />
                  {error ? <p className={styles.modal__main__error}>  <ErrorIcon className={styles.errorIcon} /> Невірний пароль. Будь ласка, спробуйте ще раз  </p> : '' }
                  <Link className={styles.password__forgot} onClick={toggleApprove}  to='/forgotYourPasswordForm'>Забули пароль?</Link>
                </div>}
            </div>
            <div className={styles.modal__footer}>
              <div
                className={styles.outlined__button}
              >
                <a
                  onClick={toggleModal}
                >
                  Скасувати
                </a>

              </div>
              <BlueButton
                text={'Підтвердити'}
                additionalStyles={styles.blueButtonStyles}
                onClick={toggleApprove}
              />
            </div>
        </>}

      </CustomModal>
    </>
  )
}
