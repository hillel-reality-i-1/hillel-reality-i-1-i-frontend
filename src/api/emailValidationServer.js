import axios from 'axios';

import { URL_CHECK_EMAIL } from '../config/API_url';

const emailValidationServer = async (values) => {
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  
	if (!values.email.trim() || values.email.length <= 2 || !emailRegex.test(values.email)) {
	  	return 1;
	}
  
	try {
	  const response = await axios.post(URL_CHECK_EMAIL, values);
	  return response.data.exists;
	} catch (error) {
	  return false;
	}
  };
  
  export default emailValidationServer;
