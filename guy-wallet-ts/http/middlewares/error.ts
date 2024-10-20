import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "@/application/errors/app-error";

export function handleError(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof ApplicationError) {
    response.status(err.code).json({ message: err.message })
    return
  }

  response.status(500).json({ message: "Internal server error" })
}
