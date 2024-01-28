import { Button } from 'antd';
import styles from './UsersLatestActivityPosts.module.scss';
const LatestActivityPosts = () => {
	return (
		<>
			<div className={styles.activity_posts_container}>
				<p className={styles.posts_description}>
					Не має ще дописів.
				</p>
			</div>
		</>
	);
};

export default LatestActivityPosts;
