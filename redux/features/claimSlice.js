import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    studentClaims: [],
    courseClaims: [],
    hodClaims: [],
    accountantClaims: [],
    deanOfStudentsClaims: [],
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

export const getDepartmentClaims = createAsyncThunk(
    'claim/getDepartmentClaims',
    async (filter, thunkAPI) => {
        const { token, department } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByLecturerSignature?department=${department}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getAccountantClaims = createAsyncThunk(
    'claim/getAccountantClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByPaid`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getDeanOfStudentsClaims = createAsyncThunk(
    'claim/getDeanOfStudentsClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByAccountantSignature`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getRegistrationOfficeClaims = createAsyncThunk(
    'claim/getRegistrationOfficeClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDeanOfStudentSignature`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getExaminationOfficeClaims = createAsyncThunk(
    'claim/getExaminationOfficeClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByRegistrationOfficerSignature`, config);
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
        [getDepartmentClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getDepartmentClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.hodClaims = action.payload;
        },
        [getDepartmentClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getAccountantClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getAccountantClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.accountantClaims = action.payload;
        },
        [getAccountantClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getDeanOfStudentsClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getDeanOfStudentsClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.deanOfStudentsClaims = action.payload;
        },
        [getDeanOfStudentsClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getRegistrationOfficeClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getRegistrationOfficeClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.registrationOfficeClaims = action.payload;
        },
        [getRegistrationOfficeClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getExaminationOfficeClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getExaminationOfficeClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.examinationOfficerClaims = action.payload;
        },
        [getExaminationOfficeClaims.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { } = claimSlice.actions;
export default claimSlice.reducer;