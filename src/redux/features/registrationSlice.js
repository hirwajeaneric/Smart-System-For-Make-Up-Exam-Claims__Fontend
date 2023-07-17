import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    studentRegistration: [],
    isLoading: false,
}

export const getStudentRegistration = createAsyncThunk(
    'registration/getStudentRegistration',
    async (filter, thunkAPI) => {
        const { registrationNumber } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/ssmec/findByRegistration?registrationNumber=${registrationNumber}`);
            return response.data.studentRegistration
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    extraReducers: {
        [getStudentRegistration.pending] : (state) => {
            state.isLoading = true;
        },
        [getStudentRegistration.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.studentRegistration = action.payload;
        },
        [getStudentRegistration.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = registrationSlice.actions;
export default registrationSlice.reducer;