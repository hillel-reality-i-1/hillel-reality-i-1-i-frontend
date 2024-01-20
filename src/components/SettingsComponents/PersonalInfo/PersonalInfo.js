import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings.svg';
import { ReactComponent as Arrow } from '../../../assets/img/icons/settings-icons/arrow.svg';

import styles from './personalInfo.module.scss';

export default function PersonalInfo({data}) {
  console.log(  data);
  return (
    <>
      <h2 className={styles.title}><UserSettings /> Особиста інформація </h2>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p className={styles.info__type}>Нікнейм</p> 
            <Link className={styles.info__link } to='nickname'>
              @{data.username} <Arrow /> 
            </Link> 
        </div>
        <div className={styles.info}><p className={styles.info__type}>Повне ім’я</p> <Link className={styles.info__link} to='fullName'>{data.full_name} <Arrow /> </Link> </div>
        <div className={styles.info}><p className={styles.info__type}>Локація</p> <Link className={styles.info__link} to='location'>{data.city.name},{data.country.name}<Arrow /> </Link> </div>
        <div className={styles.info}><p className={styles.info__type}>Summary</p> <Link className={styles.info__link}>Hello! I am a UX/UI... {data.about_my_self}<Arrow /> </Link> </div>
        <div className={styles.info}><p className={styles.info__type}>Соціальні мережі</p> <Link className={styles.info__link}>social<Arrow /> </Link> </div>
      </div>
    </>
  )
}
