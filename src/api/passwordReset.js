import axios from 'axios';
import { URL_PASSWORD_RESET } from '../config/API_url';

export default async function passwordReset(values) {
    try {
        const response = await axios.post(URL_PASSWORD_RESET, values);

        if (!response.status === 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during password reset:', error.message);
    }
}

