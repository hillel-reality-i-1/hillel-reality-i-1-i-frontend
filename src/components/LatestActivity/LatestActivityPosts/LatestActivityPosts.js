import { Button } from 'antd';
import styles from './LatestActivityPosts.module.scss';
const LatestActivityPosts = () => {
	return (
		<>
			<div className={styles.activity_posts_container}>
				<p className={styles.posts_description}>
					You don’t have any posts yet. Please verify your profile to share your experience and
					knowledge.
				</p>
				<Button
					type='primary'
					htmlType='button'
					// disable='true'
					className={styles.btn_activity_posts}>
					<span className={styles.btn_inner}>Verify Profile</span>
				</Button>
			</div>
		</>
	);
};

export default LatestActivityPosts;
