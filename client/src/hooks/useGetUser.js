import React from 'react';
import * as UserApi from '@core/api/UserRequest';

export const useGetUser = (isProfileUser, user, profileUserId) => {
  const [profileUser, setProfileUser] = React.useState({});

  React.useEffect(() => {
    const fetchProfileUser = async () => {
      if (isProfileUser) {
        setProfileUser(user);
      } else {
        const profile = await UserApi.getUser(profileUserId);
        setProfileUser(profile.data);
      }
    };

    fetchProfileUser();
  }, [isProfileUser, profileUserId, user]);

  return profileUser;
}