import React from 'react';

import { ConfigProvider, Tabs } from 'antd';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import LatestActivityPosts from '../LatestActivityPosts/LatestActivityPosts';
import LatestActivityComments from '../LatestActivityComments/LatestActivityComments';
import LatestActivityReactions from '../LatestActivityReactions/LatestActivityReactions';
import LatestActivitySaved from '../LatestActivitySaved/LatestActivitySaved';
import LatestActivityContributions from '../LatestActivityContributions/LatestActivityContributions';

const LatestActivityTabs = () => {
	const { data, error, isLoading, refetch } = useGetUserDataQuery();

	const latestActivity = [
		{
			key: '1',
			label: 'Дописи',
			children: !isLoading && data ? <LatestActivityPosts data={data} /> : null,
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
