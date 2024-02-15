import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../config/axios/axios';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';
import icon_expert from '../../../assets/img/icons/post/icon_expert.svg';
// import icon_like from '../../../assets/img/icons/post/icon_like.svg';
import icon_dot_menu from '../../../assets/img/icons/post/icon_dot_menu.svg';
import icon_delete from '../../../assets/img/icons/post/icon_delete.svg';
import { calculateReadTime } from '../../../helpers/calculateReadTime';
import { formatTimeElapsed } from '../../../helpers/formatTimeElapsed';
import { URL_LANGUAGE } from '../../../config/API_url';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ButtonPostSave from '../ButtonPostSave/ButtonPostSave';
import Comments from '../Comments/Comments';
import { Dropdown } from 'antd';
import { useGetUserDataQuery } from '../../../store/services/userApi';

import styles from './Post.module.scss';

const Post = ({ post, user }) => {
	const navigate = useNavigate();
	const { data } = useGetUserDataQuery();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const userId = post && post?.author;
	const postId = post && post.id;
	const langUK = 'uk/';
	const isMyPost = data?.user === userId;

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

	const handlerDelete = async () => {
		try {
			postId && (await axios.delete(`/api/v1/content/post/${postId}/delete`));
			navigate('/');
		} catch (error) {
			return error.message;
		}
	};

	// const handlerPostEditing = () => {
	// 	navigate(`/postEditing/${id}`, { replace: true });
	// };

	const timeForRead = post && calculateReadTime(post?.content);
	const timeElapsed = post && formatTimeElapsed(post?.creation_date);
	const userCity = user?.user_profile?.city && user?.user_profile?.city.split(',')[0];

	const rawContentState = draftToHtml(convertToRaw(editorState.getCurrentContent()));

	return (
		<>
			<div className={styles.post_wrapper}>
				<div className={styles.content_header}>
					<Link
						to={`user/${userId}`}
						replace={true}
						className={styles.user}>
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
												{user?.user_profile_extended?.profession}
											</span>
										)}
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
					</Link>
					<div className={styles.right_col}>
						<span className={styles.time_of_creation}>{timeElapsed}</span>
					</div>
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
								/>
							</figure>
						)}
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
						</div>
						<div className={styles.post_footer_bottom}>
							<div className={styles.post_footer_bottom_left_col}>
								<ButtonPostSave postId={postId} />
								<span className={styles.time_read}>{timeForRead} хв читати</span>
							</div>

							<div className={styles.post_footer_bottom_right_col}>
								<div className={`${styles.post_menu} ${!isMyPost && styles.post_menu_visible}`}>
									<Dropdown
										overlayStyle={{ width: '138px' }}
										menu={{
											items: [
												// {
												// 	key: '1',
												// 	label: (
												// 		<button
												// 			className={styles.btn_menu}
												// 			onClick={handlerPostEditing}>
												// 			<img
												// 				src={icon_pencil}
												// 				alt='pencil'
												// 				style={{ marginRight: '8px' }}
												// 			/>
												// 			Редагувати
												// 		</button>
												// 	),
												// },
												{
													key: '2',
													label: (
														<button
															className={styles.btn_menu}
															onClick={handlerDelete}>
															<img
																style={{ marginRight: '8px' }}
																src={icon_delete}
																alt='delete'
															/>
															Видалити
														</button>
													),
												},
											],
										}}
										className={styles.customMenu}
										placement='bottomRight'
										trigger={['click']}>
										<img
											className={styles.post_menu_img}
											src={icon_dot_menu}
											alt='Menu'
											onClick={(e) => e.preventDefault()}
										/>
									</Dropdown>
								</div>
								{/* <img
									src={icon_like}
									alt='Like'
								/>
								<span className={styles.quantity_likes}>2 тис</span> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.comments}>
				<Comments postId={postId} />
			</div>
		</>
	);
};

export default Post;
