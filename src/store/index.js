import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './services/userApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});


setupListeners(store.dispatch);

export default store;
