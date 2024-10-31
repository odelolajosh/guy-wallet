import { ApplicationError } from '@/application/app-error';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export class ValidationError extends ApplicationError {
  constructor(error: ZodError) {
    const message = error.errors.flatMap((e) => e.message).join(", ")
    super(message, 400)
  }
}

export const requireBody = (schema: z.ZodObject<any, any>) => (
  (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body)
    if (!result.success) {
      return next(new ValidationError(result.error))
    }

    request.body = result.data
    next()
  }
)

export const requireQuery = (schema: z.ZodObject<any, any>) => (
  (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.query)
    if (!result.success) {
      return next(new ValidationError(result.error))
    }

    request.query = result.data
    next()
  }
)
