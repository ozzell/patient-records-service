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
    const id = parseInt(req.params.id, 10);
    res.status(200).json(await getPatient(id));
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
    const id = parseInt(req.params.id, 10);
    res.status(200).json(await updatePatient(id, req.body));
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
    const id = parseInt(req.params.id, 10);
    await removePatient(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
