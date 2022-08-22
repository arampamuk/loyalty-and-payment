import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { handler, loyaltyHandler } from '.';
import { RequestPayment } from './types/request-payment';
import * as chargePaymentService from './services/charge-payment';
import * as databaseService from './services/database';

jest.mock('./services/charge-payment');
jest.mock('./services/database');

describe('Index Tests', () => {
  it('should export a handler function', () => {
    expect(handler).toBeInstanceOf(Function);
  });

  it('should return 200 when valid payment values provided', async () => {
    // Arrange
    const requestPayment = {
      userId: 'userId',
      amount: 100,
    } as RequestPayment;

    const event = {
      body: JSON.stringify(requestPayment),
    } as APIGatewayProxyEvent;

    const totalPoints = 3;
    const message = 'Payment successful';

    jest
      .spyOn(chargePaymentService, 'chargePayment')
      .mockImplementation(() => Promise.resolve({ message, status: 200 }));

    jest.spyOn(databaseService, 'addTransaction');

    jest
      .spyOn(databaseService, 'getUserTotalPoints')
      .mockImplementation(() => totalPoints);

    // Act
    const actual = await loyaltyHandler(event);

    // Assert
    expect(chargePaymentService.chargePayment).toHaveBeenCalledTimes(1);
    expect(databaseService.addTransaction).toHaveBeenCalledTimes(1);
    expect(actual).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        totalPoints,
        message,
      }),
    });
  });

  it.each([
    [404, 'User not found'],
    [400, 'Insufficient funds'],
  ])(
    'should not get any loyalty point when status is returned %s',
    async (status, message) => {
      // Arrange
      const requestPayment = {
        userId: 'userId',
        amount: 100,
      } as RequestPayment;

      const event = {
        body: JSON.stringify(requestPayment),
      } as APIGatewayProxyEvent;

      const totalPoints = 3;

      jest
        .spyOn(chargePaymentService, 'chargePayment')
        .mockImplementation(() => Promise.resolve({ message, status }));
      jest.spyOn(databaseService, 'addTransaction');
      jest.spyOn(databaseService, 'getUserTotalPoints');

      // Act
      const actual = await loyaltyHandler(event);

      // Assert
      expect(chargePaymentService.chargePayment).toHaveBeenCalledTimes(1);
      expect(databaseService.addTransaction).toHaveBeenCalledTimes(0);
      expect(actual).toEqual({
        statusCode: status,
        body: JSON.stringify({
          message,
        }),
      });
    }
  );
});
