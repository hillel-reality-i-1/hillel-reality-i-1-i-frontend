import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://195.189.226.99',
});

// const instance = axios.create({
// 	baseURL: 'http://0.0.0.0:8000/',
// });

instance.interceptors.request.use((config) => {
	const token = window.localStorage.getItem('authTokenUHelp');
	if (token) {
		config.headers.Authorization = `Token ${token}`;
	}
	return config;
});

instance.interceptors.response.use(function (response) {
	return response.data;
});

export default instance;
