import { useEffect, useState } from 'react';
import axios from '../../config/axios/axios';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import arrow_back from '../../assets/img/icons/icons-SignUp/arrow_back.svg';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import Post from '../../components/Content/Post/Post';
import Contributions from '../../components/Content/Contributions/Contributions';
import { URL_GET_POST_DETAILS, URL_USER_INFO_USER_ID } from '../../config/API_url';
import styles from './PostDetailsPage.module.scss';

const PostDetailsPage = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	const userId = post && post?.author;
	const postId = post && post.id;

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await axios.get(`${URL_GET_POST_DETAILS}${id}`);

				setPost(data);
			} catch (error) {
				return error.message;
			}
		};

		fetchPost();
	}, [id]);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = userId && (await axios.get(`${URL_USER_INFO_USER_ID}${userId}`));
				setUser(data);
			} catch (error) {
				return error.message;
			}
		};

		fetchUserInfo();
	}, [userId]);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<div className={styles.container}>
				<ButtonBack customClassButton={styles.customClassButton}>
					<span className={styles.btn_inner}>
						<img
							src={arrow_back}
							alt='Arrow left'
							className={styles.icon_back}
						/>
						Повернутися на Головну
					</span>
				</ButtonBack>
				<div className={styles.post_details_wrapper}>
					<div className={styles.main_content}>
						<Post
							post={post}
							user={user}
						/>
					</div>
					<Contributions postId={postId} />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PostDetailsPage;
