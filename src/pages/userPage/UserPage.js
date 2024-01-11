import UserHead from '../../components/UserHead/UserHead';
import AboutMe from '../../components/AboutMe/AboutMe';
import LatestActivityLayout from '../../components/LatestActivity/LatestActivityLayout/LatestActivityLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './userPage.module.scss';



export default function UserPage() {
	const [userData, setUserData] = useState('');
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
	
			const userResponse = await axios.get('http://dmytromigirov.space/api/v1/auth/user/', config);
			const userProfileResponse = await axios.get(`http://dmytromigirov.space/api/v1/users/user_profile_by_user_id/${userResponse.data.pk}/`, config);
	
			setUserData(userProfileResponse.data);
		  } catch (error) {
			navigate('/'); 
		  }
		};
	
		fetchData();
	  }, [navigate]);

	
	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<div className={styles.user__head}>
					<UserHead userData={userData}/>
				</div>
				

				<AboutMe userData={userData} />
				<LatestActivityLayout />
			</div>

			<aside className={styles.aside}>
				<p>Calendar of events</p>
			</aside>
		</div>
	);
}
