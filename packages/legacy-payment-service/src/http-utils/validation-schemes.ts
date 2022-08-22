import { object, string, number } from 'yup';

export const requestPaymentSchema = object({
  userId: string().required(),
  amount: number().required().positive(),
});
