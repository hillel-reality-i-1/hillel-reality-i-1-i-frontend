import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Switch } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as Briefcase } from '../../../assets/img/icons/settings-icons/briefcase.svg';
import { ReactComponent as Arrow } from '../../../assets/img/icons/settings-icons/arrow.svg';
import { ReactComponent as InfoIcon } from '../../../assets/img/icons/settings-icons/info-icon.svg';

import styles from './professionalInfo.module.scss';

export default function ProfessionalInfo({ data }) {

  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const [expertUser, setExpertUSer] = useState(null)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      };
      const expertUserProfileData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/expert_user_profile_by_user_id/${data.user}/`,
        config)
      setExpertUSer(expertUserProfileData.data)
    } catch (error) {
      console.info(error)
    }
  };

  return (
    <>
      <div className={styles.professional}>
        <h2 className={styles.title}><Briefcase /> Сфера діяльності</h2>  
        <div className={styles.professional__switcher}>
          {/* <UserProfileSwitcher verified={data.phone_verified}
            idExpertProfile={144}
            setCheckedExpert={setCheckedExpert}
          /> */}
          <p>Експертний Профіль</p>
          {/* <InfoIcon /> */}
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p className={styles.info__type}>Професії</p>
          <Link className={styles.info__link} to='professions' state={{ user: expertUser }}>{expertUser?.profession[0]} <Arrow /> </Link>
        </div>
        <div className={styles.info}>
          <p className={styles.info__type}>Послуги</p>
          <Link className={styles.info__link} to='services' state={{ user: expertUser }}>{expertUser?.service[0]}<Arrow /> </Link>
        </div>
      </div>
    </>
  )
}
