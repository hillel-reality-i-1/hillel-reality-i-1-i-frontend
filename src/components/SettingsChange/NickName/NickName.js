import BlueButton from '../../buttons/blueButton/BlueButton';

import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings.svg';

import styles from './nick-name.module.scss';

export default function NickName() {
  return (
    <div className={styles.nickName}>
        <h4><UserSettings />Нікнейм</h4>
        <p>Це ваше унікальне ім’я в нашій системі. Ви можете змінити його тут</p>
        <input />
        <BlueButton text={'Зберегти'} additionalStyles={styles.button}/>
    </div>
  )
}
