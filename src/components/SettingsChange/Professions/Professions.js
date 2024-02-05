import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';

import { ReactComponent as Briefcase } from '../../../assets/img/icons/settings-icons/briefcase.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';

import styles from './professions.module.scss';

export default function Professions() {
    const { data, isLoading, refetch } = useGetUserDataQuery();
    const authToken = useSelector((state) => state.signIn.authTokenUHelp);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [proffesions, setProffesions] = useState([]);
    const [additionalInputs, setAdditionalInputs] = useState(1); // Initialize with 1 input
    const [selectedProfessions, setSelectedProfessions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/prof_service/professions/`);
                const formatProffesions = response.data.map((i) => ({
                    value: i.name,
                    label: i.name,
                }));
                setProffesions(formatProffesions);
            } catch (err) {
                console.error(err.toJSON());
            }
        };

        fetchData();
    }, []);

    const onChange = (value) => {
        console.log(`selected ${value}`);
        // Handle the selected professions
        setSelectedProfessions(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const addAdditionalInput = () => {
        if (additionalInputs < 5) {
            setAdditionalInputs((prevInputs) => prevInputs + 1);
        }
    };

    return (
        <div className={styles.professions}>
            <h4>
                <Briefcase />
                Професії
            </h4>
            <p>Розширте ваш Профіль, додавши до 5 професій. Це допоможе надати більш повну картину вашої професійної експертизи.</p>
            <div className='settings-page-input'>
                {Array.from({ length: additionalInputs }, (_, index) => (
                    <Select
                        key={index}
                        showSearch
                        style={{
                            width: '100%',
                            height: '56px',
                            marginBottom: '16px', 
                        }}
                        placeholder="Select a profession"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        value={selectedProfessions[index] || undefined}
                    >
                        {proffesions.map((i) => (
                            <Select.Option key={i.value + i.id} value={i.value}>
                                {i.label}
                            </Select.Option>
                        ))}
                    </Select>
                ))}
            </div>
            <p>Ця професія буде зазначена біля вашого імені.</p>
            {additionalInputs < 5 && <p onClick={addAdditionalInput}>+ Додати ще</p>}

            {/* {error && <div className={styles.nickName__error}><ErrorIcon /> {error}</div>} */}
            {/* {showSuccessToast && (
              <Toast
                  message='Ваші зміни були успішно збережені'
                  duration={3000}
              />
          )} */}
            {/* <BlueButton
              text={'Зберегти'}
              additionalStyles={(error || usernameRef.current === '') ? styles.button : styles.validButton}
              onClick={handleSaveUsername}
          /> */}
        </div>
    )
}
