import Professions from '../../components/SettingsChange/Professions/Professions';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './professions.module.scss';

export default function ProfessionsPage() {
  return (
      <div className={styles.container}>
        <BackLinkButton />
        <div className={styles.main}>
            <Professions />
        </div>
      </div>
  )
}
