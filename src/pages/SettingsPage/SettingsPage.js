import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';
import Settings from '../../components/SettingsComponents/Settings';
import Footer from '../../components/Footer/Footer';

import styles from './settingsPage.module.scss';

export default function SettingsPage() {
  
  return (
    <>
      <div className={styles.wrapper}>
        <BackLinkButton link='/user' text='Повернутися до Профілю' styleCustom={{margin: '14px'}} />
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Налаштування і конфіденційність</p>
        <Settings />
      </div>
      {/* <Footer /> */}
    </>
  )
}
