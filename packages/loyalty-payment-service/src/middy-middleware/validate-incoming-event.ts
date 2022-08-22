import middy, { MiddlewareObj } from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ValidationError } from 'yup';
import { requestPaymentSchema } from './validation-schemes';

interface Parameters {
  isDebug?: boolean;
}

const middleware = ({
  isDebug = false,
}: Parameters): MiddlewareObj<APIGatewayProxyEvent, void> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent> = async (
    request
  ): Promise<void> => {
    const debugPrefixMessage = '🚀 ~  validate-incoming-event';

    isDebug ? console.log(`${debugPrefixMessage} started`) : null;

    await requestPaymentSchema
      .validate(request.event.body)
      .then((event: any) => {
        event && isDebug
          ? console.log(`${debugPrefixMessage} validation successful`)
          : null;
      })
      .catch((err: ValidationError) => {
        throw new Error(err.errors[0]);
      });

    isDebug ? console.log(`${debugPrefixMessage} ended`) : null;
  };

  return {
    before,
  };
};

export default middleware;
