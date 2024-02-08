import SortingPanel from '../SortingPanel/SortingPanel';
import styles from './Contributions.module.scss';

import axios from '../../../config/axios/axios';
import { useEffect, useState } from 'react';
import ContributionCard from '../ContributionCard/ContributionCard';
import { useGetUserDataQuery } from '../../../store/services/userApi';

const Contributions = ({ postId }) => {
	const { data } = useGetUserDataQuery();
	const [page, setPage] = useState(1);
	const [contributions, setContributions] = useState([]);
	const [countContributions, setCountContributions] = useState(0);
	const userId = data && data.user;
	// const postId = post && post.id;
	// console.log(countContributions);
	// console.log(contributions);
	// console.log('postId', postId);
	useEffect(() => {
		const fetchGetContributions = async () => {
			try {
				const response =
					postId &&
					(await axios.get(`/api/v1/content/post/${postId}/contributions/`, {
						params: { page: page, page_size: 1 },
					}));
				response.count && setCountContributions(response.count);
				response?.results &&
					setContributions((prevContributions) => [...prevContributions, ...response?.results]);
			} catch (error) {
				return error.message;
			}
		};

		fetchGetContributions();
	}, [page, postId]);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};
	return (
		<aside className={styles.container}>
			<h4 className={styles.title_contributions}>Внески</h4>
			<p className={styles.description_contributions}>
				Внески — це коментарі, що отримали найбільше позначок «Корисно», щоб користувачі швидше
				побачили важливу інформацію в U-Help.
			</p>
			<SortingPanel
				nameResult='внесків'
				count={countContributions}
			/>
			<div className={styles.contributions_wrapper}>
				{contributions && countContributions > 0 ? (
					contributions.map((item) => (
						<ContributionCard
							key={item.id}
							contribution={item}
							userId={userId}
						/>
					))
				) : (
					<p className={styles.contributions_wrapper_empty}>На жаль, поки немає внесків.</p>
				)}
				{countContributions > contributions?.length && (
					<button
						className={styles.btn_see_more}
						onClick={handleNextPage}>
						Дивитися більше
					</button>
				)}
			</div>
		</aside>
	);
};

export default Contributions;
