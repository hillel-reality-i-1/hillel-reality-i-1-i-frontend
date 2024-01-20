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
        const userResult = await fetchWithBQ('api/v1/auth/user/');
       
        if (userResult.error) return { error: userResult.error };
        const user = userResult.data;
        if (user ) {
          
          const userProfileResult = await fetchWithBQ(`api/v1/users/user_profile_by_user_id/${user.pk}`);
          console.log(user);
          return userProfileResult.data ? { data: userProfileResult.data } : { error: userProfileResult.error };
        } else {
          return { error: 'Invalid user data' };
        }
      },
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;








