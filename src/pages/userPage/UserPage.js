import { Tabs } from 'antd';

import styles from './userPage.module.scss';
import AboutMe from '../../components/AboutMe/AboutMe';
import UserHead from '../../components/UserHead/UserHead';
import LatestActivityLayout from '../../components/LatestActivity/LatestActivityLayout/LatestActivityLayout';

export default function UserPage() {
	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<div className={styles.user__head}>
					<UserHead />
				</div>

				<AboutMe />
				<LatestActivityLayout />
			</div>

			<aside className={styles.aside}>
				<p>Calendar of events</p>
			</aside>
		</div>
	);
}
