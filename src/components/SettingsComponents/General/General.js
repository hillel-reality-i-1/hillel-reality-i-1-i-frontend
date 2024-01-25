import { Link } from 'react-router-dom';
import { ReactComponent as Lock } from '../../../assets/img/icons/settings-icons/lock.svg';
import { ReactComponent as Arrow } from '../../../assets/img/icons/settings-icons/arrow.svg';

import styles from './general.module.scss';

export default function General() {
  return (
    <>
        {/* <h2 className={styles.title}><Lock /> Загальні </h2>
        <div className={styles.wrapper}>
          <div className={styles.info}><p className={styles.info__type}>Мова</p> <Link className={styles.info__link}>English<Arrow /> </Link> </div>
        </div> */}
        <div className={styles.general__footer}> <a>Видалити Профіль</a> </div>
    </>
  )
}
