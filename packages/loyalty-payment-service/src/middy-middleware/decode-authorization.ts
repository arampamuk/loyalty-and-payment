import middy, { MiddlewareObj } from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { RequestPayment } from '../types/request-payment';

interface Parameters {
  isDebug?: boolean;
}

const middleware = ({
  isDebug = false,
}: Parameters): MiddlewareObj<APIGatewayProxyEvent, void> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent> = (request): void => {
    const debugPrefixMessage = '🚀 ~  decode-authorization';

    isDebug ? console.log(`${debugPrefixMessage} started`) : null;

    const { userId } = jwt.decode(request.event.headers['authorization']) as {
      userId: string;
    };

    isDebug
      ? console.log(
          `${debugPrefixMessage} JWT Token : ${request.event.headers['authorization']}\ndecoded userId: ${userId}`
        )
      : null;

    const requestPayment = JSON.parse(request.event.body) as RequestPayment;
    const newBodyValue = JSON.stringify({ ...requestPayment, userId });

    isDebug
      ? console.log(
          `${debugPrefixMessage} request body override: ${JSON.stringify(
            newBodyValue,
            null,
            2
          )}`
        )
      : null;

    request.event.body = newBodyValue;

    isDebug ? console.log(`${debugPrefixMessage} ended`) : null;
  };

  return {
    before,
  };
};

export default middleware;
