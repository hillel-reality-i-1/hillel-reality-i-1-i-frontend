import React from 'react';
import { Switch } from 'antd';

import registrationUserProfile from '../../api/registrationUserProfile';
import deleteUserProfile from '../../api/deleteUserProfile';

const UserProfileSwitcher = ({ verified, idExpertProfile, setCheckedExpert }) => {

  const handleChange = async (e) => {
    try {
      if (verified === true) {
        setCheckedExpert(e);
      } else {
        setCheckedExpert(false);
      }

      if (!e) {
        await deleteUserProfile(idExpertProfile);

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
      disabled={!verified}
      checked={idExpertProfile}
      onChange={handleChange}
    />
  );
};

export default UserProfileSwitcher;