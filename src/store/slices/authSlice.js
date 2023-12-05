import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_REGISTRATION_EMAIL } from '../../config/API_url';

export const fetchRegisterEmail = createAsyncThunk('fetchRegisterEmail', async (user) => {
	try {
		const data = await axios.post(URL_REGISTRATION_EMAIL, user);
		console.log(data.data);
		return data.data;
	} catch (error) {
		return console.log(error.message);
	}
});

const initialState = {
	user: null,
	status: 'loading',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// register=========================//
		builder.addCase(fetchRegisterEmail.pending, (state) => {
			state.status = 'loading';
			state.user = null;
		});
		builder.addCase(fetchRegisterEmail.fulfilled, (state, action) => {
			state.status = 'loaded';
			state.user = action.payload;
		});
		builder.addCase(fetchRegisterEmail.rejected, (state) => {
			state.status = 'error';
			state.user = null;
		});
	},
});

export const authReducer = authSlice.reducer;
