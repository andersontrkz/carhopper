import { configureStore } from '@reduxjs/toolkit';

import rideReducer from '../slices/ride.slice';
import modalReducer from '../slices/modal.slice';
import authReducer from '../slices/auth.slice';

export const store = configureStore({
  reducer: {
    rides: rideReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
