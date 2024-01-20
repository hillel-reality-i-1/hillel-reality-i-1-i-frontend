import axios from 'axios';
import { useSelector } from 'react-redux';

import CustomModal from '../../modals/CustomModal/CustomModal';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as CloseIcon } from '../../../assets/img/icons/icons-signIn/close-signIn-icon.svg';

import styles from '../userHead.module.scss';

export default function DeleteConfirmation({isModalOpen, toggleModal, avatarID, setAvatarData}) {
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  
  const handleDeleteItem = async (itemId) => {
    try {
      console.log(avatarID);
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/files/img_list/${avatarID}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
  
      console.log('Success:', response.data);
      toggleModal()
      setAvatarData(null)
    } catch (error) {
      console.error('Error:', error);

    }
  };
  return (
    <CustomModal isOpen={isModalOpen} onClose={toggleModal} additionalStyles={styles.deleteModal}>
        <div className={styles.modal__header}>
            <h2 className={styles.modal__header__title}>Видалити фото?</h2>
            <CloseIcon className={styles.modal__header__icon} onClick={toggleModal} />
        </div>
        <div className={styles.deleteModal__main}>
          Ви впевнені, що бажаєте видалити фото профілю?
          Фото допомогає іншим користувачам вас впізнавати.
        </div>
        <div className={styles.deleteModal__footer}>
            <div className={styles.discard}> <a onClick={toggleModal}>Скасувати</a> </div>
            <BlueButton text={'Видалити'} additionalStyles={styles.blueButtonStyles} onClick={handleDeleteItem}/>
        </div>

    </CustomModal>
  )
}
