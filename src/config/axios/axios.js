import axios from 'axios';

// const instance = axios.create({
// 	baseURL: 'http://51.20.204.164/',
// });

const instance = axios.create({
	baseURL: 'http://0.0.0.0:8000/',
});

instance.interceptors.request.use((config) => {
	const token = window.localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Token ${token}`;
	}
	return config;
});

instance.interceptors.response.use(function (response) {
	return response.data;
});

export default instance;
