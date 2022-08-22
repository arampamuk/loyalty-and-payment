import { Request, Response, Router } from 'express';
import { validateRequest } from '../http-utils/validate';
import { requestPaymentSchema } from '../http-utils/validation-schemes';
import { StatusCodes } from 'http-status-codes';
import { database } from './database';

const router = Router();

router.post(
  '/',
  /*eslint-disable */
  validateRequest(requestPaymentSchema, StatusCodes.BAD_REQUEST),
  /*eslint-enable */
  (request: Request, response: Response) => {
    const { userId, amount } = request.body;
    const userAccount = database.find(({ userId: id }) => id === userId);

    if (!userAccount) {
      response.status(StatusCodes.NOT_FOUND).send('User not found');
      return;
    }
    if (userAccount.totalAmount < amount) {
      response.status(StatusCodes.BAD_REQUEST).send('Insufficient funds');
      return;
    }

    userAccount.totalAmount -= amount;
    response.status(StatusCodes.OK).send('Payment successful');
  }
);

export default router;
