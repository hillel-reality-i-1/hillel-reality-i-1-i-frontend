import { useLocation } from 'react-router-dom';

import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';

import styles from './nick-name.module.scss';

export default function NickName() {
  let { state } = useLocation();
  console.log(state);
  return (
    <div className={styles.nickName}>
        <h4><UserSettings />Нікнейм</h4>
        <p>Це ваше унікальне ім'я у U-Help, яке ви можете легко змінити за бажанням.</p>
        <label >Нікнейм </label>
        <input  placeholder={state.some}  />
        <BlueButton text={'Зберегти'} additionalStyles={styles.button}/>
    </div>
  )
}
