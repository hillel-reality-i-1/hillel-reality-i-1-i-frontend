import axios from 'axios';

import { DELETE_USER_PROFILE_EXTENDED } from '../config/API_url';

const deleteUserProfile = async (userId) => {
  try {
    const url = `${DELETE_USER_PROFILE_EXTENDED}${userId}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
      },
    };

    const response = await axios.delete(url, options);

    if (response.status === 204) {
      console.log('Профиль пользователя успешно удален.');
    } else {
      console.log('Произошла ошибка при удалении профиля пользователя.');
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
  }
};

export default deleteUserProfile
