import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import UserAvatar from './imageCrop/UserAvatar';
import { ReactComponent as Plus } from '../../assets/img/icons/user-profile/Plus.svg';
import { ReactComponent as Pen } from '../../assets/img/icons/user-profile/Pen.svg';
import { ReactComponent as Location } from '../../assets/img/icons/user-profile/location.svg';

import verified_icon from '../../assets/img/icons/user-profile/verified_icon.png';


import styles from './userHead.module.scss';

export default function UserHead({ data }) {

  return (
    <>
      <UserAvatar data={data} />
      <div className={styles.user__head__info}>
        <p className={styles.name}>
          {data?.full_name}
          <Tooltip placement='topLeft' title={'Це верифікований користувач'}>
            <img src={verified_icon} />
          </Tooltip>
        </p>
        <p className={styles.nick__name}>@{data?.username}</p>

        {data.country ?
          <p className={styles.location__grey}>
            <Location /> {data?.city?.name} {data?.country?.name}
          </p>
          :
          <Link to='/settings'> <p className={styles.location}><Plus /> Додати місцезнаходження </p></Link>
         
        }
      </div>
      <div className={styles.user__head__edit}>
        <Link to='/settings'>
          <p>
            <Pen /> Редагувати профіль
          </p>
        </Link>
      </div>
    </>
  );
}