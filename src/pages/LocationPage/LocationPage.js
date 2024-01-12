import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../assets/img/icons/settings-icons/arrow-left.svg';

import styles from './location.module.scss';

export default function LocationPage() {
  return (
    <div className={styles.container}>
      
      <Link to='/settings' className={styles.back}>
        <UserSettings /> Назад до Налаштувань
      </Link>
      <div className={styles.main}>
        LocationPage
      </div>
    
    </div>
  )
}
