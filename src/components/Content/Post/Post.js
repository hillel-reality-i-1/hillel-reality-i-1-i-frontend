import { useEffect, useState } from 'react';

import axios from '../../../config/axios/axios';
// import img_card from '../../assets/img/img_card/img_card.png';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';
import icon_expert from '../../../assets/img/icons/post/icon_expert.svg';
import icon_save from '../../../assets/img/icons/post/icon_save.svg';
import icon_like from '../../../assets/img/icons/post/icon_like.svg';
// import icon_comments from '../../../assets/img/icons/post/icon_comments.svg';
import { calculateReadTime } from '../../../helpers/calculateReadTime';
import { formatTimeElapsed } from '../../../helpers/formatTimeElapsed';
import { URL_GET_POST_DETAILS, URL_LANGUAGE, URL_USER_INFO_USER_ID } from '../../../config/API_url';
import CustomButton from '../../CustomButton/CustomButton';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import SortingPanel from '../SortingPanel/SortingPanel';

import styles from './Post.module.scss';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const userId = post && post?.author;

	const langUK = 'uk/';

	useEffect(() => {
		const fetchLanguage = async () => {
			try {
				await axios.get(`${URL_LANGUAGE}${langUK}`);
			} catch (error) {
				return error.message;
			}
		};

		fetchLanguage();
	}, []);

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

	// function for converting data from the server to EditorState
	useEffect(() => {
		const getEditorStateFromPostData = () => {
			const rawContentFromServer = post?.content;

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
	}, [post]);

	const timeForRead = post && calculateReadTime(post?.content);
	const timeElapsed = post && formatTimeElapsed(post?.creation_date);
	const userCity = user?.user_profile?.city && user?.user_profile?.city.split(',')[0];

	const rawContentState = draftToHtml(convertToRaw(editorState.getCurrentContent()));

	return (
		<>
			<div className={styles.post_wrapper}>
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
										<span className={styles.expert_badge}>
											{user?.user_profile_extended?.profession}
										</span>
									</div>
								)}
							</div>
							<div className={styles.user_info_bottom_wrapper}>
								<span className={styles.user_nickname}>@{user?.user?.username}</span>
								<span className={user?.user_profile?.country && styles.user_country_dot}>
									{user?.user_profile?.country}
									{user?.user_profile?.country && userCity && ','} {userCity}
								</span>
							</div>
						</div>
					</div>
					<span className={styles.time_of_creation}>{timeElapsed}</span>
				</div>
				<div className={styles.post}>
					<h2 className={styles.post_title}>{post?.title}</h2>

					<div className={styles.post_content}>
						{post?.image_to_post && (
							<figure className={`${styles.content_img_wrapper}`}>
								<img
									className={styles.image_post}
									src={`${process.env.REACT_APP_API_BASE_URL}${post?.image_to_post}`}
									alt='Зображення к допису'
									// style={{ width: '192px', height: '100%', display: 'block' }}
								/>
							</figure>
						)}
						{/* <img src={} className={styles.post_content_img} /> */}
						<div
							className={styles.post_content_text}
							dangerouslySetInnerHTML={rawContentState && { __html: rawContentState }}
						/>
					</div>
					<div className={styles.post_footer}>
						<div className={styles.post_footer_tags}>
							{post?.country &&
								post?.country.map((item, i) => (
									<span
										className={styles.post_footer_tags_label}
										key={i}>
										{item}
									</span>
								))}
							{post?.category.length > 0 &&
								post?.category.map((item, i) => (
									<span
										className={styles.post_footer_tags_label}
										key={i}>
										{item}
									</span>
								))}
							{/* <span className={styles.post_footer_tags_label}>{post?.category}</span> */}
						</div>
						<div className={styles.post_footer_bottom}>
							<div className={styles.post_footer_bottom_left_col}>
								<img
									src={icon_save}
									alt='Save'
								/>
								<span className={styles.time_read}>{timeForRead} min read</span>
							</div>

							<div className={styles.post_footer_bottom_right_col}>
								<img
									src={icon_like}
									alt='Like'
								/>
								<span className={styles.quantity_likes}>2 тис</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.comments}>
				{' '}
				<SortingPanel nameResult='коментарів' />
				<div className={styles.creation_comment}>
					<div className={styles.creation_comment_input_wrapper}>
						<img
							src={Avatar}
							alt='Avatar'
							style={{ width: '56px', height: '56px', marginRight: '16px' }}
						/>
						<TextArea
							rows={4}
							placeholder='Розскажіть свою думку тут.'
							maxLength={6}
						/>
					</div>
				</div>
				<div className={styles.creation_comment_btn_wrapper}>
					<CustomButton
						htmlType='submit'
						type='primary'
						isDisable={true}>
						Залишити коментар
					</CustomButton>
				</div>
			</div>
		</>
	);
};

export default Post;
