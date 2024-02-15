import { useEffect, useState } from 'react';
import axios from '../../config/axios/axios';
import Avatar from '../../assets/img/icons/user-profile/Avatar.svg';
import icon_expert from '../../assets/img/icons/post/icon_expert.svg';
import icon_comments from '../../assets/img/icons/post/icon_comments.svg';
import { calculateReadTime } from '../../helpers/calculateReadTime';
import { formatTimeElapsed } from '../../helpers/formatTimeElapsed';
import { URL_LANGUAGE, URL_USER_INFO_USER_ID } from '../../config/API_url';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ButtonPostSave from '../Content/ButtonPostSave/ButtonPostSave';

const Card = ({ posts, bgColor }) => {
	const [postData, setPostData] = useState(null);
	const [user, setUser] = useState(null);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const userId = postData && postData?.author;
	const postId = postData && postData?.id;
	const langUK = 'uk/';

	useEffect(() => {
		const fetchLanguage = async () => {
			try {
				const data = await axios.get(`${URL_LANGUAGE}${langUK}`);
				return data;
			} catch (error) {
				return error.message;
			}
		};

		fetchLanguage();
	}, []);

	useEffect(() => {
		setPostData(posts);
	}, [posts]);

	useEffect(() => {
		const fetchInfoUser = async () => {
			try {
				const data = userId && (await axios.get(`${URL_USER_INFO_USER_ID}${userId}`));
				setUser(data);
			} catch (error) {
				return error.message;
			}
		};

		fetchInfoUser();
	}, [userId]);

	// function for converting data from the server to EditorState
	useEffect(() => {
		const getEditorStateFromPostData = () => {
			const rawContentFromServer = postData?.content;

			if (rawContentFromServer !== undefined) {
				try {
					const jsonData = JSON.parse(rawContentFromServer);

					const contentState = convertFromRaw(jsonData);
					const newEditorState = EditorState.createWithContent(contentState);
					setEditorState(newEditorState);
				} catch (error) {
					return error.message;
				}
			}
		};

		getEditorStateFromPostData();
	}, [postData]);

	const timeForRead = postData && calculateReadTime(postData?.content);
	const timeElapsed = postData && formatTimeElapsed(postData?.creation_date);
	const userCity = user?.user_profile?.city && user?.user_profile?.city.split(',')[0];
	const rawContentState = draftToHtml(convertToRaw(editorState.getCurrentContent()));
	const isImage = postData?.image_to_post;

	return (
		<div
			style={bgColor}
			className={`${styles.container} ${styles.card_wrapper}`}>
			<div
				className={`${styles.content_wrapper} ${isImage ? styles.content_container : ''}`}
				// style={{ maxWidth: isImage ? '580px' : '' }}
			>
				<div className={styles.content_header}>
					<Link
						to={`user/${userId}`}
						replace={true}
						className={styles.user}>
						{user?.user_profile?.profile_picture ? (
							<div className={styles.img_wrapper}>
								<img
									src={user?.user_profile?.profile_picture}
									alt='Avatar'
									className={styles.img_avatar}
									style={{ borderRadius: '56px' }}
								/>
							</div>
						) : (
							<div className={styles.img_wrapper}>
								<img
									src={Avatar}
									alt='Avatar'
									className={styles.img_avatar}
								/>
							</div>
						)}
						<div className={styles.user_data_wrapper}>
							<div className={styles.user_info_top_wrapper}>
								<span className={styles.full_name}>{user?.user?.full_name}</span>
								{user?.user_profile_extended?.profession && (
									<div className={styles.label_vr_exp_wrapper}>
										<img
											className={styles.verify}
											src={icon_expert}
											alt='icon expert'
										/>
										{user?.user_profile_extended?.profession[0] && (
											<span className={styles.expert_badge}>
												{user?.user_profile_extended?.profession[0]}
											</span>
										)}
									</div>
								)}
							</div>
							<div className={styles.user_info_bottom_wrapper}>
								<span className={styles.user_nickname}>@{user?.user?.username}</span>
								<span className={user?.user_profile?.country && styles.user_country_dot}>
									{user?.user_profile?.country}
									{user?.user_profile?.country && userCity && ','} {userCity && userCity}
								</span>
							</div>
						</div>
					</Link>
					<span className={styles.time_of_creation}>{timeElapsed}</span>
				</div>
				<Link to={`/postDetailsPage/${postData?.id}`}>
					<article className={styles.content}>
						<h5 className={styles.content_title}>{postData?.title}</h5>
						<div className={`${styles.content_post}`}>
							<div
								className={styles.content_style}
								dangerouslySetInnerHTML={rawContentState && { __html: rawContentState }}
							/>
						</div>
						<span className={styles.btn_read_more}>Читати більше…</span>
					</article>
				</Link>
				<div className={styles.content_footer}>
					<div className={styles.content_footer_left_col}>
						<span className={styles.post_user}>{postData?.country[0]}</span>
						<span className={styles.post_category}>{postData?.category[0]}</span>

						<ButtonPostSave postId={postId} />
						<span className={styles.time_read}>{timeForRead} хв читати</span>
					</div>
					<div className={styles.content_footer_right_col}>
						{/* <div className={styles.like_wrapper}>
							<button className={styles.btn_like}>
								<img
									src={icon_like}
									alt='Like'
									className={styles.img_like}
								/>
							</button>
							<span>0</span>
						</div> */}
						<div className={styles.comments_wrapper}>
							<img
								src={icon_comments}
								alt='Comments'
								className={styles.img_comments}
							/>
							<span>{postData?.comments?.length}</span>
						</div>
					</div>
				</div>
			</div>
			{postData?.image_to_post && (
				<figure
					className={`${styles.content_img_wrapper}
				 
				 `}>
					<img
						className={styles.image_post}
						src={`${process.env.REACT_APP_API_BASE_URL}${postData?.image_to_post}`}
						alt='Зображення к допису'
					/>
				</figure>
			)}
		</div>
	);
};

export default Card;
