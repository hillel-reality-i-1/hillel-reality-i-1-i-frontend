import AsideSection from '../AsideSection/AsideSection';
import ContentSection from '../ContentSection/ContentSection';
import styles from './MainSection.module.scss';

const MainSection = ({ posts, onNextPage, countPosts, isSearch, isLoading }) => {
	return (
		<div className={styles.container}>
			<ContentSection
				posts={posts}
				onNextPage={onNextPage}
				countPosts={countPosts}
				isSearch={isSearch}
				isLoading={isLoading}
			/>
			<AsideSection />
		</div>
	);
};

export default MainSection;
