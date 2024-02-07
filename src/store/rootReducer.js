import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import signInSlice from './slices/signInSlice';
import { userApi } from './services/userApi';
import { commentsReducer } from './slices/commentsSlice';

const rootReducer = combineReducers({
	comments: commentsReducer,
	auth: authReducer,
	signIn: signInSlice,
	[userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
