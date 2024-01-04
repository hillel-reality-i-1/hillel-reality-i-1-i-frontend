import { useState } from 'react';
import { Dropdown, Space } from 'antd'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearAuthToken } from '../../store/slices/signInSlice';
import { ReactComponent as Bell } from '../../assets/img/icons/icons-header/bell-grey.svg'
import BlueButton from '../buttons/blueButton/BlueButton'
import dropDown from '../../assets/img/icons/drop-down/dropDown.png'
import questionMark  from '../../assets/img/icons/drop-down/question-mark.svg';
import settingsIcon  from '../../assets/img/icons/drop-down/settings-icon.svg';
import userIcon  from '../../assets/img/icons/drop-down/user-icon.svg';
import signOut from '../../assets/img/icons/drop-down/sign-out-icon.svg';
import CustomModal from '../modals/CustomModal';
import SignOutModalContent from './signOutContent/SignOutModalContent';

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

        <CustomModal isOpen={isModalOpen} >

          <SignOutModalContent delAuthToken={delAuthToken} toggleModal={toggleModal} />

        </CustomModal>

        <BlueButton text={'Write a post'}/>

        <div className={styles.account__notification}>
           <Bell />
        </div>

        <div className={styles.account__user} >
          <div className={styles.account__user__avatar }>
            {/* <img /> */}
          </div>

          <p className={styles.account__user__name} > Name </p>

          <Dropdown
            className={styles.dropdown}
            menu={{
              items: [...items, {
                label: 
                      <a className={styles.dropdown__item} onClick={toggleModal}>
                        <img src={signOut} />Sign Out 
                      </a>,
                key: '4',
              }],
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()} >
              <Space>
                <img   src={dropDown}/>
              </Space>
            </a>
          </Dropdown>
        </div>
    </div>
  )
}


const items = [
  {
    label: <a className={styles.dropdown__item}> <img src={userIcon} /> My Profile </a>,
    key: '0',
  },
  {
    label: <a className={styles.dropdown__item}> <img src={settingsIcon} />Settings & Privacy</a>,
    key: '1',
  },
  {
    label: <a className={styles.dropdown__item}><img src={questionMark} />  Help </a>,
    key: '3',
  },
  {
    type: 'divider',
  },
];