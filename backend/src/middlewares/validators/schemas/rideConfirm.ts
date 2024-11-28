import * as Yup from 'yup';

export const rideConfirmSchema = Yup.object().shape({
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
    
        distance: Yup.number()
            .positive('Distância deve ser um número válido')
            .required('Distância é obrigatória'),
    
        duration: Yup.string()
            .min(1, 'Duração não pode ser vazia')
            .required('Duração é obrigatória'),
    
        driver: Yup.object().shape({
            id: Yup.number()
                .positive('Motorista deve ser um número válido')
                .required('Motorista é obrigatório'),
                
            name: Yup.string()
                .min(1, 'Nome do motorista não pode ser vazio')
                .required('Nome do motorista é obrigatório')
            }),
    
        value: Yup.number()
            .positive('Valor deve ser um número válido')
            .required('Valor é obrigatório')
    }),
});
