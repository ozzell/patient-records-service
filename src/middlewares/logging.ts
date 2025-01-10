// create simple logger
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../types/error";

export function errorLoggingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    res.status(404).send("Patient not found");
    return;
  }
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
}
