
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './fullname.module.scss';

export default function FullName() {
  return (
    <div className={styles.container}>
      <BackLinkButton />
      
      <div className={styles.main}>
        FullName
      </div>
      
    </div>
  )
}
