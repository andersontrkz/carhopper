import { FormikProvider, useFormik } from 'formik';

import useAppDispatch from '@/hooks/useAppDispatch';
import { rideEstimate } from '@/redux/slices/ride.slice';
import { addressSchema } from '@/schemas/address.schema';
import type { IAddresses } from '@/types/interfaces/ride.interface';

import EstimateMap from './EstimateMap';
import EstimateResult from './EstimateResult';

function RideEstimate() {
  const dispatch = useAppDispatch();

  const initialValues: IAddresses = {
    origin: '',
    destination: '',
  };

  const submitRideEstimate = async (values: { origin: string, destination: string }) => {
    await dispatch(rideEstimate(values));
  };

  const formikForm = useFormik<IAddresses>({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: submitRideEstimate,
    validateOnMount: true,
  });

  return (
    <>
      <FormikProvider value={formikForm}>
        <EstimateMap>
          <EstimateResult />
        </EstimateMap>
      </FormikProvider>
    </>
  );
};

export default RideEstimate;
