import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import { ReactComponent as Briefcase } from '../../../assets/img/icons/settings-icons/briefcase.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import { ReactComponent as BluePlus } from '../../../assets/img/icons/settings-icons/Blue__Plus.svg';
import Toast from '../../Toast/Toast';

import styles from './services.module.scss';

export default function Services() {

    // const { data, isLoading, refetch } = useGetUserDataQuery();
    const { state } = useLocation();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [proffesions, setProffesions] = useState([]);
    const [additionalInputs, setAdditionalInputs] = useState(1);
    const [selectedProfessions, setSelectedProfessions] = useState([]);
    const [isModified, setIsModified] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/prof_service/services/`);
                const formatProffesions = response.data.map((i, index) => ({
                    value: i.name,
                    label: i.name,
                    index: index
                }));

                console.log(response.data);
                setProffesions(formatProffesions);

                state.user.service.length === 0 ? setSelectedProfessions(['', ...state.user.service]) : setSelectedProfessions(state.user.service)
            } catch (err) {
                console.error(err.toJSON());
            }
        };

        fetchData();
    }, []);

    const onChange = (value, index) => {
        setSelectedProfessions(prev => {
            const updatedProfessions = [...prev];
            updatedProfessions[index] = value;
            setIsModified(true)
            return updatedProfessions;
        });
    };


    const addAdditionalInput = () => {
        setSelectedProfessions(prev => [...prev, '']);
        if (additionalInputs < 5) {
            setAdditionalInputs((prevInputs) => prevInputs + 1);
        }
    };

    const addProffesions = async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/user_profile_extended/${state.user.id}/`;
        const headers = {
            headers: {
                Authorization: `Token ${authToken}`,
            },
        };
        const proffesionsToSendIndexes = proffesions.reduce((acc, profession, index) => {
            if (selectedProfessions.includes(profession.value)) {
                console.log('index', index++);
                acc.push(index)
            }
            return acc;
        }, []);
        console.log(proffesionsToSendIndexes);
        try {
            const response = await axios.patch(url, {
                'service': proffesionsToSendIndexes
            }, headers)
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 3500);

            console.log(response.data)
        } catch (err) {
            console.error(err.toJSON())
        }
    }
    return (
        <div className={styles.services}>
            <h4>
                <Briefcase />
                Послуги
            </h4>
            <p>Розширте ваш Профіль, додавши до 5 послуг. Це допоможе більш повно відображати ваші унікальні навички.</p>
            {
                selectedProfessions.map((i, index) => (
                    <div key={index} className='settings-page-input' style={{ marginTop: '0' }}>
                        <Select
                            showSearch
                            style={{
                                width: '100%',
                                height: '56px',
                                marginBottom: '16px',
                            }}
                            onChange={(value) => onChange(value, index)}
                            placeholder={!i ? 'Select a profession' : i}
                        >
                            {proffesions.map((i, idx) => (
                                <Select.Option key={i.value + i.id} value={i.value}>
                                    {i.label}
                                </Select.Option>
                            ))}
                        </Select>
                       
                    </div>
                ))
            }

            {selectedProfessions.length < 5 && <p className={styles.add} onClick={addAdditionalInput}><BluePlus /> Додати ще</p>}
            <BlueButton
                text={'Зберегти'}
                additionalStyles={!isModified ? styles.button : styles.validButton}
                onClick={addProffesions}
            />

            {showSuccessToast && (
                <Toast
                    message='Ваші зміни були успішно збережені'
                    duration={3000}
                />
            )}
        </div>
    )
}
