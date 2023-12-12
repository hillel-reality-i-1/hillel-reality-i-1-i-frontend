import React, { useState } from 'react';
import { Tabs, Switch, Flex, Input } from 'antd';

import { Button, Modal } from 'antd';

// import '../../../src/translations/i18n'
// import { useTranslation } from 'react-i18next';

import styles from './AboutMe.module.scss'

import cancelIcon from '../../assets/img/icons/icons-AboutMe/cancel.svg'

const CustomCloseIcon = () => (
    <div>
        <img
            src={cancelIcon}
            alt='cancel logo'>

        </img>
    </div>
);

const SummaryEdit = () => {
    const [checkedExpert, setCheckedExpert] = useState(false)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { TextArea } = Input;

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <button type="primary" onClick={showModal}>
                Add Summary
            </button>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={520}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Save
                    </Button>
                ]}
                closable={false}
            >
                <div style={{ outline: '1px solid red' }}>
                    <div style={{ outline: '1px solid red' }}>
                        <h4>
                            Edit your profile
                        </h4>
                        <CustomCloseIcon />
                    </div>
                    <div>
                        <div>
                            <h5>
                                Summary
                            </h5>
                            <p>
                                You can share more about yourself: your history, work experience, interests, and more
                            </p>
                        </div>
                    </div>
                    <div>
                        <Flex vertical gap={32}>
                            <TextArea
                                showCount
                                maxLength={500}
                                onChange={onChange}
                                placeholder="disable resize"
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                            />
                        </Flex>
                    </div>
                    <div>
                        <div>
                            <div>
                                <h5>
                                    Expetrise
                                </h5>
                            </div>
                            <div>
                                <Switch onChange={e => setCheckedExpert(e)} />
                                {checkedExpert
                                    ? <p className={styles.switcher_text}>
                                        Expert Profile
                                    </p>
                                    : <p className={styles.switcher_text}>
                                        Switch to Expert Profile
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const AboutMe = () => {
    const [checkedExpert, setCheckedExpert] = useState(false)
    const [summary] = useState('')
    const [tubKey, setTubKey] = useState(!summary)
    const defaultTextSummary = 'You can share more about yourself: your history, work experience, interests, and more'

    // const { t } = useTranslation();

    const handleTabChange = (key) => {
        setTubKey(key)
    };

    const items = [
        {
            key: '1',
            label: 'My contacts',
            children: `1`,
        },
        {
            key: '2',
            label: 'Summary',
            children: `${summary ? summary : defaultTextSummary}`,
        },
        {
            key: '3',
            label: 'Expertise',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Services',
            children: 'Content of Tab Pane 4',
        },
        {
            key: '5',
            label: 'Portfolio',
            children: 'Content of Tab Pane 5',
        },
    ];

    return (
        <div className={styles.user_about}>
            <div className={styles.user_title}>
                <h4 className={styles.title_text}>
                    About me
                </h4>
                <div className={styles.title_switcher}>
                    <Switch onChange={e => setCheckedExpert(e)} />
                    {checkedExpert
                        ? <p className={styles.switcher_text}>
                            Expert Profile
                        </p>
                        : <p className={styles.switcher_text}>
                            Switch to Expert Profile
                        </p>
                    }
                </div>
            </div>
            <div>
                <Tabs defaultActiveKey='1'
                    items={checkedExpert
                        ? items
                        : items.map((el) => {
                            if (el.label === 'My contacts') {
                                return el
                            }

                            if (el.label === 'Summary') {
                                return el
                            }

                            return null
                        })}
                    onChange={handleTabChange}
                    tabBarExtraContent={
                        <div>
                            Edit
                        </div>
                    }
                />
                {
                    (!summary && tubKey === '2')
                        ? <SummaryEdit />
                        : null
                }
            </div>
        </div>
    )
}


export default AboutMe