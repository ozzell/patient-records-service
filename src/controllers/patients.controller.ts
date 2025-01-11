import { NextFunction, Request, Response } from "express";
import {
  createPatient,
  getPatient,
  getPatients,
  removePatient,
  updatePatient,
} from "../services/patients.service";

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await getPatients());
  } catch (error) {
    next(error);
  }
}

export async function get(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await getPatient(req.params.id));
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(201).json(await createPatient(req.body));
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await updatePatient(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await removePatient(req.params.id));
  } catch (error) {
    next(error);
  }
}
