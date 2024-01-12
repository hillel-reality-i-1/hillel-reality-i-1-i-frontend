import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../assets/img/icons/settings-icons/arrow-left.svg';
import NickName from '../../components/SettingsChange/NickName/NickName';

import styles from './nickname.module.scss';

export default function NicknamePage() {
  return (
    <div className={styles.container}>
      
      <Link to='/settings' className={styles.back}>
        <UserSettings /> Назад до Налаштувань
      </Link>
      <div className={styles.main}>
        <NickName />
      </div>
    
    </div>
  )
}
