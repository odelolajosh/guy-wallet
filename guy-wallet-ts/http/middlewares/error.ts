import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "@/application/app-error";

export function handleError(err: Error, request: Request, response: Response, next: NextFunction) {
  console.error(err)
  if (err instanceof ApplicationError) {
    response.status(err.code).json({ message: err.message })
    return
  }

  response.status(500).json({ message: err.message ?? "Internal server error" })
}
