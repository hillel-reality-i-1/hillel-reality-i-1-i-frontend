import Location from '../../components/SettingsChange/Location/Location';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './location.module.scss';

export default function LocationPage() {
  return (
    <div className={styles.container}>
      <BackLinkButton />
      <div className={styles.main}>
        <Location />
      </div>
    </div>
  );
}
