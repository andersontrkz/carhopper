import { CARHOPPER_API_V1 } from '@/apis/carhopper.api';
import type { IRideRequest, IRideResponse } from '@/types/interfaces/services/carhopper.interface';

const PATH = '/ride';

export const postEstimate = async (payload: IRideRequest.IRideEstimateBody): Promise<IRideResponse.IEstimateRide> => {
  const response = await CARHOPPER_API_V1.post(`${PATH}/estimate`, payload);
  return response.data;
};
  
export const patchConfirm = async (payload: IRideRequest.IRideConfirmBody): Promise<IRideResponse.IConfirmRide> => {
  const response = await CARHOPPER_API_V1.patch(`${PATH}/confirm`, payload);
  return response.data;
};

export const getRidesHistory = async (
  { customerId }: IRideRequest.IRidesHistoryParams, { driverId }: IRideRequest.IRidesHistoryQuery
): Promise<IRideResponse.IRidesHistory> => {
  const response = await CARHOPPER_API_V1.get(`${PATH}/${customerId}`, { params: { driver_id: driverId } });
  return response.data;
};
