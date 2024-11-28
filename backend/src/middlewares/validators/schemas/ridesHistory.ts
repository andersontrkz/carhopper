import * as Yup from 'yup';

export const ridesHistorySchema = Yup.object({
    query: Yup.object({
        driver_id: Yup.number()
            .positive('Motorista deve ser um número válido')
            .nullable(),
    }),
    params: Yup.object({
        customer_id: Yup.string()
            .min(1, 'Cliente não pode ser vazio')
            .required('Cliente é obrigatório'),
        }),
});
