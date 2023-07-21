import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    coursesForSelectedTeacher: [],
    numberOfCoursesForSelectedTeacher: 0,
    isLoading: false,
}

export const getCoursesForTeacher = createAsyncThunk(
    'course/getCoursesForTeacher',
    async (filter, thunkAPI) => {
        try {
            const { lecturerId, token } = filter;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/course/findByLecturerId?lecturerId=${lecturerId}`, config);
            response.data.courses.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
            });
            return response.data.courses;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const courseSlice = createSlice({
    name: 'course',
    initialState,
    extraReducers: {
        [getCoursesForTeacher.pending] : (state) => {
            state.isLoading = true;
        },
        [getCoursesForTeacher.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.coursesForSelectedTeacher = action.payload;
            state.numberOfCoursesForSelectedTeacher = action.payload.length;
        },
        [getCoursesForTeacher.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { } = courseSlice.actions;
export default courseSlice.reducer;