import { Switch } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as Briefcase } from '../../../assets/img/icons/settings-icons/briefcase.svg';
import { ReactComponent as Arrow } from '../../../assets/img/icons/settings-icons/arrow.svg';
import { ReactComponent as InfoIcon } from '../../../assets/img/icons/settings-icons/info-icon.svg';

import styles from './professionalInfo.module.scss';

export default function ProfessionalInfo() {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <div className={styles.professional}>
        <h2 className={styles.title}><Briefcase /> Особиста інформація</h2>  
        <div className={styles.professional__switcher}>
          <Switch defaultChecked onChange={onChange} />
          <p>Експертний Профіль</p>
          <InfoIcon />
        </div>

      </div>
      
      
      <div className={styles.wrapper}>
        <div className={styles.info}><p className={styles.info__type}>Експертиза</p> <Link className={styles.info__link}>Design <Arrow /> </Link> </div>
        <div className={styles.info}><p className={styles.info__type}>Послуги</p> <Link className={styles.info__link}>UX/UI Design... <Arrow /> </Link> </div>
      </div>

    </>
  )
}
