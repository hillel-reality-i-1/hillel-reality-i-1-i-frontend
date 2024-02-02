import { useEffect, useState } from 'react';

import axios from '../../config/axios/axios';
import img_card from '../../assets/img/img_card/img_card.png';
import Avatar from '../../assets/img/icons/user-profile/Avatar.svg';
import icon_expert from '../../assets/img/icons/post/icon_expert.svg';

import icon_like from '../../assets/img/icons/post/icon_like.svg';
import icon_comments from '../../assets/img/icons/post/icon_comments.svg';
import { calculateReadTime } from '../../helpers/calculateReadTime';
import { formatTimeElapsed } from '../../helpers/formatTimeElapsed';
import { URL_LANGUAGE, URL_USER_INFO_USER_ID } from '../../config/API_url';
// import icon_active_dropdown from '../../assets/img/icons/icon-search-bar/icon_active_dropdown.svg';
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

	// const handleSaveClick = async () => {
	// 	try {
	// 		const response = postId && (await axios.post(`/api/v1/content/post/${postId}/save-remove/`));
	// 		console.log(response);

	// 		if (response.status === 200 && response.message === 'Допис успішно додано в обране.') {
	// 			setIsSaved(true);
	// 		} else if (
	// 			response.status === 200 &&
	// 			response.detail === 'Допіс успишно видалено з обраного'
	// 		) {
	// 			setIsSaved(false);
	// 		} else {
	// 			return;
	// 		}
	// 	} catch (error) {
	// 		return error.message;
	// 	}
	// };

	const timeForRead = postData && calculateReadTime(postData?.content);
	const timeElapsed = postData && formatTimeElapsed(postData?.creation_date);
	const userCity = user?.user_profile?.city && user?.user_profile?.city.split(',')[0];

	const rawContentState = draftToHtml(convertToRaw(editorState.getCurrentContent()));

	const isImage = postData?.image_to_post;
	// console.log('isSaved', isSaved);
	// console.log('user', user);
	// console.log('postData', postData);
	return (
		<div
			style={bgColor}
			className={`${styles.container} ${styles.card_wrapper}`}>
			<div
				className={styles.content_wrapper}
				style={{ maxWidth: isImage ? '580px' : '' }}>
				<div className={styles.content_header}>
					<div className={styles.user}>
						{user?.user_profile?.profile_picture ? (
							<img
								src={user?.user_profile?.profile_picture}
								alt='Avatar'
								style={{ width: '56px', height: '56px', borderRadius: '56px' }}
							/>
						) : (
							<img
								src={Avatar}
								alt='Avatar'
								style={{ width: '56px', height: '56px' }}
							/>
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
					</div>
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
						<div className={styles.btn_read_more}>Read more...</div>
					</article>
				</Link>
				<div className={styles.content_footer}>
					<div className={styles.content_footer_left_col}>
						<span className={styles.post_user}>{postData?.country[0]}</span>
						<span className={styles.post_category}>{postData?.category[0]}</span>

						<ButtonPostSave
							postId={postId}
							// isSaved={isPostSaved}
							// onSave={handleSavePost}
						/>
						<span className={styles.time_read}>{timeForRead} min read</span>
					</div>
					<div className={styles.content_footer_right_col}>
						<div className={styles.like_wrapper}>
							<button className={styles.btn_like}>
								<img
									src={icon_like}
									alt='Like'
									className={styles.img_like}
								/>
							</button>
							<span>64k</span>
						</div>
						<div className={styles.comments_wrapper}>
							<button className={styles.btn_comments}>
								<img
									src={icon_comments}
									alt='Comments'
									className={styles.img_comments}
								/>
							</button>
							<span>4.5k</span>
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
						// style={{ width: '192px', height: '100%', display: 'block' }}
					/>
				</figure>
			)}
		</div>
	);
};

export default Card;
