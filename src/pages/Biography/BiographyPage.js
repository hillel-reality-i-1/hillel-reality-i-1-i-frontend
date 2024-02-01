import Biography from '../../components/SettingsChange/Biography/Biography';
import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';

import styles from './biography.module.scss';

export default function BiographyPage() {
    return (
        <div className={styles.container}>
            <BackLinkButton />
            <div className={styles.main}>
                <Biography />
            </div>
        </div>
    )
}
