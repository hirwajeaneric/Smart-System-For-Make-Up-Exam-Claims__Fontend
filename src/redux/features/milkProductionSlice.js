import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    milkProductionOnCountryLevel: [],
    amountOfMilkProductionOnCountryLevel: 0,
    milkProductionOnDistrictLevel: [],
    amountOfMilkProductionOnDistrictLevel: 0,
    milkProductionOnMccLevel: [],
    amountOfMilkProductionOnMccLevel: 0,
    milkProductionForFarmer: [],
    amountOfMilkProductionForFarmer: 0,
    isLoading: false,
}

export const getMilkProductionOnCountryLevel = createAsyncThunk(
    'milk/getMilkProductionOnCountryLevel',
    async (filter, thunkAPI) => {
        const { period } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/list`);
            response.data.milkProduction.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.date = new Date(element.date).toLocaleString();
            });
            return {milkProduction: response.data.milkProduction, period: period}
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMilkProductionOnDistrictLevel = createAsyncThunk(
    'milk/getMilkProductionOnDistrictLevel',
    async (filter, thunkAPI) => {
        const { period, district } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/findByDistrict?district=${district}`);
            response.data.milkProduction.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, period: period }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMilkProductionOnMCCLevel = createAsyncThunk(
    'milk/getMilkProductionOnMCCLevel',
    async (filter, thunkAPI) => {
        const { period, mccId } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/findByMccId?id=${mccId}`);
            response.data.milkProduction.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, period: period }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMilkProductionForFarmer = createAsyncThunk(
    'milk/getMilkProductionForFarmer',
    async (filter, thunkAPI) => {
        const { period, farmerId } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/findByFarmerId?farmerId=${farmerId}`);
            response.data.milkProduction.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, period: period }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const milkProduction = createSlice({
    name: 'milk',
    initialState,
    extraReducers: {
        [getMilkProductionOnCountryLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionOnCountryLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getMilkProductionOnCountryLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMilkProductionOnDistrictLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionOnDistrictLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getMilkProductionOnDistrictLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMilkProductionOnMCCLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionOnMCCLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getMilkProductionOnMCCLevel.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = milkProduction.actions;
export default milkProduction.reducer;