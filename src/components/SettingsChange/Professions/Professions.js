import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import { ReactComponent as Briefcase } from '../../../assets/img/icons/settings-icons/briefcase.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './professions.module.scss';

export default function Professions() {
  return (
      <div className={styles.professions}>
          <h4>
              <Briefcase />
              Професії
          </h4>
          <p>Розширте ваш Профіль, додавши до 5 професій. Це допоможе надати більш повну картину вашої професійної експертизи.</p>


          {/* {error && <div className={styles.nickName__error}><ErrorIcon /> {error}</div>} */}
          {/* {showSuccessToast && (
              <Toast
                  message='Ваші зміни були успішно збережені'
                  duration={3000}
              />
          )} */}
          {/* <BlueButton
              text={'Зберегти'}
              additionalStyles={(error || usernameRef.current === '') ? styles.button : styles.validButton}
              onClick={handleSaveUsername}
          /> */}
      </div>
  )
}
