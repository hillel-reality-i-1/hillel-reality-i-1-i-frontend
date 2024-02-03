import BackLinkButton from '../../components/buttons/BackLinkButton/BackLinkButton';
import Socials from '../../components/SettingsChange/Socials/Socials';

import styles from './socialPage.module.scss';
export default function SocialPage() {
    return (
        <div className={styles.container}>
            <BackLinkButton />

            <div className={styles.main}>
                <Socials />
            </div>

        </div>
    )
}
