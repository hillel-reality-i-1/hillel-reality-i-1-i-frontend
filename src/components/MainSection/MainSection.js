import AsideSection from '../AsideSection/AsideSection';
import ContentSection from '../ContentSection/ContentSection';
import styles from './MainSection.module.scss';

const MainSection = ({ posts, onNextPage }) => {
	return (
		<div className={styles.container}>
			<ContentSection
				posts={posts}
				onNextPage={onNextPage}
			/>
			<AsideSection />
		</div>
	);
};

export default MainSection;
