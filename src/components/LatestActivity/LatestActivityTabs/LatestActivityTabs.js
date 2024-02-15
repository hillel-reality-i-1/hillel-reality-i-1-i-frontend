import React from 'react';

import { ConfigProvider, Tabs } from 'antd';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import LatestActivityPosts from '../LatestActivityPosts/LatestActivityPosts';
import LatestActivityComments from '../LatestActivityComments/LatestActivityComments';
import LatestActivitySaved from '../LatestActivitySaved/LatestActivitySaved';
import LatestActivityContributions from '../LatestActivityContributions/LatestActivityContributions';

const LatestActivityTabs = () => {


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
			key: '5',
			label: 'Збережені',
			children: <LatestActivitySaved />,
		},
	];

	return (
		<>
			<ConfigProvider
				theme={{
					token: { fontSize: '18px' },
				}}>
				<Tabs
					defaultActiveKey='1'
					items={latestActivity}
					tabBarGutter={24}
				/>
			</ConfigProvider>
		</>
	);
};

export default LatestActivityTabs;
