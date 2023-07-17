import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    allMCCs: [],
    numberOfAllMCCs: 0,
    mccForSelectedDistrict: [],
    numberOfMCCsForSelectedDistrict: 0,
    isLoading: false,
}

export const getAllMCCs = createAsyncThunk(
    'mcc/getAllMCCs',
    async (thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/mcc/list`);
            response.data.MCCs.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.registrationDate = new Date(element.registrationDate).toLocaleString();
            });
            return response.data.MCCs
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMCCsForSelectedDistrict = createAsyncThunk(
    'mcc/getMCCsForSelectedDistrict',
    async (filter, thunkAPI) => {
        const { district } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/mcc/findByDistrict?district=${district}`);
            response.data.MCCs.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.registrationDate = new Date(registrationDate.date).toLocaleString();
            });
            return response.data.MCCs
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const mccSlice = createSlice({
    name: 'mcc',
    initialState,
    extraReducers: {
        [getAllMCCs.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllMCCs.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getAllMCCs.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMCCsForSelectedDistrict.pending] : (state) => {
            state.isLoading = true;
        },
        [getMCCsForSelectedDistrict.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getMCCsForSelectedDistrict.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = mccSlice.actions;
export default mccSlice.reducer;