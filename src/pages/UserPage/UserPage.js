import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserDataQuery } from '../../store/services/userApi';

import UserHead from '../../components/UserHead/UserHead';
import AboutMe from '../../components/AboutMe/AboutMe';
import LatestActivityLayout from '../../components/LatestActivity/LatestActivityLayout/LatestActivityLayout';
import styles from './userPage.module.scss';

export default function UserPage() {
	const { data, error, isLoading } = useGetUserDataQuery();
	const [userDataPortfolio, setUserDataPortfolio] = useState('');
	const [expertUserData, setExpertUserData] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const authTokenUHelp = localStorage.getItem('authTokenUHelp');
				const config = {
					headers: {
						'Authorization': `Token ${authTokenUHelp}`,
						'Content-Type': 'application/json',
					},
				};

				const userResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/user/`, config);

				const expertUserProfileData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/expert_user_profile_by_user_id/${userResponse.data.pk}/`,
					config);


				setUserDataPortfolio(expertUserProfileData.data.portfolio)
				setExpertUserData(expertUserProfileData.data)


			} catch (error) {
				console.log(error);
				// navigate('/');
			}
		};

		fetchData();
	}, [navigate]);

	if (isLoading) {
		return <div className={styles.container}>
			<div>Loading...</div>
		</div>
	}

	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<div className={styles.user__head}>
					<UserHead data={data} />
				</div>


				<AboutMe data={data} userData={data} userDataPortfolio={userDataPortfolio} expertUserData={expertUserData}/>
				<LatestActivityLayout />
			</div>

			<aside className={styles.aside}>
				<p>Calendar of events</p>
			</aside>
		</div>
	);
}
