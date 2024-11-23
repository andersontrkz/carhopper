import * as yup from 'yup';

export const rideEstimateSchema = yup.object({
    customer_id: yup.string().required('Customer is required').min(1, 'Customer must be at least 1 character'),
    origin: yup.string().required('Origin is required').min(1, 'Origin must be at least 1 character'),
    destination: yup.string().required('Destination is required').min(1, 'Destination must be at least 1 character'),
});
