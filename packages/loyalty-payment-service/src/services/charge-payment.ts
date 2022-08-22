import axios, { AxiosRequestConfig } from 'axios';
import { RequestPayment } from '../types/request-payment';
import { ResponsePayment } from '../types/response-payment';

const baseURL = `http://localhost:3000`;

const axiosConfig = (): AxiosRequestConfig => ({
  baseURL,
  headers: {
    'content-type': 'application/json',
    // authorization: `Basic FAKE TOKEN`,
  },
});

export const chargePayment = async ({
  userId,
  amount,
}: RequestPayment): Promise<ResponsePayment | null> => {
  const url = `/monolith/api/charge-payment`;
  console.log('🚀 ~ monolith charge payment request started');
  console.log(`🚀 ~ request URL:${url}`);

  try {
    const res = await axios.post<string>(
      url,
      { userId, amount },
      axiosConfig()
    );

    const { data: dataResponse, status } = res;
    console.log(`🚀 ~ response data:${JSON.stringify(dataResponse, null, 2)}`);
    console.log('🚀 ~ monolith charge payment request ended');
    return { status, message: dataResponse };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error(
        `🚀 ~ error response:${JSON.stringify(err.response.data, null, 2)}`
      );

      const message = err.response.data as string;
      const status = err.response.status;
      return { status, message };
    }
  }

  return null;
};
