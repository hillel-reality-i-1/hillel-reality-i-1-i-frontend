import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as Arrow } from '../../../assets/img/icons/settings-icons/arrow.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-facebook.svg';
import { ReactComponent as InstIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-inst.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-linkedin.svg';
import { ReactComponent as TelegramIcon } from '../../../assets/img/icons/settings-icons/socials-icons/Socials-telegram.svg';
import styles from './personalInfo.module.scss';

export default function PersonalInfo({ data }) {

  return (
    <>
      <h2 className={styles.title}><UserSettings /> Особиста інформація </h2>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p className={styles.info__type}>Нікнейм</p>
          <Link className={styles.info__link} to='nickname' state={{ username: data?.username, user: data?.user }}>
            @{data?.username} <Arrow />
          </Link>
        </div>
        <div className={styles.info}>
          <p className={styles.info__type}>Повне ім’я</p>
          <Link className={styles.info__link} to='fullName'>{data?.full_name} <span className={styles.info__link__arrow} ><Arrow /> </span> </Link>
        </div>
        <div className={styles.info}><p className={styles.info__type}>Локація</p> <Link className={styles.info__link} to='location'> {data.city?.name && data.country?.name
          ? `${data.city.name},  ${data.country.name}`
          : ''} <Arrow /> </Link> </div>
        <div className={styles.info}><p className={styles.info__type}>Інфо</p> <Link className={styles.info__link} to='biography'><span>{data.about_my_self}</span><Arrow /> </Link> </div>
        <div className={styles.info}><p className={styles.info__type}>Соціальні мережі</p> <Link className={styles.info__link} to='socials'>
          <div style={{ display: 'flex', gap: '6px' }}>
            {data?.instagram ? <InstIcon /> : ''}
            {data?.telegram ? <TelegramIcon /> : ''}
            {data?.facebook ? <FacebookIcon /> : ''}
            {data?.linkedin ? <LinkedinIcon /> : ''}
          </div>

          <Arrow /> </Link> </div>
      </div>
    </>
  )
}
