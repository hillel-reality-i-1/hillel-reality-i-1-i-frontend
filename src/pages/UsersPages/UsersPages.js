import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UsersHead from '../../components/UsersPagesComponents/UsersHead/UsersHead';
import UsersAboutMe from '../../components/UsersPagesComponents/UsersAboutMe/UsersAboutMe';
import UsersLatestActivityTabs from '../../components/UsersPagesComponents/UsersLatestActivity/UsersLatestActivityTabs/UsersLatestActivityTabs';

import styles from './usersPages.module.scss';

export default function UsersPages() {
    const [dataUser, setDatUser] = useState('');

    const { id } = useParams();

    useEffect(() => {
    
        const headers = {
            'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
            'Content-Type': 'application/json',
        };
        axios.get(`${'http://dmytromigirov.space/api/v1/users/user_open_info/'}${id}/`, { headers })
            .then(response => {
                setDatUser(response.data);
            })
            .catch(error => {
                console.error('Error during the request:', error);
            });
    }, [id]);

    if (dataUser === '') {
        return <div>Loading...</div>;
    }

    console.log(dataUser)

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.user__head}>
                    <UsersHead data={dataUser} />
                </div>
                <UsersAboutMe userData={dataUser}/>
                <UsersLatestActivityTabs userData={dataUser}/>
            </div>

            <aside className={styles.aside}>
                <p>Calendar of events</p>
            </aside>
        </div>
    );
}
