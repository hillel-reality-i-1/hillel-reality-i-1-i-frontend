import axios from 'axios';

import { URL_LOGIN, URL_USER_LIST } from '../config/API_url';

const emailValidationServer = async (values, setActiveButton, setEmailValue) => {
    const errors = {};

    try {
        // ВХОД (Здесь временно, для того, чтобы получить список юзеров)
        const loginResponse = await axios.post(URL_LOGIN, {
            email: 'admin@gmail.com',
            password: 'admin'
        });

        if (loginResponse.status < 200 || loginResponse.status >= 300) {
            throw new Error(`HTTP error! Status: ${loginResponse.status}`);
        }
        
        localStorage.setItem('authTokenUHelp', loginResponse.data.key);
        /////

        const usersResponse = await axios.get(URL_USER_LIST, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
            },
        });

        const usersData = usersResponse.data;
        const userWithEmail = usersData.find(user => user.email === values.email);

        if (!userWithEmail) {
            errors.email = 'Email not found';
            setActiveButton(false);
        } else {
            setActiveButton(true);
            setEmailValue(values);
        }
    } catch (error) {
        console.error('Error during email validation:', error.message);
        errors.email = 'Error during email validation';
        setActiveButton(false);
    }

    return errors;
};

export default emailValidationServer;
