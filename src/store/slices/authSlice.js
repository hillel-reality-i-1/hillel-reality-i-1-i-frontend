import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../config/axios/axios';
import { URL_REGISTRATION_EMAIL, URL_UPDATE_USER, URL_CREATE_PROFILE } from '../../config/API_url';

export const fetchRegisterEmail = createAsyncThunk('fetchRegisterEmail', async (user) => {
	try {
		const data = await axios.post(URL_REGISTRATION_EMAIL, user);
		console.log(data);
		return data;
	} catch (error) {
		return console.log(error.message);
	}
});

export const fetchUpdateName = createAsyncThunk(
	'fetchUpdateName',
	async ({ id, first_name, last_name }) => {
		try {
			const data = await axios.patch(`${URL_UPDATE_USER}${id}/`, {
				first_name: first_name,
				last_name: last_name,
			});

			// console.log(data);
			return data;
		} catch (error) {
			return console.log(error.message);
		}
	}
);

export const fetchAddDataProfile = createAsyncThunk(
	'fetchAddDataProfile',
	async ({ country_id, city_id, phone_number }) => {
		try {
			const data = await axios.post(URL_CREATE_PROFILE, {
				country_id: country_id,
				city_id: city_id,
				phone_number: phone_number,
			});
			console.log(data);
			return data;
		} catch (error) {
			return console.log(error.message);
		}
	}
);

const storedUserData = localStorage.getItem('userData');
const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

const initialState = {
	user: initialUserData,
	// user: null,
	profile: null,
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
		// updateName=========================//
		builder.addCase(fetchUpdateName.pending, (state) => {
			state.status = 'loading';
			state.user = null;
		});
		builder.addCase(fetchUpdateName.fulfilled, (state, action) => {
			state.status = 'loaded';
			state.user = action.payload;
		});
		builder.addCase(fetchUpdateName.rejected, (state) => {
			state.status = 'error';
			state.user = null;
		});

		// addDataProfile phone country city=========================//
		builder.addCase(fetchAddDataProfile.pending, (state) => {
			state.status = 'loading';
			state.profile = null;
		});
		builder.addCase(fetchAddDataProfile.fulfilled, (state, action) => {
			state.status = 'loaded';
			state.profile = action.payload;
		});
		builder.addCase(fetchAddDataProfile.rejected, (state) => {
			state.status = 'error';
			state.profile = null;
		});
	},
});

export const authReducer = authSlice.reducer;
