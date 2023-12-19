import { createSlice } from '@reduxjs/toolkit';

const storedAuthToken = localStorage.getItem('authTokenUHelp');
const str = storedAuthToken !== null ? storedAuthToken : '';

const initialState = {
  authTokenUHelp: str,
  googleAuthTokenUHelp: ''
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      const newAuthToken = action.payload;

      state.authTokenUHelp = newAuthToken;
      localStorage.setItem('authTokenUHelp', newAuthToken);
    },
    setGoogleAuthToken: (state, action) => {
      const newGoogleAuthToken = action.payload;
      state.googleAuthTokenUHelp = newGoogleAuthToken;
      localStorage.setItem('googleAuthTokenUHelp', newGoogleAuthToken);
    },
    clearAuthToken: (state) => {
      state.authTokenUHelp = '';
      state.googleAuthTokenUHelp = '';
      localStorage.removeItem('authTokenUHelp');
      localStorage.removeItem('googleAuthTokenUHelp');
    },
  }
});

export const { setAuthToken, setGoogleAuthToken, clearAuthToken } = signInSlice.actions;

export default signInSlice.reducer;
