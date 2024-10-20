import { Request, Response, NextFunction } from "../types/http";

/**
 * Decorates a route handler to ensure that any errors are caught and passed to the next middleware.
 */
export function routeHandler(
  _target: any,
  _propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (this: any, request: Request, response: Response, next: NextFunction) {
    Promise.resolve(originalMethod.call(this, request, response, next)).catch(next);
  };
}
