import { Button } from 'antd';
import styles from './UsersLatestActivityPosts.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../Card/Card';


const LatestActivityPosts = ({userData}) => {
	const [dataUser, setDatUser] = useState('');
	const [userId, setuserId] = useState('');
	const [postDetails, setPostDetails] = useState([]);

	const { id } = useParams();

	useEffect(() => {
    
        const headers = {
            'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
            'Content-Type': 'application/json',
        };
        axios.get(`${'http://dmytromigirov.space/api/v1/users/user_profile_by_user_id/'}${id}/`, { headers })
            .then(response => {
				setPostDetails(response.data.id)
                // setDatUser(response.data);
            })
            .catch(error => {
                console.error('Error during the request:', error);
            });


			
    }, [id]);


	

	// useEffect(() => {

	// 	const fetchData = async () => {
	// 		try {
	// 			const requests = postDetails.map(async (number) => {
	// 				const response = await axios.get(`http://dmytromigirov.space/api/v1/content/post/${number}`, {
	// 					headers: {
	// 						'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
	// 						'Content-Type': 'application/json',
	// 					},
	// 				});
	// 				return response.data;
	// 			});

	// 			const postDetailsData = await Promise.all(requests);
	// 			setPostDetails(postDetailsData);
	// 		} catch (error) {
	// 			console.error('Error fetching post details:', error);
	// 		}
	// 	};

	// 	fetchData();
	// }, [postDetails]);

	return (
		<>	
			{/* {postDetails.map((posts, index) => (
				<Card key={index} posts={posts} />
			))} */}
			{/* <div className={styles.activity_posts_container}>
				<p className={styles.posts_description}>
					Не має ще дописів.
				</p>
			</div> */}
		</>
	);
};

export default LatestActivityPosts;
