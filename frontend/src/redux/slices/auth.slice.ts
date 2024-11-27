import generateUUID from '@/utils/token';
import { createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
  customerId: string;
}

const getCustomerId = (): string | null => {
  return localStorage.getItem('customerId');
};

const setCustomerId = (customerId: string) => {
  localStorage.setItem('customerId', customerId);
};

const checkCustomerId = () => {
  const customerId = getCustomerId();

  if (customerId) {
    return customerId;
  }

  const newCustomerId = generateUUID();
  setCustomerId(newCustomerId);
  return newCustomerId;
};

const initialState: IAuthState = {
  customerId: checkCustomerId(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

const authReducer = authSlice.reducer;
export default authReducer;
