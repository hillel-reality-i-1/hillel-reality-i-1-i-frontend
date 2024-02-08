import Password from '../../components/SettingsChange/Password/Password';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './password-page.module.scss';

export default function PasswordPage() {
  return (
      <div className={styles.container}>
          <BackLinkButton />
          <div className={styles.main}>
            <Password />
          </div>
      </div>
  )
}
