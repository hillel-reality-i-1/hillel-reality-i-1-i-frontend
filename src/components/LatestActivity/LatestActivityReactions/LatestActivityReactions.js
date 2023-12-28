import { Button, ConfigProvider } from 'antd';
import styles from './LatestActivityReactions.module.scss';

const LatestActivityReactions = () => {
	return (
		<div className={styles.activity_reactions_container}>
			<p className={styles.reactions_description}>
				You haven’t left any reaction yet. You can discover loads of interesting posts on the Main
				page.
			</p>

			<ConfigProvider
				theme={{
					token: {
						// colorBgContainerDisabled: '#caccd1',
						// colorBorder: 'none',
						// colorTextDisabled: '#FDFEFF',
						// colorPrimaryHover: '#3989EC',
						// colorPrimary: '#126FE1',
						// paddingBlock: '14px 16px',
						// fontSize: '18px',
						// colorPrimary: `${type === 'primary' ? '#ffffff' : '#126FE1'}`,
					},
				}}>
				<Button
					// type='secondary'
					htmlType='button'
					// disable='true'
					className={styles.btn_activity_reactions}>
					<span className={styles.btn_inner}>Go to Main</span>
				</Button>
			</ConfigProvider>
		</div>
	);
};

export default LatestActivityReactions;
