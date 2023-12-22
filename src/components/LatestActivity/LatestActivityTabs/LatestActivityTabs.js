import React from 'react';

import { Tabs } from 'antd';
import LatestActivityPosts from '../LatestActivityPosts/LatestActivityPosts';
// import styles from './LatestActivityTabs.module.scss';
import LatestActivityComments from '../LatestActivityComments/LatestActivityComments';
import LatestActivityLikes from '../LatestActivityLikes/LatestActivityLikes';
import LatestActivitySaved from '../LatestActivitySaved/LatestActivitySaved';
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
		label: 'Likes',
		children: <LatestActivityLikes />,
	},
	{
		key: '4',
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
			<Tabs
				defaultActiveKey='1'
				items={latestActivity}
				onChange={onChange}
				TabBarGutter={18}
			/>
		</>
	);
};

export default LatestActivityTabs;
