import { Tooltip } from 'antd';

import { ReactComponent as Location } from '../../../assets/img/icons/user-profile/location.svg';
import verified_icon from '../../../assets/img/icons/user-profile/verified_icon.png';

import styles from './UsersHead.module.scss';
import { ReactComponent as Avatar } from '../../../assets/img/icons/user-profile/Avatar.svg';

export default function UsersHead({ data }) {

  if (data === '') {
    return <div>Loading...</div>;
  }
  return (
    <>
      {
        data.user_profile?.profile_picture ? <div className={styles.avatar_svg_wrapper}>
          <img className={styles.avatar_svg} alt={'user avatar'} src={data.user_profile?.profile_picture} />
        </div> : <Avatar className={styles.avatar_svg} />
      }
      <div className={styles.user__head__info}>
        <p className={styles.name}>
          {data.user.full_name}
          {
            data.user_profile.phone_verified
              ? <Tooltip placement='topLeft' title={'Це верифікований користувач'}>
                <img src={verified_icon} alt={'no avatar'} />
              </Tooltip>
              : null
          }
        </p>
        <p className={styles.nick__name}>
          @{data.user.username}
        </p>
        {data.user_profile.country
          ?
          <p className={styles.location__grey}>
            <Location /> {data.user_profile.city} {data.user_profile.country}
          </p>
          : <p className={styles.location__grey}>
            <Location /> інформація відсутня
          </p>
        }
      </div>
    </>
  );
}