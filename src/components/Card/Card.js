import { useState } from 'react';

import img_card from '../../assets/img/img_card/img_card.png';
import Avatar from '../../assets/img/icons/user-profile/Avatar.svg';
import icon_expert from '../../assets/img/icons/post/icon_expert.svg';
import icon_save from '../../assets/img/icons/post/icon_save.svg';
import icon_like from '../../assets/img/icons/post/icon_like.svg';
import icon_comments from '../../assets/img/icons/post/icon_comments.svg';

import styles from './Card.module.scss';

const Card = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleReadMoreClick = () => {
		setIsExpanded(!isExpanded);
	};

	const isImage = false;

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
								<span className={styles.full_name}>Mykola Pyvovarov</span>
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
								<span className={styles.user_nickname}>@mykolapyvovarov</span>
								<span className={styles.user_country}>Poland, Wroclaw </span>
							</div>
						</div>
					</div>
					<span className={styles.time_of_creation}>15 min ago</span>
				</div>
				<article className={styles.content}>
					<h5 className={styles.content_title}>How to register in the Employment Center?</h5>
					<p className={`${styles.content_post} ${isExpanded && styles.expanded}`}>
						You need either a passport (e-passport) or a different document (e-document for the
						period of martial law) that proves your Ukrainian citizenship. If you’re a foreigner,
						you need a residence permit. You need a paper or electronic certificate that shows your
						registrationrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
						rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrttttttttttttttttttttttttttq
					</p>
					{!isExpanded && (
						<div
							className={styles.btn_read_more}
							onClick={handleReadMoreClick}>
							Read more...
						</div>
					)}
				</article>
				<div className={styles.content_footer}>
					<div className={styles.content_footer_left_col}>
						<span className={styles.post_user}>Poland</span>
						<span className={styles.post_category}>Employment</span>
						<img
							src={icon_save}
							alt='Save'
						/>
						<span className={styles.time_read}>5 min read</span>
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
