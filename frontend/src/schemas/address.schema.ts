import * as Yup from 'yup';

export const addressSchema = Yup.object({
  origin: Yup.string().required('Origem é obrigatório'),
  destination: Yup.string().required('Destino é obrigatório'),
});
