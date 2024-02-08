import axios from '../../../config/axios/axios';

import icon_expert from '../../../assets/img/icons/post/icon_expert.svg';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';
// import icon_useful from '../../../assets/img/icons/icons-comments/icon_useful.svg';
// import icon_not_useful from '../../../assets/img/icons/icons-comments/icon_not_useful.svg';

import { URL_LANGUAGE, URL_USER_INFO_USER_ID } from '../../../config/API_url';
import styles from './CommentCard.module.scss';
import { useEffect, useRef, useState } from 'react';
import { formatTimeElapsed } from '../../../helpers/formatTimeElapsed';
import PanelUseful from '../PanelUseful/PanelUseful';
import { Link } from 'react-router-dom';

const CommentCard = ({ comment, bgColor, userId }) => {
	const { text, author, creation_date } = comment;
	const [user, setUser] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [showButton, setShowButton] = useState(false);
	// const [counterUseful, setCounterUseful] = useState(0);

	const langUK = 'uk/';

	const blockRef = useRef();

	useEffect(() => {
		const blockHeight = blockRef.current.clientHeight;

		if (blockHeight > 74) {
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	}, []);

	// const helpful_count = comment?.helpful_count && comment?.helpful_count;
	// const not_helpful_count = comment?.not_helpful_count && comment?.not_helpful_count;

	// useEffect(() => {
	// 	const counter = helpful_count - not_helpful_count;
	// 	setCounterUseful(counter);
	// }, [helpful_count, not_helpful_count]);
	// console.log('counter', counterUseful);

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
		const fetchInfoUser = async () => {
			try {
				// console.log(author);
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

	// user && console.log('userComent', user);
	// console.log('commentC', comment);
	const timeElapsed = creation_date && formatTimeElapsed(creation_date);
	const userCity = user?.user_profile?.city && user?.user_profile?.city.split(',')[0];
	return (
		<div
			style={bgColor}
			className={`${styles.container} ${styles.card_wrapper}`}>
			{/* <div
				className={styles.content_wrapper}
				// style={{ maxWidth: isImage ? '580px' : '' }}
			> */}
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
				<span className={styles.time_of_creation}>{timeElapsed}</span>
			</div>
			{/* <div> */}
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
			{/* </div> */}
			<div className={styles.content_footer}>
				<PanelUseful
					comment={comment}
					// counterUseful={counterUseful}
					userId={userId}
				/>
			</div>
		</div>
	);
};

export default CommentCard;
