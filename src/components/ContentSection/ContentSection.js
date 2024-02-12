import { Spin } from 'antd';
import Card from '../Card/Card';
import cat from '../../assets/img/icons/post/cat.svg';
import styles from './ContentSection.module.scss';

const ContentSection = ({ posts, onNextPage, countPosts, isSearch, isLoading }) => {
	return (
		<section className={styles.container}>
			{isSearch && (
				<span className={styles.count_posts}>{countPosts} результатів за вашим пошуком</span>
			)}
			{!isLoading && countPosts === 0 && (
				<div className={styles.empty_search_results}>
					<img
						className={styles.empty_search_results_img}
						src={cat}
						alt='Cat'
					/>
					<p className={styles.empty_search_results_text}>
						Нам прикро про це повідомляти, але схоже, що ваш пошук не дав результатів… Можливо,
						варто перевірити написання або спробувати інші ключові слова?
					</p>
				</div>
			)}
			{isLoading && (
				<div className={styles.spin_wrapper}>
					<Spin />
				</div>
			)}

			{!isLoading &&
				posts &&
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
					Дивитися більше
				</button>
			)}
		</section>
	);
};

export default ContentSection;
