import * as Yup from 'yup';

export const rideEstimateSchema = Yup.object({
    body: Yup.object({
        customer_id: Yup.string()
            .min(1, 'Cliente não pode ser vazio')
            .required('Cliente é obrigatório'),
    
        origin: Yup.string()
            .min(1, 'Origem não pode ser vazia')
            .required('Origem é obrigatória'),
    
        destination: Yup.string()
            .min(1, 'Destino não pode ser vazio')
            .required('Destino é obrigatório'),
    }),
});
