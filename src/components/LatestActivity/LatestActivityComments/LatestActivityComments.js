import { Button, ConfigProvider } from 'antd';
import styles from './LatestActivityComments.module.scss';

const LatestActivityComments = () => {
	return (
		<div className={styles.activity_comments_container}>
			<p className={styles.comments_description}>
				You haven’t made any comments yet. You can discover loads of interesting posts on the main
				page.
			</p>

			<ConfigProvider
				theme={{
					token: {
						// colorBgContainerDisabled: '#caccd1',
					},
				}}>
				<Button
					// type='secondary'
					htmlType='button'
					// disable='true'
					className={styles.btn_activity_comments}>
					<span className={styles.btn_inner}>Go to Main</span>
				</Button>
			</ConfigProvider>
		</div>
	);
};

export default LatestActivityComments;
