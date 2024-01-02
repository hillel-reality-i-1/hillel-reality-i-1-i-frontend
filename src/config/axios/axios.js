import axios from 'axios';

const instance = axios.create({
	baseURL: ' http://dmytromigirov.space',
});

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
