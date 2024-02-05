import React from 'react';
import { Switch } from 'antd';

import registrationUserProfile from '../../api/registrationUserProfile';
import deleteUserProfile from '../../api/deleteUserProfile';

const UserProfileSwitcher = ({ disabled, checked, onChange, userData, expertUserData, setCheckedExpert }) => {

  const handleChange = async (e) => {
    try {
      if (userData.phone_verified === true) {
        setCheckedExpert(e);
      } else {
        setCheckedExpert(false);
      }

      if (!e) {
        await deleteUserProfile(expertUserData.id);

      } else {
        const updatedExpertUserData = await registrationUserProfile();
        setCheckedExpert(updatedExpertUserData);
      }
    } catch (error) {
      console.error('Ошибка при изменении экспертного профиля:', error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Switch
      disabled={disabled}
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default UserProfileSwitcher;