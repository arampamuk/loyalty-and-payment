import { NextFunction, Request, Response } from 'express';
import BaseSchema from 'yup/lib/schema';

export const validateRequest =
  (schema: BaseSchema, statusCode: number) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validate({
        ...request.body,
      });
      return next();
    } catch (err) {
      return response
        .status(statusCode)
        .json({ type: err.name, message: err.message });
    }
  };
