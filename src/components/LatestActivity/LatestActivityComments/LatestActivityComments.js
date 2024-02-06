import styles from './LatestActivityComments.module.scss';
import { useEffect, useState } from 'react';
import TubInfo from '../TubInfo/TubInfo';
import CommentCard from '../../Content/CommentCard/CommentCard';
import axios from 'axios';
import { useGetUserDataQuery } from '../../../store/services/userApi';

const LatestActivityComments = () => {
	const [visiblePosts, setVisiblePosts] = useState(5);
	const [postDetails, setPostDetails] = useState([]);
	const [shownPosts, setShownPosts] = useState([]);
	const { data, error, isLoading, refetch } = useGetUserDataQuery();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const requests = data.last_comments.map((number) =>
					axios.get(`http://dmytromigirov.space/api/v1/content/comment/${number}`, {
						headers: {
							'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
						},
					})
				);

				const responses = await Promise.all(requests);
				const sortedPostDetails = responses.map((response) => response.data).sort((a, b) => b.id - a.id);

				setPostDetails(sortedPostDetails);
				setShownPosts(sortedPostDetails.slice(0, visiblePosts));
			} catch (error) {
				console.error('Error fetching post details:', error);
			}
		};

		fetchData();
	}, [data.last_posts, visiblePosts]);

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
				postDetails.length === 0
					? <TubInfo
						text={'У вас ще немає жодного коментаря. Будь ласка, взаємодійте з дописами на Головній сторінці.'}
					/>
					: null
			}
		</>
	);
};

export default LatestActivityComments;
