import { configureStore } from '@reduxjs/toolkit';
import mccReducer  from './features/mccSlice';
import userReducer from './features/userSlice';
import milkProductionReducer from './features/milkProductionSlice';
import manureProductionReducer from './features/manureProductionSlice';

export const store = configureStore({
    reducer: {
        mcc: mccReducer, 
        user: userReducer,
        milk: milkProductionReducer,
        manure: manureProductionReducer,
    }
})