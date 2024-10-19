import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const requireBody = (schema: z.ZodObject<any, any>) => (
  (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body)
    if (!result.success) {
      return next(new Error(result.error.errors[0].message))
    }

    request.body = result.data
    next()
  }
)

export const requireQuery = (schema: z.ZodObject<any, any>) => (
  (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.query)
    if (!result.success) {
      return next(new Error(result.error.errors[0].message))
    }

    request.query = result.data
    next()
  }
)
