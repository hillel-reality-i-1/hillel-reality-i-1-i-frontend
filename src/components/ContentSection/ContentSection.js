import Card from '../Card/Card';
import styles from './ContentSection.module.scss';

const ContentSection = ({ posts, onNextPage, countPosts }) => {
	return (
		<section className={styles.container}>
			{posts &&
				posts.map((posts, id) => (
					<Card
						key={id}
						posts={posts}
					/>
				))}

			{countPosts > posts.length && (
				<button
					className={styles.btn_see_more}
					onClick={onNextPage}>
					See more
				</button>
			)}
		</section>
	);
};

export default ContentSection;
