import axios from '../../../config/axios/axios';
import { useEffect, useRef, useState } from 'react';
import icon_expert from '../../../assets/img/icons/post/icon_expert.svg';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';
import icon_dot_menu from '../../../assets/img/icons/post/icon_dot_menu.svg';
import icon_delete from '../../../assets/img/icons/post/icon_delete.svg';
import { URL_USER_INFO_USER_ID } from '../../../config/API_url';
import { formatTimeElapsed } from '../../../helpers/formatTimeElapsed';
import PanelUseful from '../PanelUseful/PanelUseful';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import { useGetUserDataQuery } from '../../../store/services/userApi';

import styles from './CommentCard.module.scss';

const CommentCard = ({ comment, bgColor, userId, onDelete }) => {
	const { text, author, creation_date } = comment;
	const { data } = useGetUserDataQuery();
	const [user, setUser] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [showButton, setShowButton] = useState(false);

	const isMyComment = data?.user === comment?.author;
	const blockRef = useRef();

	useEffect(() => {
		const blockHeight = blockRef.current.clientHeight;

		if (blockHeight > 74) {
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	}, []);

	useEffect(() => {
		const fetchInfoUser = async () => {
			try {
				const response = author && (await axios.get(`${URL_USER_INFO_USER_ID}${author}`));
				setUser(response);
			} catch (error) {
				return error.message;
			}
		};

		fetchInfoUser();
	}, [author, setUser]);

	const handleReadMoreClick = () => {
		setIsExpanded(!isExpanded);
	};

	const handlerDelete = async () => {
		try {
			await onDelete(comment.id);
		} catch (error) {
			return error.message;
		}
	};

	const timeElapsed = creation_date && formatTimeElapsed(creation_date);
	const userCity = user?.user_profile?.city && user?.user_profile?.city.split(',')[0];

	return (
		<div
			style={bgColor}
			className={`${styles.container} ${styles.card_wrapper}`}>
			<div className={styles.content_header}>
				<Link
					to={`/user/${author}`}
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
				<div className={styles.col_right}>
					<span className={styles.time_of_creation}>{timeElapsed}</span>
					<div className={`${styles.post_menu} ${!isMyComment && styles.post_menu_visible}`}>
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
				</div>
			</div>
			<article
				className={styles.content}
				ref={blockRef}>
				<p className={`${styles.content_text} ${isExpanded && styles.expanded}`}>{text}</p>

				{showButton && (
					<span
						className={styles.btn_read_more}
						onClick={handleReadMoreClick}>
						{isExpanded ? 'Приховати' : 'Читати більше...'}
					</span>
				)}
			</article>
			<div className={styles.content_footer}>
				<PanelUseful
					comment={comment}
					userId={userId}
				/>
			</div>
		</div>
	);
};

export default CommentCard;
