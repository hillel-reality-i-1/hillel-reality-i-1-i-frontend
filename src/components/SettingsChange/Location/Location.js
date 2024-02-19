import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import axios from '../../../config/axios/axios';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import BlueButton from '../../buttons/BlueButton/BlueButton';
import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/user-settings-grey.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/img/icons/settings-icons/error-icon.svg';
import Toast from '../../Toast/Toast';
import { URL_COUNTRY_LIST, URL_CITY_LIST, } from '../../../config/API_url';

import styles from './location.module.scss';

export default function Location() {
  const { data, isLoading, refetch } = useGetUserDataQuery();
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesChosen, setChosen] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const data = await axios.get(URL_COUNTRY_LIST);
        const formattedCountries = data.map((country) => ({
          id: country.id,
          value: country.name,
          label: country.name,
        }));
        setCountries(formattedCountries);
        return data;
      } catch (error) {
        return error.message;
      }
    };

    const getAllCities = async () => {
      try {
        const data = await axios.get(URL_CITY_LIST);
        const formattedCities = data.map((city) => ({
          id: city.id,
          country: city.country,
          value: city.name,
          label: city.name,
        }));

        setCities(formattedCities);
        return data;
      } catch (error) {
        return error.message;
      }
    };

    getAllCountries();
    getAllCities();
  }, []);

  const onChangeCountry = (value) => {

    const matchingCountry = countries.find((i) => i.value === value);
    setSelectedCountry(false);
    const matchingCities = cities.filter(
      (city) => city.country === matchingCountry.id
    );
    setChosen(matchingCities);
  };
  const onChangeCity = (value) => {

    const matchingCity = citiesChosen.find((city) => city.value === value);
    setSelectedCity(matchingCity);

  };
  const handleSaveCountry = async () => {
    if (selectedCity) {
      try {
        const userProfileUrl = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/user_profile/${data.id}/`;
        const headers = {
          Authorization: `Token ${authToken}`,
        };
        const new_countries = {
          country_id: selectedCity.country,
          city_id: selectedCity.id,
        };
        const response = await axios.patch(userProfileUrl, new_countries, {headers});
        setShowSuccessToast(true);
        refetch();
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3500);
      } catch (error) {
        console.error('Error while making PATCH request:', error.message);
      }
    } else {
      console.error('Please select both country and city.');
    }
  };

  if (isLoading) return <>Loading</>;

  return (
    <div className={styles.location}>
      <h4>  <UserSettings /> Місцезнаходження</h4>
      <p>
        Будь ласка, вкажіть ваші актуальні країну та місто, щоб завжди мати
        актуальну і корисну інформацію.
      </p>
      <div>
        <label>Країна</label>
        <div className='settings-page-input'>
          <Select
            showSearch
            style={{
              width: '100%',
              height: '56px',
            }}
            onChange={onChangeCountry}
            placeholder={data?.country?.name ?? ' Оберіть країну'}
          >
            {countries.map((i) => (
              <Select.Option key={i.value + i.id} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={styles.location__selects}>
        
        <label>Місто</label>
        <div className='settings-page-input'>
          <Select
            showSearch
            style={{
              width: '100%',
              height: '56px',
            }}
            disabled={selectedCountry}
            placeholder={data?.city?.name ?? 'Оберіть місто '}
            onChange={onChangeCity}
          >
            {citiesChosen.map((i) => (
              <Select.Option key={i.value + i.id} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <BlueButton
        text={'Зберегти'}
        additionalStyles={!selectedCity ? styles.button : styles.validButton}
        onClick={handleSaveCountry}
      />
      {showSuccessToast && (
        <Toast
          message='Ваші зміни були успішно збережені'
          duration={3000}
        />
      )}
    </div>
  );
}
