import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { IAddresses, IDriverOption, IRide, IRideHistory } from '@/types/interfaces/ride.interface';
import { getRidesHistory, patchConfirm, postEstimate } from '@/apis/services/carhopper.service';
import type { RootState } from '../store';

interface IRideState {
  ride: IRide;
  ridesHistory: IRideHistory[],
  driverOptions: IDriverOption[];
  isLoading: boolean;
}

const initialState: IRideState = {
  ride: {} as IRide,
  ridesHistory: [],
  driverOptions: [],
  isLoading: false,
};

interface ErrorAction {
  payload: { response: { data: { error_description?: string } } }
}

interface IRideConfirmThunk extends IAddresses, IRide {
  driver: { id: number, name: string };
  value: number;
};

export const rideEstimate = createAsyncThunk(
  'ride/estimate', async (payload: IAddresses, { getState, rejectWithValue }
  ) => {
    const { auth: { customerId } }  = getState() as RootState;
    try {
      return await postEstimate({ customer_id: customerId, ...payload });
    } catch (error) {
      return rejectWithValue(error);
    }
  });

export const rideConfirm = createAsyncThunk(
  'ride/confirm', async (payload: IRideConfirmThunk, { getState, rejectWithValue  }
  ) => {
    const { auth: { customerId } }  = getState() as RootState;
    try {
      return await patchConfirm({ customer_id: customerId, ...payload });
    } catch (error) {
      return rejectWithValue(error);
    }
  });
  
export const ridesHistory = createAsyncThunk('ride/history', async (_, { getState, rejectWithValue }) => {
  const { auth: { customerId } }  = getState() as RootState;
  try {

    return await getRidesHistory({ customerId }, {});
  } catch (error) {
    return rejectWithValue(error);
  }
});

const rideSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rideEstimate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rideEstimate.fulfilled, (state, action) => {
        const { distance, duration, options } = action.payload;

        state.isLoading = false;
        state.ride = { distance, duration };
        state.driverOptions = options;

        if (!action.payload.options.length) {
          toast.info('Nenhum motorista disponível para o destino informado.');
        } else if (action.payload.options.length > 1) {
          toast.info(`Foram encontrados ${action.payload.options.length} motoristas para o seu destino.`);
        } else {
          toast.info(`Foi encontrado ${action.payload.options.length} motorista para o seu destino.`);
        }
      })
      .addCase(rideEstimate.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action as ErrorAction;
        toast.error(payload?.response?.data?.error_description);
      })

      .addCase(rideConfirm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rideConfirm.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Sua corrida foi confirmada com sucesso e já está disponível no seu hisrórico.');
      })
      .addCase(rideConfirm.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action as ErrorAction;
        toast.error(payload?.response?.data?.error_description);
      })

      .addCase(ridesHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ridesHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ridesHistory = payload.rides;
      })
      .addCase(ridesHistory.rejected, (_state, action) => {
        const { payload } = action as ErrorAction;
        toast.error(payload?.response?.data?.error_description);
      });
  },
});

const rideReducer = rideSlice.reducer;
export default rideReducer;
