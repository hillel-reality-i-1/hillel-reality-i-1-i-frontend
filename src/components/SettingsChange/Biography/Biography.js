import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Input } from 'antd';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './biography.module.scss';

const { TextArea } = Input;

export default function Biography() {
    const { data, isLoading, refetch } = useGetUserDataQuery();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const textAreaRef = useRef(null);
    const [defaultText, setDefaultText] = useState(data?.about_my_self)
    const [status, setStatus] = useState('');
    const [statusButton, setStatusButton] = useState('error');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const handleTextAreaChange = (e) => {
        const currentLength = e.target.value.length;
        setTextAreaValue(e.target.value);
        setStatus(currentLength > 500 || currentLength < 2 ? 'error' : '');
        setStatusButton(currentLength > 500 || currentLength < 2 ? 'error' : '')
    };
    const handleSaveClick = async () => {
        const userProfileUrl = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/user_profile/${data.id}/`;
        const headers = {
            Authorization: `Token ${authToken}`,
        };
        const patchData = {
            about_my_self: textAreaValue,
        };

        try {
            const response = await axios.patch(userProfileUrl, patchData, { headers });
            setShowSuccessToast(true);
            refetch();
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 3500);

        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };
    const placeholderValue = data?.about_my_self ? data.about_my_self : 'Розкажіть про себе...';
    console.log(data);
    return (
        <div className={styles.biography}>
            <h4>
                <UserSettings />
                Біографія
            </h4>
            <p>Будемо раді дізнатися більше про вас! Поділіться своєю історією, досвідом, інтересами та чимось, що вас вражає.</p>
            <TextArea
                ref={textAreaRef}
                onChange={handleTextAreaChange}
                count={{
                    // minRows: 2,
                    show: true,
                    // max: 500,
                }}
                showCount
                maxLength={500}
                allowClear status={status} placeholder={placeholderValue} defaultValue={data?.about_my_self}
            />

            <BlueButton
                text={'Зберегти'}
                additionalStyles={statusButton === 'error' ? styles.button : styles.validButton}
                onClick={handleSaveClick}
            />
            {showSuccessToast && (
                <Toast
                    message='Ваші зміни були успішно збережені'
                    duration={3000}
                />
            )}
        </div >

    )
}
