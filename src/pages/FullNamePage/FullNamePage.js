
import FullName from '../../components/SettingsChange/FullName/FullName';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './fullname.module.scss';

export default function FullNamePage() {
  return (
    <div className={styles.container}>
      <BackLinkButton />
      
      <div className={styles.main}>
        <FullName />
      </div>
      
    </div>
  )
}
