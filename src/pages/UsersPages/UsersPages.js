import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { USER_OPEN_INFO } from '../../config/API_url';
import Footer from '../../components/Footer/Footer';
import UsersHead from '../../components/UsersPagesComponents/UsersHead/UsersHead';
import UsersAboutMe from '../../components/UsersPagesComponents/UsersAboutMe/UsersAboutMe';
// import UsersLatestActivityTabs from '../../components/UsersPagesComponents/UsersLatestActivity/UsersLatestActivityTabs/UsersLatestActivityTabs';
import AsideSection from '../../components/AsideSection/AsideSection';

import styles from './usersPages.module.scss';

export default function UsersPages() {
    const [dataUser, setDatUser] = useState('');

    const { id } = useParams();

    useEffect(() => {

        const headers = {
            'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
            'Content-Type': 'application/json',
        };
        axios.get(`${USER_OPEN_INFO}${id}/`, { headers })
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
        <>
            <div className={styles.container}>
                <div className={styles.user}>
                    <div className={styles.user__head}>
                        <UsersHead data={dataUser} />
                    </div>
                    <div className={styles.user__about}>
                        <UsersAboutMe userData={dataUser} />
                    </div>
                    {/* <div className={styles.user__activity}>
                    <UsersLatestActivityTabs userData={dataUser}/>
                </div> */}
                </div>

                <aside className={styles.aside}>
                    <AsideSection />
                </aside>
            </div>
            <Footer />
        </>
    );
}
