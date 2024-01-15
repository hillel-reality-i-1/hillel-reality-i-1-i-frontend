import {ReactComponent as CloseIcon} from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import styles from './signOutContent.module.scss'

export default function SignOutModalContent({delAuthToken, toggleModal}) {
  return (
    <div className={styles.modal}>
        <div className={styles.modal__header}>
            <h2 className={styles.modal__header__title}>Вихід</h2>
            <CloseIcon className={styles.modal__header__icon} onClick={toggleModal}/>
            
        </div>
        
        <div className={styles.modal__main}>
           <p className={styles.modal__main__text}>
           Ви впевнені, що хочете вийти? Вашу сесію буде завершено.
           </p>
        </div>

        <div className={styles.modal__footer}>
          <BlueButton onClick={delAuthToken} text={'Вийти'}  additionalStyles={styles.blueButtonStyles} />
        </div>
    </div>
  )
}
