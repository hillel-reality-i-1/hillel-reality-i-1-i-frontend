import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../config/axios/axios';
import 'react-toastify/dist/ReactToastify.css';
import { URL_REGISTRATION_EMAIL, URL_UPDATE_USER, URL_CREATE_PROFILE } from '../../config/API_url';

export const fetchRegisterEmail = createAsyncThunk(
	'fetchRegisterEmail',
	async (user, { rejectWithValue }) => {
		try {
			const data = await axios.post(URL_REGISTRATION_EMAIL, user);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchUpdateName = createAsyncThunk(
	'fetchUpdateName',
	async ({ id, user_name, full_name }, { rejectWithValue }) => {
		try {
			const data = await axios.patch(`${URL_UPDATE_USER}${id}/`, {
				username: user_name,
				full_name: full_name,
			});
			return data;
		} catch (error) {
			// Sending an error to thunk and using rejectWithValue to store the error in state
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchAddDataProfile = createAsyncThunk(
	'fetchAddDataProfile',
	async ({ country_id, city_id, phone_number }, { rejectWithValue }) => {
		try {
			const data = await axios.post(URL_CREATE_PROFILE, {
				country_id: country_id,
				city_id: city_id,
				phone_number: phone_number,
			});
			return data;
		} catch (error) {
			// Sending an error to thunk and using rejectWithValue to store the error in state
			return rejectWithValue(error.response.data);
		}
	}
);

const storedUserData = localStorage.getItem('userData');
const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

const initialState = {
	user: initialUserData,
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
