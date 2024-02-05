import cancelIcon from '../../assets/img/icons/icons-AboutMe/cancel.svg';
import BlueButton from '../buttons/BlueButton/BlueButton';
import icon_cat from '../../assets/img/icons/icon-create-post/icon_cat.svg';

import styles from './ModalInfo.module.scss';

const ModalInfo = ({ onClose, onContinue }) => {
	return (
		<div className={styles.modal_сontainer}>
			<div className={styles.modal_сontainer_wrapper}>
				<div className={styles.сontainer_header}>
					<div className={styles.сontainer_header_wrapper}>
						<h4 className={styles.header_title}>Скасувати зміни?</h4>
						<img
							className={styles.header_close}
							onClick={onClose}
							src={cancelIcon}
							alt='close icon'
						/>
					</div>
				</div>
				<div className={styles.сontainer_content}>
					<div className={styles.сontainer_content_wrapper}>
						<img
							src={icon_cat}
							alt='Cat'
						/>
						<p className={styles.сontainer_content_text}>
							Ви впевнені, що бажаєте продовжити? На жаль, після підтвердження цієї дії введена
							інформація не буде збережена.
						</p>
					</div>
				</div>
				<div className={styles.сontainer_bottom}>
					<BlueButton
						text={'Продовжити'}
						onClick={onContinue}
						additionalStyles={styles.сontainer_bottom_additionalStyles}
					/>
				</div>
			</div>
		</div>
	);
};

export default ModalInfo;
