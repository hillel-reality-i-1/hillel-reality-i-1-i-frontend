import cancelIcon from '../../../assets/img/icons/icons-AboutMe/cancel.svg'
import BlueButton from '../../buttons/BlueButton/BlueButton';

import styles from '../ModalInfoAboutExpertProfile/ModalInfoAboutExpertProfile.module.scss'


const ModalInfoAboutExpertProfile = ({ onClose }) => {

    return (
        <div className={styles.modal_сontainer}>
            <div className={styles.modal_сontainer_wrapper} >
                <div className={styles.сontainer_header} >
                    <div className={styles.сontainer_header_wrapper}>
                        <h4 className={styles.header_title}>
                            Експертний профіль
                        </h4>
                        <img className={styles.header_close}
                            onClick={onClose}
                            src={cancelIcon}
                            alt='close icon'
                        />
                    </div>
                </div>
                <div className={styles.сontainer_content}>
                    <div className={styles.сontainer_content_wrapper}>
                        <p className={styles.сontainer_content_text}>
                            Переключення на експертний профіль дає вам змогу скористатися рядом додаткових можливостей а саме: додавання вашої професії, додавання сервісу, заповнення експертного портфоліо.
                        </p >
                        <p className={styles.сontainer_content_text}>
                            Тим самим ви зможете зарекомендувати себе як експерта певної галузі та запропонувати іншим користувачам свої послуги.
                        </p>
                        <p className={styles.сontainer_content_text}>
                            Експертом може стати користувач, що верифікував свій профіль за номером телефону.
                        </p>
                    </div>

                </div>
                <div className={styles.сontainer_bottom}>
                    <BlueButton text={'Зрозуміло'} 
                        onClick={onClose} 
                        additionalStyles={styles.сontainer_bottom_additionalStyles} 
                    />
                </div>
            </div>
        </div>
    )
};

export default ModalInfoAboutExpertProfile