import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import signInSlice from "./slices/signInSlice";


const rootReducer = combineReducers ({
    auth: authReducer,
    signIn: signInSlice
})

export default rootReducer;