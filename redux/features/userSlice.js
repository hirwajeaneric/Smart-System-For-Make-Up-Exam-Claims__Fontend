import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    teachers: [],
    students: [],
    numberOfTeachers: 0,
    numberOfStudents: 0, 
    isLoading: false,
}

export const getAllUsers = createAsyncThunk(
    'milk/getAllUsers',
    async (thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/ssmec/user/list`);
            response.data.users.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getAllUsers.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllUsers.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.teachers = action.payload.filter(user => user.role === 'Teacher');
            state.numberOfTeachers = state.teachers.length
        },
        [getAllUsers.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;