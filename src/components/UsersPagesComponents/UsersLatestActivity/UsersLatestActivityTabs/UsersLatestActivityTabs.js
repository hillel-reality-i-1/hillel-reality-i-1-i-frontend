import React from 'react';

import { ConfigProvider, Tabs } from 'antd';
import UsersLatestActivityPosts from '../UsersLatestActivityPosts/UsersLatestActivityPosts';
import UsersLatestActivityComments from '../UsersLatestActivityComments/UsersLatestActivityComments';
import UsersLatestActivityContributions from '../UsersLatestActivityContributions/UsersLatestActivityContributions';

const latestActivity = [
	{
		key: '1',
		label: 'Дописи',
		children: <UsersLatestActivityPosts />,
	},
	{
		key: '2',
		label: 'Коментарі',
		children: <UsersLatestActivityComments />,
	},
	{
		key: '3',
		label: 'Внески',
		children: <UsersLatestActivityContributions />,
	},
];

const UsersLatestActivityTabs = () => {
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

export default UsersLatestActivityTabs;
