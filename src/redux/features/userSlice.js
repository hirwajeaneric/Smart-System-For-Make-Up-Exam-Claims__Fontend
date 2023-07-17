import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    allMccEmployees: [],
    employeesOfSelectedMcc: [],
    employeesOfSelectedDistrict: [],
    allVeterinaries: [],
    veterinariesForSelectedDistrict:[],
    allRegisteredFarmers: [],
    farmersForSelectedMcc: [],
    farmersForSelectedDistrict: [],
    numberOfAllMccEmployees: 0,
    numberOfEmployeesOfSelectedMcc: 0,
    numberOfEmployeesOfSelectedDistrict: 0,
    numberOfAllVeterinaries: 0,
    numberOfVeterinariesForSelectedDistrict:0,
    numberOfAllRegisteredFarmers: 0,
    numberOfFarmersForSelectedMcc: 0,
    numberOfFarmersForSelectedDistrict: 0, 
    isLoading: false,
}

export const getAllMccEmployees = createAsyncThunk(
    'milk/getAllMccEmployees',
    async (thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/user/list`);
            response.data.users.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getEmployeesForMcc = createAsyncThunk(
    'milk/getEmployeesForMcc',
    async (filter, thunkAPI) => {
        const { mccId } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/user/findByMcc=${mccId}`);
            response.data.users.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getEmployeesInDistrict = createAsyncThunk(
    'milk/getEmployeesInDistrict',
    async (filter, thunkAPI) => {
        const { district } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/user/findByDistrict=${district}`);
            response.data.users.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getVeterinaries = createAsyncThunk(
    'milk/getVeterinaries',
    async (thunkAPI) => {
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/user/findByUserRole=veterinary}`);
            response.data.users.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const milkProduction = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getAllMccEmployees.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllMccEmployees.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getAllMccEmployees.rejected] : (state) => {
            state.isLoading = false;
        },
        [getEmployeesForMcc.pending] : (state) => {
            state.isLoading = true;
        },
        [getEmployeesForMcc.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getEmployeesForMcc.rejected] : (state) => {
            state.isLoading = false;
        },
        [getEmployeesInDistrict.pending] : (state) => {
            state.isLoading = true;
        },
        [getEmployeesInDistrict.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getEmployeesInDistrict.rejected] : (state) => {
            state.isLoading = false;
        },
        [getVeterinaries.pending] : (state) => {
            state.isLoading = true;
        },
        [getVeterinaries.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getVeterinaries.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = milkProduction.actions;
export default milkProduction.reducer;