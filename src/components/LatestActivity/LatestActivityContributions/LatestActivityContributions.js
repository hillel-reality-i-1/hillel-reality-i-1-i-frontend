import TubInfo from "../TubInfo/TubInfo";
import { useEffect, useState } from 'react';
import { URL_COMMENT_ID } from '../../../config/API_url';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import axios from 'axios';
import CommentCard from '../../Content/CommentCard/CommentCard';
import styles from './LatestActivityContributions.module.scss'

const LatestActivityContributions = () => {
	const [visiblePosts, setVisiblePosts] = useState(5);
	const [postDetails, setPostDetails] = useState([]);
	const [shownPosts, setShownPosts] = useState([]);
	const { data, error, isLoading, refetch } = useGetUserDataQuery();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const requests = data.last_comments.map((number) =>
					axios.get(`${URL_COMMENT_ID}${number}`, {
						headers: {
							'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
						},
					})
				);

				const responses = await Promise.all(requests);
				const sortedPostDetails = responses
					.map((response) => response.data)
					.filter((comment) => comment.helpful_count > 2)
					.sort((a, b) => b.helpful_count - a.helpful_count);

				setPostDetails(sortedPostDetails);
				setShownPosts(sortedPostDetails.slice(0, visiblePosts));
			} catch (error) {
				console.error('Error fetching post details:', error);
			}
		};

		fetchData();
	}, [data.last_posts, visiblePosts]);

	console.log(postDetails)

	const handleNextPage = () => {
		const nextVisiblePosts = visiblePosts + 5;
		setShownPosts(postDetails.slice(0, nextVisiblePosts));
		setVisiblePosts(nextVisiblePosts);
	};

	return (
		<>
			<div className={styles.comments_block}>
				{

					postDetails.length > 0 ? (shownPosts.map((comment, index) => (
						<div key={index}>
							<CommentCard comment={comment} bgColor={{ backgroundColor: styles.backgroundCardColor }} />
						</div>)
					)) : null
				}

			</div>
			{visiblePosts < postDetails.length && (
				<button className={styles.button_see_more} onClick={handleNextPage}>
					Дивитися більше
				</button>
			)}

			{
				data.last_comments.length === 0 || postDetails.length === 0
					? (<TubInfo
						text={'Внески — це коментарі, що отримали найбільше позначок «Корисно», щоб користувачі швидше побачили важливу інформацію в U-Help. Будь ласка, взаємодійте з дописами на Головній сторінці.'}
					/>)
					: null
			}
		</>
	);
};

export default LatestActivityContributions;
