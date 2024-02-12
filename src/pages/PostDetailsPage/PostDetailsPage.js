import Footer from '../../components/Footer/Footer';
import styles from './PostDetailsPage.module.scss';
import arrow_back from '../../assets/img/icons/icons-SignUp/arrow_back.svg';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import Post from '../../components/Content/Post/Post';
// import Comments from '../../components/Content/Comments/Comments';
import Contributions from '../../components/Content/Contributions/Contributions';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/axios/axios';
import { URL_GET_POST_DETAILS, URL_USER_INFO_USER_ID } from '../../config/API_url';

const PostDetailsPage = () => {
	// const navigate = useNavigate();
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	// const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const userId = post && post?.author;
	const postId = post && post.id;
	// const langUK = 'uk/';

	console.log(user);

	// useEffect(() => {
	// 	const fetchLanguage = async () => {
	// 		try {
	// 			await axios.get(`${URL_LANGUAGE}${langUK}`);
	// 		} catch (error) {
	// 			return error.message;
	// 		}
	// 	};

	// 	fetchLanguage();
	// }, []);

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
						{/* <Comments /> */}
					</div>
					<Contributions postId={postId} />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PostDetailsPage;
