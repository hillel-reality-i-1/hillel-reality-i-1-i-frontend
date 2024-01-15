import { Link } from 'react-router-dom';
import { ReactComponent as Lock } from '../../../assets/img/icons/settings-icons/lock.svg';
import { ReactComponent as Arrow } from '../../../assets/img/icons/settings-icons/arrow.svg';

import styles from './privacy.module.scss';

export default function Privacy() {
  return (
    <>
        <h2 className={styles.title}><Lock /> Особиста інформація </h2>
        <div className={styles.wrapper}>
            <div className={styles.info}><p className={styles.info__type}>Пошта</p> <Link className={styles.info__link}>mail@gmail.com <Arrow /> </Link> </div>
            <div className={styles.info}><p className={styles.info__type}>Номер телефону</p> <Link className={styles.info__link}>+38 050 844 34 71<Arrow /> </Link> </div>
            <div className={styles.info}><p className={styles.info__type}>Пароль</p> <Link className={styles.info__link}>*******<Arrow /> </Link> </div>
        </div>
    </>
  )
}
