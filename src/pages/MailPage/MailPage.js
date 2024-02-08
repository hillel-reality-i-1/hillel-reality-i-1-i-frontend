import Mail from '../../components/SettingsChange/Mail/Mail';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './mail.module.scss';

export default function MailPage() {
  return (
    <div className={styles.container}>
      <BackLinkButton />
      <div className={styles.main}>
        <Mail />
      </div>
    </div>
  )
}
