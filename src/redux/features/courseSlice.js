import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    coursesForSelectedTeacher: [],
    listOfCourses: [],
    numberOfCourses: 0,
    selectedCourse: {},
    numberOfCoursesForSelectedTeacher: 0,
    isLoading: false,
}

export const getAllCourses = createAsyncThunk(
    'course/getAllCourses',
    async (thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/ssmec/course/list`);
            response.data.courses.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.allocations.forEach(allocation => {
                    allocation.id = allocation._id; 
                })
            });
            return response.data.courses;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

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
    reducers: {
        getSelectedCourse: (state, action) => {
            console.log(action.payload);
            let course = state.listOfCourses.find(c => c.code === action.payload);
            state.selectedCourse = course;
        }
    },
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
        [getAllCourses.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllCourses.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.listOfCourses = action.payload;
            state.numberOfCourses = action.payload.length;
        },
        [getAllCourses.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { getSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;