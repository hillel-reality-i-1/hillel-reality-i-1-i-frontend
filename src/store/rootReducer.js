import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import signInSlice from "./slices/signInSlice";
import { userApi } from './services/userApi';


const rootReducer = combineReducers ({
    auth: authReducer,
    signIn: signInSlice,
    [userApi.reducerPath]: userApi.reducer,
})

export default rootReducer; 