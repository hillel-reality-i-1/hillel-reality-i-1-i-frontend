import axios from '../../../config/axios/axios';
import { Link } from 'react-router-dom';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';
import PanelUseful from '../PanelUseful/PanelUseful';
import { useEffect, useRef, useState } from 'react';
import { URL_USER_INFO_USER_ID } from '../../../config/API_url';
import styles from './ContributionCard.module.scss';

const ContributionCard = ({ contribution, bgColor, userId }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [user, setUser] = useState(null);
	const [showButton, setShowButton] = useState(false);
	const { text, author } = contribution;
	const blockRef = useRef();

	useEffect(() => {
		const blockHeight = blockRef.current.clientHeight;

		if (blockHeight > 70) {
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
							style={{ width: '46px', height: '46px', borderRadius: '46px' }}
						/>
					) : (
						<img
							src={Avatar}
							alt='Avatar'
							style={{ width: '46px', height: '46px' }}
						/>
					)}
					<div className={styles.user_data_wrapper}>
						<div className={styles.user_info_top_wrapper}>
							<span className={styles.full_name}>{user?.user?.full_name}</span>
						</div>
						<div className={styles.user_info_bottom_wrapper}>
							<span className={styles.user_nickname}>@{user?.user?.username}</span>
						</div>
					</div>
				</Link>
			</div>
			<article
				className={styles.content}
				ref={blockRef}>
				<p className={`${styles.content_text} ${isExpanded && styles.expanded}`}>{text}</p>

				{showButton && (
					<span
						className={styles.btn_read_more}
						onClick={handleReadMoreClick}>
						{isExpanded ? 'Приховати' : 'Читати більше..'}
					</span>
				)}
			</article>
			<div className={styles.content_footer}>
				<PanelUseful
					comment={contribution}
					userId={userId}
				/>
			</div>
		</div>
	);
};

export default ContributionCard;
