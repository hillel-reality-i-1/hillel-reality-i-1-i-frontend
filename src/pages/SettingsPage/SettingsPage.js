import Settings from '../../components/SettingsComponents/Settings';

import styles from './settingsPage.module.scss';

export default function SettingsPage() {
  
  return (
    <div className={styles.container}> 
        <p className={styles.title}>Налаштування і конфіденційність</p>
        <Settings />
    </div>
  )
}
