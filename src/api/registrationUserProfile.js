import axios from "axios";
import { REGISTRATION_USER_PROFILE_EXT } from "../config/API_url";

const registrationUserProfile = async () => {
    try {
        const url = `${REGISTRATION_USER_PROFILE_EXT}`;
        const requestBody = {
            profession: [],
            service: []
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
            }
        };

        const response = await axios.post(url, requestBody, options);
        
        return response
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
}

export default registrationUserProfile