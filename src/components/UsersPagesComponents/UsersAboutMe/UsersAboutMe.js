import React, { useState, useEffect } from 'react';
import { Tabs, Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import facebookIcon from '../../../assets/img/icons/icons-AboutMe/facebook_icon.svg'
import instagramIcon from '../../../assets/img/icons/icons-AboutMe/insta_icon.svg'
import telegramIcon from '../../../assets/img/icons/icons-AboutMe/telegram_icon.svg'
import emailIcon from '../../../assets/img/icons/icons-AboutMe/email_icon.svg'
import callIcon from '../../../assets/img/icons/icons-AboutMe/call_icon.svg'
import arrowLeftIcon from '../../../assets/img/icons/icons-AboutMe/arrowLeft.svg'
import arrowRightIcon from '../../../assets/img/icons/icons-AboutMe/arrowRight.svg'
import LinkedIn from '../../../assets/img/icons/icons-AboutMe/linkedIn.svg'

import styles from './UsersAboutMe.module.scss'

const UsersAboutMe = ({ userData }) => {
    const [imagesArray, setImagesArray] = useState([]);
    const defaultTextSummary = 'На жаль, тут немає інформації.';
    const [startIndex, setStartIndex] = useState(0);

    const endIndex = startIndex + 5;
    const visibleImages = imagesArray.slice(startIndex, endIndex);
    const showRightArrow = endIndex - 1 < imagesArray.length;
    const showLeftArrow = startIndex > 0;

    useEffect(() => {

        const addPhotoFunction = () => {
            if (Array.isArray(userData.portfolio) && userData.portfolio.length > 0) {
                const mappedArray = userData.portfolio.map(item => item);
                setImagesArray(mappedArray);
            }
        };

        addPhotoFunction();
    }, [userData, userData.portfolio]);


    const handleNext = () => {
        setStartIndex(prev => Math.min(prev + 1, imagesArray.length - 1));
    };

    const handlePrev = () => {
        setStartIndex(prev => Math.max(prev - 1, 0));
    };

    const items = [
        {
            key: '1',
            label: 'Мої контакти',
            children: (
                <div className={styles.my_contacts_block}>
                    <div className={styles.block_message}>
                        {
                            <div className={styles.message_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={emailIcon}
                                        alt="email icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Пошта
                                    </p>
                                    {
                                        userData.user.email ? <CopyToClipboard text={userData.user.email}>
                                            <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                                <p className={styles.text_value}>
                                                    {
                                                        userData.user.email
                                                    }
                                                </p>
                                            </Tooltip>
                                        </CopyToClipboard> : null
                                    }
                                    {
                                        userData.user.email === null || userData.user.email === undefined ?
                                            <p className={styles.text_value_noInfo}>
                                                інформація відсутня
                                            </p> : null
                                    }
                                </div>
                            </div>
                        }

                        {
                            <div className={styles.message_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={callIcon}
                                        alt="phone icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Телефон
                                    </p>
                                    {
                                        userData.user_profile.phone_number ? <CopyToClipboard text={userData.user_profile.phone_number}>
                                            <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                                <p className={styles.text_value}>
                                                    {
                                                        userData.user_profile.phone_number
                                                    }
                                                </p>
                                            </Tooltip>
                                        </CopyToClipboard> : null
                                    }
                                    {
                                        userData.user_profile.phone_number === null || userData.user_profile.phone_number === undefined ?
                                            <p className={styles.text_value_noInfo}>
                                                інформація відсутня
                                            </p> : null
                                    }
                                </div>
                            </div>
                        }

                        {
                            (!userData.user_profile.facebook && !userData.user_profile.instagram && !userData.user_profile.linkedin && !userData.user_profile.telegram) && (
                                <div className={styles.message_item}>
                                    <div className={styles.item_icon_wrapper}>
                                        <img
                                            className={styles.item_icon}
                                            src={facebookIcon}
                                            alt="no info icon"
                                        />
                                    </div>
                                    <div className={styles.item_text}>
                                        <p className={styles.text_title}>
                                            Соціальна мережа
                                        </p>
                                        <p className={styles.text_value_noInfo}>
                                            інформація відсутня
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        {
                            userData.user_profile.telegram ? <div className={styles.message_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={telegramIcon}
                                        alt="telegram icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Telegram
                                    </p>
                                    <CopyToClipboard text={userData.user_profile.telegram}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.user_profile.telegram
                                                }

                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                            </div> : null
                        }
                    </div>

                    <div className={styles.block_socialMedia}>
                        {
                            userData.user_profile.instagram ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={instagramIcon}
                                        alt="instagram icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Instagram
                                    </p>
                                    <CopyToClipboard text={userData.user_profile.instagram}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.user_profile.instagram
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                            </div> : null
                        }
                        {
                            userData.user_profile.facebook ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={facebookIcon}
                                        alt="facebook icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Facebook
                                    </p>
                                    <CopyToClipboard text={userData.user_profile.facebook}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.user_profile.facebook
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                            </div> : null
                        }
                        {
                            userData.user_profile.linkedin ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={LinkedIn}
                                        alt="linkedin icon"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        LinkedIn
                                    </p>
                                    <CopyToClipboard text={userData.user_profile.linkedin}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.user_profile.linkedin
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
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
                userData.user_profile.about_my_self
                    ?
                    <div className={styles.my_summary_block}>
                        <p className={styles.my_summary_block_text}>
                            {userData.user_profile.about_my_self}
                        </p>
                    </div>
                    :
                    <div className={styles.my_summary_block_no_info}>
                        <p className={styles.my_summary_block_no_info_text}>{defaultTextSummary}</p>
                    </div>
            ),
        },
        {
            key: '3',
            label: 'Професії',
            children: (
                userData.user_profile_extended && userData.user_profile_extended.profession.length > 1
                    ? (
                        <div className={styles.my_expertise_block}>
                            <ul className={styles.my_expertise_list}>
                                {userData.user_profile_extended.profession ? (
                                    userData.user_profile_extended.profession.map((el, index) => (
                                        <li key={index} className={styles.my_expertise_list_item}>
                                            {el}
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>
                    ) : (
                        <div className={styles.my_summary_block_no_info}>
                            <p className={styles.my_summary_block_no_info_text}>{defaultTextSummary}</p>
                        </div>
                    )
            )
        },
        {
            key: '4',
            label: 'Послуги',
            children: userData.user_profile_extended && userData.user_profile_extended.service.length > 1
                ? (
                    <div className={styles.my_services_block}>
                        <ul className={styles.my_services_list}>
                            {userData.user_profile_extended.service ? (
                                userData.user_profile_extended.service.map((el, index) => (
                                    <li key={index} className={styles.my_services_list_item}>
                                        {el}
                                    </li>
                                ))
                            ) : (
                                <li className={styles.my_services_list_item}>No services available</li>
                            )}
                        </ul>
                    </div>
                ) : (
                    <div className={styles.my_summary_block_no_info}>
                        <p className={styles.my_summary_block_no_info_text}>{defaultTextSummary}</p>
                    </div>
                )
        },
        {
            key: '5',
            label: 'Портфоліо',
            children: (
                userData.user_profile_extended && userData.portfolio && userData.portfolio.length > 0 ? (
                    <div className={styles.my_portfolio_block}>
                        <div className={styles.my_portfolio_block_wrapper}>
                            {showLeftArrow && (
                                <button onClick={handlePrev} className={styles.my_portfolio_leftButton_wrapper}>
                                    <img className={styles.my_portfolio_leftButton} src={arrowLeftIcon} alt='arrow left' />
                                </button>
                            )}
                            {visibleImages.map((item, index) => (
                                <div className={styles.my_portfolio_item_wrapper} key={`${index}`}>
                                    <img
                                        key={index}
                                        src={item.file_url}
                                        alt={`Description-${startIndex + index}`}
                                        className={styles.my_portfolio_item}
                                    />
                                </div>
                            ))}
                            {showRightArrow && (
                                <button onClick={handleNext} className={styles.my_portfolio_rightButton_wrapper}>
                                    <img className={styles.my_portfolio_rightButton} src={arrowRightIcon} alt='arrow right' />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.my_summary_block_no_info}>
                        <p className={styles.my_summary_block_no_info_text}>{defaultTextSummary}</p>
                    </div>
                )
            )            
        },
    ];

    return (
        <>
            <div className={styles.user_about}>
                <div className={styles.user_title}>
                    <h4 className={styles.title_text}>
                        Про мене
                    </h4>
                </div>
                <div className={styles.tubs}>
                    <div className={styles.tubs_wrapper}>
                        <Tabs defaultActiveKey='1'
                            items={userData.user_profile_extended
                                ? items
                                : items.map((el) => {
                                    if (el.label === 'Мої контакти' || el.label === 'Біографія') {
                                        return el;
                                    }
                                    return null;
                                })}
                            tabBarGutter={24}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}


export default UsersAboutMe

