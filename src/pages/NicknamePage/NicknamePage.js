import NickName from '../../components/SettingsChange/NickName/NickName';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './nickname.module.scss';

export default function NicknamePage() {


  return (
    <div className={styles.container}>
      <BackLinkButton />
      <div className={styles.main}>
        <NickName />
      </div>
    
    </div>
  )
}
