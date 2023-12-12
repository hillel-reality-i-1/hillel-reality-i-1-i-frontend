import axios from 'axios';

import { URL_PASSWORD_RESET_CONFIRM } from "../config/API_url";

const resetPasswordConfirm = async (newPassword1, newPassword2, id, token) => {
    const url = `${URL_PASSWORD_RESET_CONFIRM}${id}/${token}/`;

    const data = {
        new_password1: newPassword1,
        new_password2: newPassword2,
        uid: id,
        token: token,
    };

    try {
        const response = await axios.post(url, data);

        console.log('Password reset successful:', response.data);
    } catch (error) {
        console.error('Password reset failed:', error.message);
    }
};

export default resetPasswordConfirm;