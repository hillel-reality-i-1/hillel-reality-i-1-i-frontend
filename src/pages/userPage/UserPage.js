import { Tabs } from 'antd';

import styles from './userPage.module.scss'

export default function UserPage() {

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
          key: '1',
          label: 'My contacts',
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: 'Summary',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Tab 3',
          children: 'Content of Tab Pane 3',
        },
    ];

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
            
            <div className={styles.user__about}>
                <div>
                    <p>About me</p>
                    <div>
                        <p>Switch to Expert Profile</p>
                    </div>
                </div>

                <div>
                    <Tabs defaultActiveKey='1' items={items} onChange={onChange} tabBarExtraContent={<div>edit</div>}/>
                </div>
            </div>

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
