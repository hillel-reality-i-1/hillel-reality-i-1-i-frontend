import { useEffect, useState } from 'react';
import axios from '../../config/axios/axios';
import Card from '../Card/Card';
import styles from './ContentSection.module.scss';

const ContentSection = ({ posts, onNextPage }) => {
	// console.log('posts', posts);

	return (
		<section className={styles.container}>
			{posts &&
				posts.map((posts, id) => (
					<Card
						key={id}
						posts={posts}
					/>
				))}
			{/* {posts.length > 3 && ( */}
			<button
				className={styles.btn_see_more}
				onClick={onNextPage}>
				See more
			</button>
			{/* )} */}
		</section>
	);
};

export default ContentSection;
