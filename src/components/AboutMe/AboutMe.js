import React, { useState, useEffect } from 'react';
import { Tabs, Switch } from 'antd';

import facebookIcon from '../../assets/img/icons/icons-AboutMe/facebook_icon.svg'
import instagramIcon from '../../assets/img/icons/icons-AboutMe/insta_icon.svg'
import telegramIcon from '../../assets/img/icons/icons-AboutMe/telegram_icon.svg'
import emailIcon from '../../assets/img/icons/icons-AboutMe/email_icon.svg'
import callIcon from '../../assets/img/icons/icons-AboutMe/call_icon.svg'
import pencilIcon from '../../assets/img/icons/icons-AboutMe/edit.svg'
import addIcon from '../../assets/img/icons/icons-AboutMe/add_icon.svg'
import exclamationIcon from '../../assets/img/icons/icons-AboutMe/exclamation.svg'
import arrowLeftIcon from '../../assets/img/icons/icons-AboutMe/arrowLeft.svg'
import arrowRightIcon from '../../assets/img/icons/icons-AboutMe/arrowRight.svg'

import styles from './AboutMe.module.scss'

const AboutMe = ({ userData }) => {
    const [checkedExpert, setCheckedExpert] = useState(false);
    const [tubKey, setTubKey] = useState('1');
    const [imagesArray, setImagesArray] = useState([]);
    const [services] = useState(['UX Research', 'Creating Landing page, web services, mobile app', 'Creating animation', 'UX Writing'])
    const [expertise] = useState(['Creating UI Design', 'Web Designer', 'Graphic Designer', 'Motion Designer'])
    const [userTelegramValue] = useState('')
    const [userInstagramValue] = useState('')
    const [userFacebookValue] = useState('')
    const [userLinkedInValue] = useState('')
    const defaultTextSummary = 'You can share more about yourself: your history, work experience, interests, and more';
    const [startIndex, setStartIndex] = useState(0);
    const endIndex = startIndex + 5;
    const visibleImages = imagesArray.slice(startIndex, endIndex);
    const showRightArrow = endIndex - 1 < imagesArray.length;
    const showLeftArrow = startIndex > 0;


    console.log(userData)

    const changeExpertUser = (e) => {
        if(userData.phone_verified === true) {
            setCheckedExpert(e)
        } else {
            setCheckedExpert(false)
        }
        
    }

    useEffect(() => {
        
    }, [checkedExpert])
    

    const handleTabChange = (key) => {
        setTubKey(key)
    };

    const handleNext = () => {
        setStartIndex(prev => Math.min(prev + 1, imagesArray.length - 1));
    };

    const handlePrev = () => {
        setStartIndex(prev => Math.max(prev - 1, 0));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
        setImagesArray((prevImages) => [...prevImages, ...newImages]);
    };

    const items = [
        {
            key: '1',
            label: 'Мої контакти',
            children: (
                <div className={styles.my_contacts_block}>
                    <div className={styles.block_message}>
                        {
                            userData.email ? <div className={styles.message_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={emailIcon}
                                        alt="email icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Пошта (приховано)
                                    </p>
                                    <p className={styles.text_value}>
                                        {
                                            userData.email
                                        }
                                    </p>
                                </div>
                            </div> : null
                        }
                        {
                            userData.phone_number ? <div className={styles.message_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={callIcon}
                                        alt="phone icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Телефон (приховано)
                                    </p>
                                    <p className={styles.text_value}>
                                        {
                                            userData.phone_number
                                        }
                                    </p>
                                </div>
                            </div> : null
                        }
                        {
                            userTelegramValue ? <div className={styles.message_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={telegramIcon}
                                        alt="telegram icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Telegram:
                                    </p>
                                    <p className={styles.text_value}>
                                        {
                                            userTelegramValue
                                        }
                                    </p>
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className={styles.block_socialMedia}>
                        {
                            userInstagramValue ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={instagramIcon}
                                        alt="instagram icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Instagram:
                                    </p>
                                    <p className={styles.text_value}>
                                        {
                                            userInstagramValue
                                        }
                                    </p>
                                </div>
                            </div> : null
                        }
                        {
                            userFacebookValue ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={facebookIcon}
                                        alt="Grapefruit slice atop a pile of other slices"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Facebook:
                                    </p>
                                    <p className={styles.text_value}>
                                        {
                                            userFacebookValue
                                        }
                                    </p>
                                </div>
                            </div> : null
                        }
                        {
                            userLinkedInValue ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={facebookIcon}
                                        alt="Grapefruit slice atop a pile of other slices"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        LinkedIn:
                                    </p>
                                    <p className={styles.text_value}>
                                        {
                                            userLinkedInValue
                                        }
                                    </p>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Біографія',
            children: (
                <div className={styles.my_summary_block}>
                    <p>{userData.about_my_self ? userData.about_my_self : defaultTextSummary}</p>

                </div>

            ),
        },
        {
            key: '3',
            label: 'Професії',
            children: (
                <div className={styles.my_expertise_block}>
                    <ul className={styles.my_expertise_list}>
                        {
                            expertise ? expertise.map((el, index) => {
                                return <li key={index} className={styles.my_expertise_list_item}>
                                    {el}
                                </li>
                            }) : null
                        }
                    </ul>
                </div>
            ),
        },
        {
            key: '4',
            label: 'Послуги',
            children: (
                <div className={styles.my_services_block}>
                    <ul className={styles.my_services_list}>
                        {
                            services ? services.map((el, index) => {
                                return <li key={index} className={styles.my_services_list_item}>
                                    {el}
                                </li>
                            }) : null
                        }
                    </ul>
                </div>
            )
        },
        {
            key: '5',
            label: 'Портфоліо',
            children: (
                <div className={styles.my_portfolio_block}>
                    <div className={styles.my_portfolio_block_wrapper}>

                        {showLeftArrow && (
                            <button onClick={handlePrev} className={styles.my_portfolio_leftButton_wrapper}>
                                <img className={styles.my_portfolio_leftButton} src={arrowLeftIcon} alt='arrow left' />
                            </button>
                        )}

                        {visibleImages.map((imageUrl, index) => (
                            <img key={index}
                                src={imageUrl}
                                alt={`Description-${startIndex + index}`}
                                className={styles.my_portfolio_item}
                            />
                        ))}

                        {!showRightArrow && (
                            <label className={styles.my_portfolio_button}>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={handleFileChange}
                                    className={styles.my_portfolio_button_input}
                                />
                                <img src={addIcon} alt="add icon" />
                            </label>
                        )}

                        {showRightArrow && (
                            <button onClick={handleNext} className={styles.my_portfolio_rightButton_wrapper}>
                                <img className={styles.my_portfolio_rightButton} src={arrowRightIcon} alt='arrow right' />
                            </button>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className={styles.user_about}>
                <div className={styles.user_title}>
                    <h4 className={styles.title_text}>
                        Про мене
                    </h4>
                    <div className={styles.title_switcher}>
                        <Switch disabled={!userData.phone_verified} onChange={e => changeExpertUser(e)} />
                        {checkedExpert
                            ? <p className={styles.switcher_text}>
                                Експертний профіль
                            </p>
                            : <p className={styles.switcher_text}>
                                Переключитися на Експертний профіль
                            </p>
                        }
                        <img src={exclamationIcon} alt='exclamation icon' />
                    </div>
                </div>
                <div className={styles.tubs}>
                    <div className={styles.tubs_wrapper}>
                        <Tabs defaultActiveKey='1'
                            items={checkedExpert
                                ? items
                                : items.map((el) => {
                                    if (el.label === 'Мої контакти') {
                                        return el
                                    }

                                    if (el.label === 'Біографія') {
                                        return el
                                    }

                                    return null
                                })}
                            onChange={handleTabChange}
                            tabBarGutter={24}
                        />
                    </div>

                    {!userData.phone_number && tubKey === '1' && (
                        <button className={styles.tubs_button} onClick={() => { console.log('Add Phone') }}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.tubs_text}>
                                Add Phone
                            </span>
                        </button>
                    )}
                    {!(userLinkedInValue || userFacebookValue || userInstagramValue) && tubKey === '1' && (
                        <button className={styles.tubs_button} onClick={() => { console.log('Add Social Media') }}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.tubs_text}>
                                Add Social Media
                            </span>
                        </button>
                    )}
                    {!userData.about_my_self && tubKey === '2' && (
                        <button className={styles.tubs_button} onClick={() => { console.log('Add Summary') }}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.tubs_text}>
                                Add Summary
                            </span>
                        </button>
                    )}
                    {!expertise && tubKey === '3' && (
                        <button className={styles.tubs_button} onClick={() => { console.log('Add Expertise') }}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.tubs_text}>
                                Add Expertise
                            </span>
                        </button>
                    )}
                    {!services && tubKey === '4' && (
                        <button className={styles.tubs_button} onClick={() => { console.log('Add Service') }}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.tubs_text} >
                                Add Service
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}


export default AboutMe

