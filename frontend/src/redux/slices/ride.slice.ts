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

interface IRideConfirmThunk extends IAddresses, IRide {
  driver: { id: number, name: string };
  value: number;
};

export const rideEstimate = createAsyncThunk(
  'ride/estimate', async (payload: IAddresses, { getState }
  ) => {
    const { auth: { customerId } }  = getState() as RootState;
    return await postEstimate({ customer_id: customerId, ...payload });
  });

export const rideConfirm = createAsyncThunk('ride/confirm', async (payload: IRideConfirmThunk, { getState }) => {
  const { auth: { customerId } }  = getState() as RootState;
  return await patchConfirm({ customer_id: customerId, ...payload });
});
  
export const ridesHistory = createAsyncThunk('ride/history', async (_, { getState }) => {
  const { auth: { customerId } }  = getState() as RootState;

  return await getRidesHistory({ customerId }, {});
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
          toast('Nenhum motorista disponível para o destino informado.');
        } else if (action.payload.options.length > 1) {
          toast(`Foram encontrados ${action.payload.options.length} motoristas para o seu destino.`);
        } else {
          toast(`Foi encontrado ${action.payload.options.length} motorista para o seu destino.`);
        }
      })
      .addCase(rideEstimate.rejected, (state) => {
        state.isLoading = false;
        toast('rejected');
      })

      .addCase(rideConfirm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rideConfirm.fulfilled, (state) => {
        state.isLoading = false;
        toast('Sua viagem foi confirmada com sucesso.');
      })
      .addCase(rideConfirm.rejected, (state) => {
        state.isLoading = false;
        toast('Falha ao confirmar sua viagem.');
      })

      .addCase(ridesHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ridesHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ridesHistory = action.payload.rides;
      })
      .addCase(ridesHistory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const rideReducer = rideSlice.reducer;
export default rideReducer;
