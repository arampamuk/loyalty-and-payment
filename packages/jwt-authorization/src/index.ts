import { APIGatewayProxyResult } from 'aws-lambda';
import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken';

interface JWTEvent {
  authorizationToken: string;
  methodArn: string;
}

const generateAuthResponse = (
  principalId: string,
  effect: string,
  methodArn: string
) => {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument,
  };
};

const generatePolicyDocument = (effect: string, methodArn: string) => {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };

  return policyDocument;
};

/*eslint-disable */
export const handler = async (
  event: JWTEvent,
  context: any,
  callback: any
): Promise<APIGatewayProxyResult> => {
  await Promise.resolve(1);

  console.log('-----JWTEvent-----', event);

  const token = event.authorizationToken.replace('Bearer ', '');
  const methodArn = event.methodArn;

  if (!token || !methodArn) return callback(null, 'Unauthorized');

  const secret = Buffer.from(process.env.JWT_SECRET, 'base64');

  const verifyOptions: VerifyOptions = {
    algorithms: ['HS256'],
  };

  const decoded = jwt.verify(token, secret, verifyOptions) as JwtPayload;

  if (decoded && decoded.userId) {
    return callback(
      null,
      generateAuthResponse(decoded.userId, 'Allow', methodArn)
    );
  } else {
    return callback(
      null,
      generateAuthResponse(decoded.userId, 'Deny', methodArn)
    );
  }
};
/*eslint-enable */
