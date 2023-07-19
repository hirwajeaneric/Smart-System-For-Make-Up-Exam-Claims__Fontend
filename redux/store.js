import { configureStore } from '@reduxjs/toolkit';
import userReducers  from './features/userSlice';
import courseReducers from './features/courseSlice';
import registrationReducers from './features/registrationSlice';
import claimReducers from './features/claimSlice';

export const store = configureStore({
    reducer: {
        user: userReducers,
        course: courseReducers,
        registration: registrationReducers,
        claim: claimReducers,
    }
})