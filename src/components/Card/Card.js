import { useEffect, useState } from 'react';

import axios from '../../config/axios/axios';
import img_card from '../../assets/img/img_card/img_card.png';
import Avatar from '../../assets/img/icons/user-profile/Avatar.svg';
import icon_expert from '../../assets/img/icons/post/icon_expert.svg';
import icon_save from '../../assets/img/icons/post/icon_save.svg';
import icon_like from '../../assets/img/icons/post/icon_like.svg';
import icon_comments from '../../assets/img/icons/post/icon_comments.svg';
import { calculateReadTime } from '../../helpers/calculateReadTime';
import { formatTimeElapsed } from '../../helpers/formatTimeElapsed';
import { URL_USER, URL_USER_PROFILE_BY_USER_ID } from '../../config/API_url';

import styles from './Card.module.scss';

const Card = ({ posts }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [postData, setPostData] = useState(null);
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);
	// console.log(postData);
	const userId = postData && postData?.author;

	useEffect(() => {
		setPostData(posts);
	}, [posts]);

	useEffect(() => {
		const fetchInfoUser = async () => {
			try {
				console.log('id', userId);
				const data = userId && (await axios.get(`${URL_USER}${userId}`));
				// console.log('data', data);
				setUser(data);
			} catch (error) {
				return error.message;
			}
		};

		fetchInfoUser();
	}, [userId]);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const data = userId && (await axios.get(`${URL_USER_PROFILE_BY_USER_ID}${userId}`));
				setProfile(data);
			} catch (error) {
				return error.message;
			}
		};

		fetchUserProfile();
	}, [userId]);

	const handleReadMoreClick = () => {
		setIsExpanded(!isExpanded);
	};

	const timeForRead = postData && calculateReadTime(postData?.content);
	const timeElapsed = postData && formatTimeElapsed(postData?.creation_date);
	// console.log('postData', postData.author);
	// user && console.log('user', user);
	// profile && console.log('profile', profile);
	// console.log('id', userId);

	const isImage = true;

	return (
		<div className={`${styles.container} ${styles.card_wrapper}`}>
			<div className={styles.content_wrapper}>
				<div className={styles.content_header}>
					<div className={styles.user}>
						<img
							src={Avatar}
							alt='Avatar'
							style={{ width: '56px', height: '56px' }}
						/>
						<div className={styles.user_data_wrapper}>
							<div className={styles.user_info_top_wrapper}>
								<span className={styles.full_name}>{user?.full_name}</span>
								<div className={styles.label_vr_exp_wrapper}>
									<img
										className={styles.verify}
										src={icon_expert}
										alt='icon expert'
									/>
									<span className={styles.expert_badge}>Expert in Law</span>
								</div>
							</div>
							<div className={styles.user_info_bottom_wrapper}>
								<span className={styles.user_nickname}>@{user?.username}</span>
								<span className={profile?.country.name && styles.user_country_dot}>
									{profile?.country.name}
									{profile?.country.name && profile?.city.name && ','} {profile?.city.name}{' '}
								</span>
							</div>
						</div>
					</div>
					<span className={styles.time_of_creation}>{timeElapsed}</span>
				</div>
				<article className={styles.content}>
					<h5 className={styles.content_title}>{postData?.title}</h5>
					<p className={`${styles.content_post} ${isExpanded && styles.expanded}`}>
						{postData?.content}
					</p>
					{!isExpanded ? (
						<div
							className={styles.btn_read_more}
							onClick={handleReadMoreClick}>
							Read more...
						</div>
					) : (
						<div
							className={styles.btn_read_more}
							onClick={handleReadMoreClick}>
							Hide...
						</div>
					)}
				</article>
				<div className={styles.content_footer}>
					<div className={styles.content_footer_left_col}>
						<span className={styles.post_user}>{postData?.country[0]}</span>
						<span className={styles.post_category}>{postData?.category}</span>
						<img
							src={icon_save}
							alt='Save'
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
			<figure className={`${styles.content_img_wrapper} ${isImage && styles.visibility}`}>
				<img
					src={img_card}
					alt='Зображення к допису'
					style={{ width: '100%', height: '100%', display: 'block' }}
				/>
			</figure>
		</div>
	);
};

export default Card;
