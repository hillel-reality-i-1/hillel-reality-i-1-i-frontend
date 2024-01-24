import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().signIn.authTokenUHelp;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
    
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const userResult = await fetchWithBQ('api/v1/auth/user/');
    
          if (userResult.error) {
            console.error('Error fetching user:', userResult.error);
            return { error: 'Error fetching user' };
          }
    
          const user = userResult.data;
    
          if (user !== undefined && user !== null) {
            const userProfileResult = await fetchWithBQ(`api/v1/users/user_profile_by_user_id/${user.pk}`);
            
            if (userProfileResult.error) {
              console.error('Error fetching user profile:', userProfileResult.error);
              return { error: 'Error fetching user profile' };
            }
    
            return userProfileResult.data ? { data: userProfileResult.data } : { error: 'Empty user profile data' };
          } else {
            return { error: 'Invalid user data' };
          }
        } catch (error) {
          console.error('Unexpected error:', error);
          return { error: 'Unexpected error' };
        }
      },
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;








