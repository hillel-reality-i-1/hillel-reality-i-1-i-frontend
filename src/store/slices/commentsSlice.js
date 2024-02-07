import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	useful: false,
	notUseful: false,
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		changeUseful: (state, action) => {
			state.useful = action.payload;
		},
		changeNotUseful: (state, action) => {
			state.notUseful = action.payload;
		},
	},
});
export const { changeUseful, changeNotUseful } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
