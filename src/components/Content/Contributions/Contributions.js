import SortingPanel from '../SortingPanel/SortingPanel';
import styles from './Contributions.module.scss';

import axios from '../../../config/axios/axios';
import { useEffect, useState } from 'react';

const Contributions = ({ postId }) => {
	const [page, setPage] = useState(1);
	// const postId = post && post.id;

	// console.log('postId', postId);
	useEffect(() => {
		const fetchGetContributions = async () => {
			try {
				const response =
					postId && (await axios.get(`/api/v1/content/post/${postId}/contributions/`));
				// , {
				// 	params: { page: page, page_size: 3 },
				// }));
				// console.log('Contribushin', response);
				// response.count && setCountComments(response.count);
				// response?.results && setComments((prevComments) => [...prevComments, ...response?.results]);
			} catch (error) {
				return error.message;
			}
		};

		fetchGetContributions();
	}, [page, postId]);
	return (
		<aside className={styles.container}>
			<h4 className={styles.title_contributions}>Внески</h4>
			<p className={styles.description_contributions}>
				Внески — це коментарі, що отримали найбільше позначок «Корисно», щоб користувачі швидше
				побачили важливу інформацію в U-Help.
			</p>
			<SortingPanel nameResult='внесків' />
			<div className={styles.contributions_wrapper}>
				<p className={styles.contributions_wrapper_empty}>На жаль, поки немає внесків.</p>
			</div>
		</aside>
	);
};

export default Contributions;
