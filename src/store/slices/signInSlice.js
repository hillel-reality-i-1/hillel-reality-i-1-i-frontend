import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    key: ''
};

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        
    }
})

export const { } = signInSlice.actions;

export default signInSlice.reducer