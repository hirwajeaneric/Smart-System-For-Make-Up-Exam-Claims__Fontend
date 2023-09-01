import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    notificationsForUser: [{
        text: 'New claim by Mukarugwiro Agnes',
        createdOn: new Date().toDateString()
    }],
    numberOfNotificationsForUser: 0,
    selectedNotification: {},
    isLoading: false,
}

export const getAllNotifications = createAsyncThunk(
    'notification/getAllNotifications',
    async (thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/ssmec/notification/list`);
            response.data.notifications.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.createdOn = new Date(element.createdOn).toLocaleDateString();
            });
            return response.data.notifications;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getNotificationsForUser = createAsyncThunk(
    'notification/getNotificationsForUser',
    async (filter, thunkAPI) => {
        try {
            const { role, department } = filter;
            const response = await axios.get(`${serverUrl}/api/v1/ssmec/notification/findByRecipient?recipient=${role}&department=${department}`);
            response.data.notifications.forEach(element => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
            });
            return response.data.notifications;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getSelectedNotification: (state, action) => {
            state.selectedNotification = action.payload;
        }
    },
    extraReducers: {
        [getNotificationsForUser.pending] : (state) => {
            state.isLoading = true;
        },
        [getNotificationsForUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.notificationsForUser = action.payload;
            state.numberOfNotificationsForUser = action.payload.length;
        },
        [getNotificationsForUser.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { getSelectedNotification } = notificationSlice.actions;
export default notificationSlice.reducer;