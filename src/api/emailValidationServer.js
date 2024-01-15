import axios from 'axios';

import { URL_CHECK_EMAIL } from '../config/API_url';

const emailValidationServer = async (values) => {
	if (!values.email.trim() || values.email.length <= 1) {
		return false;
	}

	try {
		const response = await axios.post(URL_CHECK_EMAIL, values);
		return response.data.exists;
	} catch (error) {
		return false;
	}
};

export default emailValidationServer;
