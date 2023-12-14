import { Tabs } from 'antd';

import styles from './userPage.module.scss'
import AboutMe from '../../components/AboutMe/AboutMe';

export default function UserPage() {

    const onChange = (key) => {
        console.log(key);
    };
    

    const latestActivity = [
        {
          key: '1',
          label: 'Post',
          children: 'You don’t have any posts yet. Please verify your profile to share your experience and knowledge. 1',
        },
        {
          key: '2',
          label: 'Comments',
          children: 'You don’t have any posts yet. Please verify your profile to share your experience and knowledge. 2',
        },
        {
          key: '3',
          label: 'Likes',
          children: 'You don’t have any posts yet. Please verify your profile to share your experience and knowledge. 3',
        },
        {
            key: '4',
            label: 'Saved',
            children: 'You don’t have any posts yet. Please verify your profile to share your experience and knowledge. 4',
        },
        
    ];
  return (
    <div className={styles.container}>

        <div className={styles.user}>
            <div className={styles.user__head}>
                <div className={styles.user__head__avatar}>
                    <img/>
                </div>
                <div>
                    <p>userName</p>
                    <p>+ Add location</p>
                </div>
                <div className={styles.user__head__edit}>
                    <p>edit</p>
                </div>

            </div>
            
            <AboutMe/>

            <div className={styles.user__activity}>
                <div>
                    <p>Latest activity</p>
                    <div>Write a post</div>
                </div>

                <Tabs defaultActiveKey='1' items={latestActivity} onChange={onChange} />
            </div>
        </div>

        <aside className={styles.aside}>
            <p>Calendar of events</p>
        </aside>

    </div>
  )
}
