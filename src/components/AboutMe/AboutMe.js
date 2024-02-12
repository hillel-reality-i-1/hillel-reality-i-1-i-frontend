import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Switch, Tooltip, Alert, Space } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ModalInfoAboutExpertProfile from '../AboutMe/ModalInfoAboutExpertProfile/ModalInfoAboutExpertProfile';
import UserProfileSwitcher from '../UserProfileSwitcher/UserProfileSwitcher'
import ImageUploader from '../ImageUploader/ImageUploader';
import { UPLOAD_PORTFOLIO, PORTFOLIO_LIST } from '../../config/API_url';
import ErrorNotification from '../ErrorNotification/ErrorNotification';

import facebookIcon from '../../assets/img/icons/icons-AboutMe/facebook_icon.svg'
import linkedinIcon from '../../assets/img/icons/icons-AboutMe/linkedIn.svg'
import instagramIcon from '../../assets/img/icons/icons-AboutMe/insta_icon.svg'
import telegramIcon from '../../assets/img/icons/icons-AboutMe/telegram_icon.svg'
import emailIcon from '../../assets/img/icons/icons-AboutMe/email_icon.svg'
import callIcon from '../../assets/img/icons/icons-AboutMe/call_icon.svg'
import addIcon from '../../assets/img/icons/icons-AboutMe/add_icon.svg'
import exclamationIcon from '../../assets/img/icons/icons-AboutMe/exclamation.svg'
import arrowLeftIcon from '../../assets/img/icons/icons-AboutMe/arrowLeft.svg'
import arrowRightIcon from '../../assets/img/icons/icons-AboutMe/arrowRight.svg'

import styles from './AboutMe.module.scss'
import axios from 'axios';

const AboutMe = ({ userData, expertUserData }) => {
    const navigate = useNavigate();
    const [checkedExpert, setCheckedExpert] = useState('');
    const [tubKey, setTubKey] = useState('1');
    const [imagesArray, setImagesArray] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [ErrorMassagePortfolio, SetErrorMassagePortfolio] = useState(false);
    const [rightArrow, setRightArrow] = useState(true);

    const endIndex = startIndex + 5;
    const visibleImages = imagesArray.slice(startIndex, endIndex);
    const showRightArrow = endIndex - 1 < imagesArray.length;
    const showLeftArrow = startIndex > 0;

    useEffect(() => {
        if (ErrorMassagePortfolio) {
            const timer = setTimeout(() => {
                SetErrorMassagePortfolio(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [ErrorMassagePortfolio]);

    useEffect(() => {
        setCheckedExpert(expertUserData)
    }, [expertUserData])

    useEffect(() => {

        const addPhotoFunction = () => {
            if (Array.isArray(expertUserData.portfolio) && expertUserData.portfolio.length > 0) {
                const mappedArray = expertUserData.portfolio.map(item => item);

                setImagesArray(mappedArray);
            }
        }

        addPhotoFunction()
    }, [expertUserData.portfolio]);

    const deletePhoto = (item) => {

        const API_ENDPOINT = `${PORTFOLIO_LIST}${item.id}/`;
        const authTokenUHelp = localStorage.getItem('authTokenUHelp');

        const config = {
            headers: {
                'Authorization': `Token ${authTokenUHelp}`,
            },
        };

        axios.delete(API_ENDPOINT, config)
            .then(response => {
                if (response.status === 204) {

                    setImagesArray(prevImages => prevImages.filter(image => image.id !== item.id));

                }
            })
            .catch(error => {
                console.error('Ошибка при удалении фотографии:', error);
            });
    };

    const NavigateToBiographyEdit = () => {
        navigate('/settings/biography')
    }

    const NavigateToServicesEdit = () => {
        navigate('/settings/services')
    }

    const NavigateToProfessionsEdit = () => {
        navigate('/settings/professions')
    }

    const NavigateToSocialsEdit = () => {
        navigate('/settings/socials')
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleTabChange = (key) => {
        setTubKey(key)
    };

    const handleNext = () => {
        setRightArrow(false)
        setStartIndex(prev => Math.min(prev + 5, imagesArray.length));
    };

    const handlePrev = () => {
        setRightArrow(true)
        console.log(visibleImages)
        setStartIndex(prev => Math.max(prev - 5, 0));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file.size < 3000 || file.size > 5000000) {
            SetErrorMassagePortfolio(true)
            return
        }

        const authTokenUHelp = localStorage.getItem('authTokenUHelp');

        const config = {
            headers: {
                'Authorization': `Token ${authTokenUHelp}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append('file', file);

        axios.post(UPLOAD_PORTFOLIO, formData, config)
            .then(response => {
                if (response.status === 201) {
                    setImagesArray(prevImages => [...prevImages, response.data]);
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке фотографии:', error);
            });
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
                                        Пошта 
                                    </p>
                                    <CopyToClipboard text={userData.email}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.email
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
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
                                        Телефон 
                                    </p>
                                    <CopyToClipboard text={userData.phone_number}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.phone_number
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                            </div> : null
                        }
                        {
                            userData.telegram ? <div className={styles.message_item}>
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
                                    <CopyToClipboard text={userData.telegram}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.telegram
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
                            userData.instagram ? <div className={styles.socialMedia_item}>
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
                                    <CopyToClipboard text={userData.instagram}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.instagram
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                            </div> : null
                        }
                        {
                            userData.facebook ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={facebookIcon}
                                        alt="Grapefruit slice atop a pile of other slices"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        Facebook
                                    </p>
                                    <CopyToClipboard text={userData.linkedin}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.facebook
                                                }
                                            </p>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                            </div> : null
                        }
                        {
                            userData.linkedin ? <div className={styles.socialMedia_item}>
                                <div className={styles.item_icon_wrapper}>
                                    <img
                                        className={styles.item_icon}
                                        src={linkedinIcon}
                                        alt="Grapefruit slice atop a pile of other slices"
                                    />
                                </div>
                                <div className={styles.item_text}>
                                    <p className={styles.text_title}>
                                        LinkedIn
                                    </p>
                                    <CopyToClipboard text={userData.linkedin}>
                                        <Tooltip overlayInnerStyle={{ width: '97px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="top" title={'Скопіювати'} >
                                            <p className={styles.text_value}>
                                                {
                                                    userData.linkedin
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
                <div className={styles.my_summary_block}>
                    {
                        userData.about_my_self ?
                            <p className={styles.my_summary_text}>
                                {userData.about_my_self}
                            </p>
                            : null
                    }

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
                            expertUserData.profession ? expertUserData.profession.map((el, index) => {
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
                            expertUserData.service ? expertUserData.service.map((el, index) => {
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

                        {visibleImages.map((item, index) => (

                            <div className={styles.my_portfolio_item_wrapper} key={`${item.id}`} onClick={() => deletePhoto(item)}>
                                <img key={index}
                                    src={item.file}
                                    alt={`Description-${startIndex + index}`}
                                    className={styles.my_portfolio_item}
                                />
                                <div className={styles.my_portfolio_item_delete}></div>
                            </div>
                        ))}

                        {

                        }

                        {!showRightArrow && imagesArray.length < 10 && <ImageUploader handleFileChange={handleFileChange} />}

                        {rightArrow && showRightArrow && (
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
            {
                ErrorMassagePortfolio ? <ErrorNotification
                    text={'Розмір фото має бути від 3 кб до 5 Мб. Будь ласка, оберіть інше'}
                /> : null
            }

            <div className={styles.user_about}>
                <div className={styles.user_title}>
                    <h4 className={styles.title_text}>
                        Про мене
                    </h4>
                    <div className={styles.title_switcher}>
                        <UserProfileSwitcher
                            verified={userData.phone_verified}
                            idExpertProfile={expertUserData.id}
                            setCheckedExpert={setCheckedExpert}
                        />
                        {checkedExpert
                            ? <p className={styles.switcher_text}>
                                Експертний профіль
                            </p>
                            :
                            (userData.phone_verified ?
                                <p className={styles.switcher_text_disabled}>
                                    Переключитися на Експертний профіль
                                </p>
                                : <Tooltip overlayInnerStyle={{ width: '262px', whiteSpace: 'nowrap' }} arrow={{ pointAtCenter: true }} color={'rgba(3, 9, 28, 0.75'} placement="topLeft" title={'Only verified user can become Expert'} >
                                    <p id="linkedinText" style={{ cursor: 'pointer' }} className={styles.switcher_text_disabled}>
                                        Переключитися на Експертний профіль
                                    </p>
                                </Tooltip>)
                        }
                        <img onClick={openModal} style={{ cursor: 'pointer' }} src={exclamationIcon} alt='exclamation icon' />
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

                        <button className={styles.no_content_button} onClick={() => { console.log('Додати телефон') }}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.no_content_text}>
                                Додати телефон
                            </span>
                        </button>

                    )}
                    {!(userData.linkedin || userData.facebook || userData.instagram) && tubKey === '1' && (

                        <button className={styles.no_content_button} onClick={() => NavigateToSocialsEdit()}>
                            <img src={addIcon} alt='add icon' />
                            <span className={styles.no_content_text}>
                                Додати соціальну мережу
                            </span>
                        </button>

                    )}
                    {!userData.about_my_self && tubKey === '2' && (

                        <div className={styles.no_content_block}>
                            <p className={styles.no_content_text}>
                                Будь ласка, розскажіть нам про себе. Поділіться вашою історією, досвідом роботи, інтересами, та більше.
                            </p>
                            <button className={styles.no_content_button} onClick={() => NavigateToBiographyEdit()}>
                                <img src={addIcon} alt='add icon' />
                                <span className={styles.no_content_text}>
                                    Додати біографію
                                </span>
                            </button>
                        </div>

                    )}
                    {(!expertUserData.profession?.length && tubKey === '3') ? (

                        <div className={styles.no_content_block}>
                            <p className={styles.no_content_text}>
                                Будь ласка, додайте свою професію, щоб інші користувачі могли здобути більш повне уявлення про ваш фаховий досвід та сферу діяльності.
                            </p>
                            <button className={styles.no_content_button} onClick={() => NavigateToProfessionsEdit()}>
                                <img src={addIcon} alt='add icon' />
                                <span className={styles.no_content_text}>
                                    Додати професію
                                </span>
                            </button>
                        </div>

                    ) : null}
                    {!expertUserData.service?.length && tubKey === '4' ? (

                        <div className={styles.no_content_block}>
                            <p className={styles.no_content_text}>
                                Будь ласка, додайте інформацію про ваші послуги, щоб інші користувачі могли ознайомитися з вашою діяльністю.
                            </p>
                            <button className={styles.no_content_button} onClick={() => NavigateToServicesEdit()}>
                                <img src={addIcon} alt='add icon' />
                                <span className={styles.no_content_text}>
                                    Додати послугу
                                </span>
                            </button>
                        </div>

                    ) : null}

                </div>
            </div>
            {
                isModalOpen && <ModalInfoAboutExpertProfile onClose={closeModal} />
            }
        </>
    )
}


export default AboutMe

