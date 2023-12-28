import React from 'react';

import { ConfigProvider, Tabs } from 'antd';
import LatestActivityPosts from '../LatestActivityPosts/LatestActivityPosts';
// import styles from './LatestActivityTabs.module.scss';
import LatestActivityComments from '../LatestActivityComments/LatestActivityComments';
import LatestActivityReactions from '../LatestActivityReactions/LatestActivityReactions';
import LatestActivitySaved from '../LatestActivitySaved/LatestActivitySaved';
import LatestActivityContributions from '../LatestActivityContributions/LatestActivityContributions';

const latestActivity = [
	{
		key: '1',
		label: 'Post',
		children: <LatestActivityPosts />,
	},
	{
		key: '2',
		label: 'Comments',
		children: <LatestActivityComments />,
	},
	{
		key: '3',
		label: 'Contributions',
		children: <LatestActivityContributions />,
	},
	{
		key: '4',
		label: 'Reactions',
		children: <LatestActivityReactions />,
	},
	{
		key: '5',
		label: 'Saved',
		children: <LatestActivitySaved />,
	},
];

const LatestActivityTabs = () => {
	const onChange = (key) => {
		console.log(key);
	};
	return (
		<>
			<ConfigProvider
				theme={{
					token: { fontSize: '18px' },
				}}>
				<Tabs
					defaultActiveKey='1'
					items={latestActivity}
					onChange={onChange}
					TabBarGutter={18}
				/>
			</ConfigProvider>
		</>
	);
};

export default LatestActivityTabs;
