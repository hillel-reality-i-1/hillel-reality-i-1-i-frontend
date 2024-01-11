import axios from 'axios';

import { URL_PASSWORD_RESET_CONFIRM } from "../config/API_url";

const resetPasswordConfirm = async (newPassword1, newPassword2, id, token) => {
    const url = `${URL_PASSWORD_RESET_CONFIRM}`;

    const data = {
        new_password1: newPassword1,
        new_password2: newPassword2,
        uid: id,
        token: token,
    };

    const response = await axios.post(url, data);

    localStorage.setItem('authTokenUHelp', response.data.token);

    return response
};

export default resetPasswordConfirm;