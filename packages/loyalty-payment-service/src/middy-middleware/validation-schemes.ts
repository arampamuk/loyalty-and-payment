import { object, string, number } from 'yup';

export const requestPaymentSchema = object({
  userId: string(),
  amount: number().required().positive(),
});
