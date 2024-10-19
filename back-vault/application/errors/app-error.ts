/**
 * Base error class for all application errors
 */
export class ApplicationError extends Error {
  readonly name = 'ApplicationError'

  constructor(message: string, public code: number) {
    super(message)
  }
}