import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/arrow-left.svg';

import styles from './backLinkButton.module.scss';

export default function BackLinkButton() {
  return (
    <>
      <Link to='/settings' className={styles.back} >
        <UserSettings /> Повернутися до Налаштувань
      </Link>
    </>
  )
}
