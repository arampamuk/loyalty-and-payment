import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import validateIncomingEvent from './middy-middleware/validate-incoming-event';
import decodeAuthorization from './middy-middleware/decode-authorization';
import { RequestPayment } from './types/request-payment';
import { chargePayment } from './services/charge-payment';
import { StatusCodes } from 'http-status-codes';
import { addTransaction, getUserTotalPoints } from './services/database';

const cashbackPercentage = 2;
export const loyaltyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { userId, amount } = JSON.parse(event.body) as RequestPayment;
  const { message, status } = await chargePayment({ userId, amount });

  if (status === StatusCodes.OK) {
    addTransaction({
      payment: amount,
      userId,
      points: (amount / 100) * cashbackPercentage,
      transactionDate: Date.now(),
    });

    const totalPoints = getUserTotalPoints(userId);

    return {
      statusCode: status,
      body: JSON.stringify({
        totalPoints,
        message,
      }),
    };
  } else {
    return {
      statusCode: status,
      body: JSON.stringify({
        message,
      }),
    };
  }
};

export const handler = middy(loyaltyHandler)
  .use(decodeAuthorization({ isDebug: true }))
  .use(validateIncomingEvent({ isDebug: true }));
