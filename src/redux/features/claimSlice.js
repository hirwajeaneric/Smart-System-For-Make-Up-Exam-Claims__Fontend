import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    studentClaims: [],
    courseClaims: [],
    hodClaims: [],
    accountantClaims: [],
    dosClaims: [],
    registrationOfficeClaims: [],
    examinationOfficerClaims: [],
    isLoading: false,
}

export const getStudentClaims = createAsyncThunk(
    'claim/getStudentClaims',
    async (filter, thunkAPI) => {
        const { registrationNumber } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByRegistrationNumber?registrationNumber=${registrationNumber}`);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getCourseClaims = createAsyncThunk(
    'claim/getCourseClaims',
    async (filter, thunkAPI) => {
        const { token, courseCode } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByCourse?courseCode=${courseCode}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getHodClaims = createAsyncThunk(
    'claim/getHodClaims',
    async (filter, thunkAPI) => {
        const { department } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDepartment?department=${department}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getAccountantClaims = createAsyncThunk(
    'claim/getAccountantClaims',
    async (filter, thunkAPI) => {
        const { registrationNumber } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByRegistrationNumber?registrationNumber=${registrationNumber}`);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getDeanOfStudentsClaims = createAsyncThunk(
    'claim/getDeanOfStudentsClaims',
    async (filter, thunkAPI) => {
        const { token, courseCode } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByCourse?courseCode=${courseCode}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getRegistrationOfficeClaims = createAsyncThunk(
    'claim/getRegistrationOfficeClaims',
    async (filter, thunkAPI) => {
        const { department } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDepartment?department=${department}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getExaminationOfficeClaims = createAsyncThunk(
    'claim/getExaminationOfficeClaims',
    async (filter, thunkAPI) => {
        const { department } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDepartment?department=${department}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);



const claimSlice = createSlice({
    name: 'claim',
    initialState,
    extraReducers: {
        [getStudentClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getStudentClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.studentClaims = action.payload;
        },
        [getStudentClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getCourseClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getCourseClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.courseClaims = action.payload;
        },
        [getCourseClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getHodClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getHodClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.hodClaims = action.payload;
        },
        [getHodClaims.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { } = claimSlice.actions;
export default claimSlice.reducer;