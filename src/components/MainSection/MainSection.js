import AsideSection from '../AsideSection/AsideSection';
import ContentSection from '../ContentSection/ContentSection';
import styles from './MainSection.module.scss';

const MainSection = () => {
	return (
		<div className={styles.container}>
			<ContentSection />
			<AsideSection />
		</div>
	);
};

export default MainSection;
