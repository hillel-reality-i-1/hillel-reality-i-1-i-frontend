import React from 'react';

import { ConfigProvider, Tabs } from 'antd';
import LatestActivityPosts from '../LatestActivityPosts/LatestActivityPosts';
import LatestActivityComments from '../LatestActivityComments/LatestActivityComments';
import LatestActivityReactions from '../LatestActivityReactions/LatestActivityReactions';
import LatestActivitySaved from '../LatestActivitySaved/LatestActivitySaved';
import LatestActivityContributions from '../LatestActivityContributions/LatestActivityContributions';

const latestActivity = [
	{
		key: '1',
		label: 'Дописи',
		children: <LatestActivityPosts />,
	},
	{
		key: '2',
		label: 'Коментарі',
		children: <LatestActivityComments />,
	},
	{
		key: '3',
		label: 'Внески',
		children: <LatestActivityContributions />,
	},
	{
		key: '4',
		label: 'Реакції',
		children: <LatestActivityReactions />,
	},
	{
		key: '5',
		label: 'Збережені',
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
					tabBarGutter={24}
				/>
			</ConfigProvider>
		</>
	);
};

export default LatestActivityTabs;
