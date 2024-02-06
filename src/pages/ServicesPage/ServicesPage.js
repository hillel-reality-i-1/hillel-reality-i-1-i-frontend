import Services from '../../components/SettingsChange/ServicesComponent/Services';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './services.module.scss';

export default function ServicesPage() {
  return (
      <div className={styles.container}>
          <BackLinkButton />
          <div className={styles.main}>
             <Services />
          </div>
      </div>
  )
}
