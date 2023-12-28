import React, { useState, useEffect } from 'react';
import { Tabs, Switch } from 'antd';
import { Flex, Input, ConfigProvider } from 'antd';
import axios from 'axios';

// import '../../../src/translations/i18n'
// import { useTranslation } from 'react-i18next';

import styles from './AboutMe.module.scss'

import cancelIcon from '../../assets/img/icons/icons-AboutMe/cancel.svg'
import facebookIcon from '../../assets/img/icons/icons-AboutMe/facebook_icon.svg'
import instagramIcon from '../../assets/img/icons/icons-AboutMe/insta_icon.svg'
import telegramIcon from '../../assets/img/icons/icons-AboutMe/telegram_icon.svg'
import emailIcon from '../../assets/img/icons/icons-AboutMe/email_icon.svg'
import callIcon from '../../assets/img/icons/icons-AboutMe/call_icon.svg'
import pencilIcon from '../../assets/img/icons/icons-AboutMe/edit.svg'
import addIcon from '../../assets/img/icons/icons-AboutMe/add_icon.svg'
import exclamation from '../../assets/img/icons/icons-AboutMe/exclamation.svg'
import locationIcon from '../../assets/img/icons/icons-EditYourProfile/location.svg'
import telegramIconForEditYourProfile from '../../assets/img/icons/icons-EditYourProfile/telegramIcon.svg'
import instagramIconForEditYourProfile from '../../assets/img/icons/icons-EditYourProfile/instagramIcon.svg'
import facebookIconForEditYourProfile from '../../assets/img/icons/icons-EditYourProfile/facebookIcon.svg'
import linkedinIconForEditYourProfile from '../../assets/img/icons/icons-EditYourProfile/linkedinIcon.svg'

const Modal = ({ onClose, setSummary }) => {
    const [valueText, setValueText] = useState('')
    const { TextArea } = Input;
    const [fullName, setFullName] = useState('Lily Kvitka');
    const [countries, setCountries] = useState([]);

    const getAllCountries = async () => {
        try {
            const data = await axios.get('http://dmytromigirov.space/api/v1/location/country_list/');
            return data;
        } catch (error) {
            return error.message;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await getAllCountries();
                getAllCountries && setCountries(countriesData.data);
            } catch (error) {
                return error.message;
            }
        };

        fetchData();
    }, [])



    console.log(countries)


    const fullNameInputChange = (e) => {
        console.log(e.target.value)
        setFullName(e.target.value);
    }

    const onChange = (e) => {
        setValueText(e.target.value)
    };

    return (
        <div className={styles.modal_сontainer}>
            <div className={styles.modal_сontainer_wrapper} >
                <div className={styles.сontainer_header} >
                    <h2 className={styles.header_title}>
                        Edit your profile
                    </h2>
                    <img className={styles.header_close}
                        onClick={onClose}
                        src={cancelIcon}
                        alt='close icon'
                    />
                </div>
                <div className={styles.сontainer} >
                    <div className={styles.сontainer_name}>
                        <div className={styles.name_block}>
                            <h5 className={styles.block_title}>
                                Name
                            </h5>
                            <p className={styles.block_text}>
                                You can change your name once every 90 days.
                            </p>
                        </div>
                        <div className={styles.сontainer_fullName}>
                            <form className={styles.fullName_form}>
                                <label className={styles.fullName_form_label} htmlFor="full-name">
                                    Full Name:
                                </label>
                                <Input
                                    className={styles.fullName_form_input}
                                    id="full-name"
                                    value={fullName}
                                    onChange={fullNameInputChange}
                                />
                            </form>
                        </div>
                    </div>
                    <div className={styles.сontainer_location}>
                        <div className={styles.location_textBlock}>
                            <div className={styles.location_description}>
                                <h5 className={styles.description_title}>
                                    Location
                                </h5>
                                <p className={styles.description_text}>
                                    We value your security and will not share your exact location.
                                </p>
                            </div>
                        </div>
                        <div className={styles.location_inputsBlock}>
                            <a className={styles.location_button} href="/">
                                <img className={styles.location_button_icon} src={locationIcon} alt="location icon" />
                                Share your location
                            </a>
                            <div className={styles.location_descriptionBlock}>
                                <p className={styles.descriptionBlock_text}>
                                    or select from the list
                                </p>
                            </div>
                            <div className={styles.location_dropdownsBlock}>
                                <form className={styles.dropdownsBlock_form}>
                                    <label className={styles.dropdownsBlock_form_label} htmlFor="country-name">
                                        Country:
                                    </label>
                                    <input className={styles.dropdownsBlock_form_input} list="countries" id="country-name" placeholder="Select the country" />
                                    <datalist className={styles.dropdownsBlock_form_datalist} id="countries">
                                        {
                                            countries.map(({ id, name }) => (
                                                <option
                                                    key={id}
                                                    value={id}>
                                                    {name}
                                                </option>))
                                        }
                                    </datalist>
                                </form>

                                <form className={styles.dropdownsBlock_form}>
                                    <label className={styles.dropdownsBlock_form_label} htmlFor="city-name">
                                        City:
                                    </label>
                                    <input className={styles.dropdownsBlock_form_input} list="countries" id="city-name" placeholder="Select the city" />
                                    <datalist className={styles.dropdownsBlock_form_datalist} id="countries">
                                        {
                                            countries.map(({ id, name }) => (
                                                <option
                                                    key={id}
                                                    value={id}>
                                                    {name}
                                                </option>))
                                        }
                                    </datalist>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.сontainer_email}>
                        <div className={styles.email_title}>
                            <h5 className={styles.email_title_text}>
                                Email
                            </h5>
                            <div className={styles.email_title_block}>
                                <div className={styles.email_title_block_switch_wrapper}>
                                    <Switch className={styles.email_title_block_switch} />
                                </div>
                                <span className={styles.email_title_block_text}>
                                    Show
                                </span>
                            </div>
                        </div>
                        <div className={styles.email_mail}>
                            <div className={styles.email_placeholder}>
                                <span className={styles.placeholder_text}>
                                    mail@gmail.com
                                </span>
                            </div>
                            <div className={styles.email_edit_button_wrapper}>
                                <button className={styles.email_edit_button} onClick={null}>
                                    <img className={styles.button_pencil_icon} src={pencilIcon} alt="pencil icon" />
                                    <span className={styles.button_text}>
                                        Edit
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.сontainer_phone}>
                        <div className={styles.phone_title}>
                            <h5 className={styles.phone_title_text}>
                                Phone
                            </h5>
                            <div className={styles.phone_title_block}>
                                <div className={styles.phone_title_block_switch_wrapper}>
                                    <Switch className={styles.phone_title_block_switch} />
                                </div>
                                <span className={styles.phone_title_block_text}>
                                    Show
                                </span>
                            </div>
                        </div>
                        <div className={styles.phone_number}>
                            <div className={styles.phone_placeholder}>
                                <span className={styles.placeholder_number}>
                                    +380 50 844 34 71
                                </span>
                            </div>
                            <div className={styles.phone_edit_button_wrapper}>
                                <button className={styles.phone_edit_button} onClick={null}>
                                    <img className={styles.button_pencil_icon} src={pencilIcon} alt="pencil icon" />
                                    <span className={styles.button_text}>
                                        Edit
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.сontainer_socialMedia}>
                        <div className={styles.socialMedia_title}>
                            <h5 className={styles.socialMedia_title_text}>
                                Social media
                            </h5>
                            <div className={styles.socialMedia_title_block}>
                                <div className={styles.socialMedia_title_block_switch_wrapper}>
                                    <Switch className={styles.socialMedia_title_block_switch} />
                                </div>
                                <span className={styles.socialMedia_title_block_text}>
                                    Show
                                </span>
                            </div>
                        </div>
                        <div className={styles.socialMedia_forms}>
                            <div className={styles.forms_input_wrapper}>
                                <img src={telegramIconForEditYourProfile} alt='telegram icon' />
                                <input className={styles.forms_input} type="text" placeholder="@username" />
                            </div>
                            <div className={styles.forms_input_wrapper}>
                                <img src={instagramIconForEditYourProfile} alt='instagram icon' />
                                <input className={styles.forms_input} type="text" placeholder="@username" />
                            </div>
                            <div className={styles.forms_input_wrapper}>
                                <img src={facebookIconForEditYourProfile} alt='facebook icon' />
                                <input className={styles.forms_input} type="text" placeholder="https://www.facebook.com/example" />
                            </div>
                            <div className={styles.forms_input_wrapper}>
                                <img src={linkedinIconForEditYourProfile} alt='linkedin icon' />
                                <input className={styles.forms_input} type="text" placeholder="https://www.linkedin.com/example" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.сontainer_summary}>
                        <div className={styles.summary_block}>
                            <div className={styles.block_description}>
                                <h5 className={styles.description_title}>
                                    Summary
                                </h5>
                                <p className={styles.description_text}>
                                    You can share more about yourself: your history, work experience, interests, and more
                                </p>
                            </div>
                            <div className={styles.block_textArea_wrapper}>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Input: {
                                                paddingBlock: 14,
                                                activeShadow: 'none',

                                            }
                                        },
                                        token: {
                                            colorText: '#000000',
                                            colorTextPlaceholder: '#47474F',
                                            colorPrimary: '#A7A7B2',
                                            borderRadius: '12px',
                                        }
                                    }}>
                                    <Flex vertical gap={32}>
                                        <TextArea
                                            showCount
                                            maxLength={500}
                                            onChange={onChange}
                                            placeholder="Tell about yourself…"
                                            style={{
                                                height: 200,
                                                resize: 'none',
                                            }}
                                            className={styles.block_textArea}
                                        />
                                    </Flex>
                                </ConfigProvider>
                            </div>
                        </div>
                        <div className={styles.summary_switch}>
                            <div className={styles.switch_text_wrapper}>
                                <h5 className={styles.switch_title}>
                                    Expetrise
                                </h5>
                            </div>
                            <div className={styles.switch_wrapper}>
                                <Switch />
                                <span className={styles.switch_text}>
                                    Switch to Expert Profile
                                </span>
                                <img src={exclamation} alt='exclamation icon' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.сontainer_bottom}>

                    <div className={styles.bottom_button}>
                        <div className={styles.button} onClick={() => {
                            setSummary(valueText)
                            onClose()
                        }}>
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};



const AboutMe = () => {
    const [checkedExpert, setCheckedExpert] = useState(false);
    const [summary, setSummary] = useState('');
    const [tubKey, setTubKey] = useState('1');
    const [isModalOpen, setModalOpen] = useState(false);
    const defaultTextSummary = 'You can share more about yourself: your history, work experience, interests, and more';
    const [imagesArray, setImagesArray] = useState([]);
    // const { t } = useTranslation();

    const openModal = () => {
        setModalOpen(true);
        console.log('true')
    };

    const closeModal = () => {
        setModalOpen(false);
        console.log('false')
    };

    const handleTabChange = (key) => {
        setTubKey(key)
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
        setImagesArray((prevImages) => [...prevImages, ...newImages]);
    };

    const items = [
        {
            key: '1',
            label: 'My contacts',
            children: (
                <div className={styles.my_contacts_block}>
                    <div className={styles.block_message}>
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
                                    Email:
                                </p>
                                <p className={styles.text_value}>
                                    mail@gmail.com
                                </p>
                            </div>
                        </div>
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
                                    Phone:
                                </p>
                                <p className={styles.text_value}>
                                    +38 050 000 00 00
                                </p>
                            </div>
                        </div>
                        <div className={styles.message_item}>
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
                                    @mykolapyvovarov
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.block_socialMedia}>
                        <div className={styles.socialMedia_item}>
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
                                    @mykolapyvovarov
                                </p>
                            </div>
                        </div>
                        <div className={styles.socialMedia_item}>
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
                                    https://www.facebook.com/mykolapyvovarov
                                </p>
                            </div>
                        </div>
                        <div className={styles.socialMedia_item}>
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
                                    https://www.linkedin.com/mykolapyvovarov
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Summary',
            children: (
                <div className={styles.my_summary_block}>
                    <p>{summary ? summary : defaultTextSummary}</p>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Expertise',
            children: 'Specify your profession so that other users can understand what you do',
        },
        {
            key: '4',
            label: 'Services',
            children: 'Specify your service so that other users can understand what you do',
        },
        {
            key: '5',
            label: 'Portfolio',
            children: (
                <div className={styles.my_photos_block}>
                    <div className={styles.block_photos}>
                        {imagesArray.map((imageUrl, index) => (
                            <img key={index}
                                src={imageUrl}
                                alt={`Description-${index}`}
                                className={styles.photos_item}
                            />
                        ))}
                    </div>
                    <label className={styles.button_addPhoto}>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className={styles.button_addPhoto_input}
                        />
                        <img src={addIcon} alt="add icon" />
                    </label>

                </div>
            ),
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
                    <img src={exclamation} alt='exclamation icon' />
                </div>
            </div>
            <div>
                <div className={styles.abx}>
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
                    />
                    <div className={styles.edit_button_wrapper}>
                        <button className={styles.edit_button} onClick={openModal}>
                            <img className={styles.button_pencil_icon} src={pencilIcon} alt="pencil icon" />
                            <span className={styles.button_text}>
                                Edit
                            </span>
                        </button>
                    </div>
                </div>



                {/* BUTTONS  */}

                {tubKey === '1' && (
                    <button className={styles.button_addSummary} onClick={openModal}>
                        <img src={addIcon} alt='add icon' />
                        <span className={styles.addSummary_text} >Add Social Media</span>
                    </button>
                )}
                {!summary && tubKey === '2' && (
                    <button className={styles.button_addSummary} onClick={openModal}>
                        <img src={addIcon} alt='add icon' />
                        <span className={styles.addSummary_text} >Add Summary</span>
                    </button>
                )}
                {tubKey === '3' && (
                    <button className={styles.button_addSummary} onClick={openModal}>
                        <img src={addIcon} alt='add icon' />
                        <span className={styles.addSummary_text} >Add Expertise</span>
                    </button>
                )}
                {tubKey === '4' && (
                    <button className={styles.button_addSummary} onClick={openModal}>
                        <img src={addIcon} alt='add icon' />
                        <span className={styles.addSummary_text} >
                            Add Service
                        </span>
                    </button>
                )}

                {isModalOpen && <Modal setSummary={setSummary} onClose={closeModal} />}
            </div>
        </div>
    )
}


export default AboutMe