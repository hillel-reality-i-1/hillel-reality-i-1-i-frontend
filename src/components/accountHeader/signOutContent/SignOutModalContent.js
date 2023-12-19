import {ReactComponent as CloseIcon} from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import BlueButton from '../../buttons/blueButton/BlueButton';

import styles from './signOutContent.module.scss'

export default function SignOutModalContent({delAuthToken}) {
  return (
    <div className={styles.modal}>
        <div className={styles.modal__header}>
            <h2 className={styles.modal__header__title}>Sign Out</h2>
            <p><CloseIcon className={styles.modal__header__icon}/></p>
            
        </div>
        
        <div className={styles.modal__main}>
           <p className={styles.modal__main__text}>
              Are you sure you want to sign out? Your session will be ended.
           </p>
        </div>

        <div className={styles.modal__footer}>
          <BlueButton onClick={delAuthToken} text={'Sign Out'}  additionalStyles={styles.blueButtonStyles} />
        </div>
    </div>
  )
}
