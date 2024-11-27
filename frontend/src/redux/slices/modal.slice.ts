import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

const initialState: IModalState = {
  isOpen: false,
  message: '',
  onConfirm: () => null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ message: string, onConfirm: () => void }>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
