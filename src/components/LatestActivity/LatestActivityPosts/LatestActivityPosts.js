import { Button } from 'antd';
import Card from '../../Card/Card'
import styles from './LatestActivityPosts.module.scss';
import { useEffect, useState } from 'react';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import { URL_GET_POST_DETAILS } from '../../../config/API_url';
import axios from 'axios';


const LatestActivityPosts = ({ userData }) => {
	const [visiblePosts, setVisiblePosts] = useState(5);
	const [postDetails, setPostDetails] = useState([]);
	const [shownPosts, setShownPosts] = useState([]);
	const { data, error, isLoading, refetch } = useGetUserDataQuery()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const requests = data.last_posts.map(async (number) => {
					const response = await axios.get(`http://dmytromigirov.space/api/v1/content/post/${number}`, {
						headers: {
							'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
						},
					});
					return response.data;
				});

				const postDetailsData = await Promise.all(requests);
				setPostDetails(postDetailsData.reverse());
				setShownPosts(postDetailsData.slice(0, visiblePosts));
			} catch (error) {
				console.error('Error fetching post details:', error);
			}
		};

		fetchData();
	}, [data.last_posts, visiblePosts]);

	const handleNextPage = () => {
		setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
		setShownPosts(postDetails.slice(0, visiblePosts + 5));
	};

	return (
		<>
			{shownPosts.map((posts, index) => (
				<div key={index}>
					{console.log(posts.id)}
					<Card posts={posts} />
				</div>
			))}

			{visiblePosts < postDetails.length && (
				<button className={styles.test} onClick={handleNextPage}>
					Дивитися більше
				</button>
			)}

			{/* <div className={styles.activity_posts_container}>

				<p className={styles.posts_description}>
					У вас ще немає жодного допису. Поділіться знаннями та досвідом з іншими користувачами.
				</p>
				<Button
					type='primary'
					htmlType='button'
					// disable='true'
					className={styles.btn_activity_posts}>
					<span className={styles.btn_inner}>Verify Profile</span>
				</Button>
			</div>  */}
		</>
	);
};

export default LatestActivityPosts;