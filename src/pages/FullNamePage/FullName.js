import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../assets/img/icons/settings-icons/arrow-left.svg';

import styles from './fullname.module.scss';

export default function FullName() {
  return (
    <div className={styles.container}>
      
      <Link to='/settings' className={styles.back}>
        <UserSettings /> Назад до Налаштувань
      </Link>
      <div className={styles.main}>
        FullName
      </div>
    
    </div>
  )
}
