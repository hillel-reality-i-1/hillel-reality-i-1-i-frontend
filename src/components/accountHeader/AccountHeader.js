import { useState } from 'react';
import { Dropdown, Space } from 'antd'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { clearAuthToken } from '../../store/slices/signInSlice';
import { ReactComponent as Bell } from '../../assets/img/icons/icons-header/bell-grey.svg'
import BlueButton from '../buttons/BlueButton/BlueButton'
import dropDown from '../../assets/img/icons/drop-down/dropDown.png'
import questionMark from '../../assets/img/icons/drop-down/question-mark.svg';
import settingsIcon from '../../assets/img/icons/drop-down/settings-icon.svg';
import userIcon from '../../assets/img/icons/drop-down/user-icon.svg';
import signOut from '../../assets/img/icons/drop-down/sign-out-icon.svg';
import CustomModal from '../modals/CustomModal/CustomModal';
import SignOutModalContent from './SignOutContent/SignOutModalContent';

import styles from './accountHeader.module.scss'

export default function AccountHeader() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  };

  const delAuthToken = () => {

    dispatch(clearAuthToken());
    navigate('/')
  };

  return (
    <div className={styles.account}>

      <CustomModal isOpen={isModalOpen} additionalStyles={styles.modal}>

        <SignOutModalContent delAuthToken={delAuthToken} toggleModal={toggleModal} />

      </CustomModal>

      <BlueButton text={'Створити допис'} />

      <div className={styles.account__notification}>
        <Bell />
      </div>

      <div className={styles.account__user} >
        <div className={styles.account__user__avatar}>
          {/* <img /> */}
        </div>

        <p className={styles.account__user__name} > Name </p>

        <Dropdown
          className={styles.dropdown}
          menu={{
            items: [...items, {
              label:
                <a className={styles.dropdown__item} onClick={toggleModal}>
                  <img src={signOut} />Вийти
                </a>,
              key: '4',
            }],
          }}
          placement='bottomRight'
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()} >
            <Space>
              <img src={dropDown} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}


const items = [
  {
    label: <Link to='user' className={styles.dropdown__item}> <img src={userIcon} /> Мій профіль </Link>,
    key: '0',
  },
  {
    label: <Link to='settings' className={styles.dropdown__item}> <img src={settingsIcon} />Налаштування</Link>,
    key: '1',
  },
  // {
  //   label: <a className={styles.dropdown__item}><img src={questionMark} />  Help </a>,
  //   key: '3',
  // },
  {
    type: 'divider',
  },
];