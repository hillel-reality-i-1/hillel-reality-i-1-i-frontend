import axios from 'axios';

import { URL_PASSWORD_RESET_CHECK_API } from '../config/API_url';

export default async function passwordResetCheck(id, token) {
    const url = `${URL_PASSWORD_RESET_CHECK_API}`;

    const data = {
        uid: id,
        token: token,
    };

    const response = await axios.post(url, data);
    
    return response
}
