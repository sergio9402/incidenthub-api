import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export const validatePriorityMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const { priority } = req.body;

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    throw new AppError(400, `Invalid priority. Valid options: ${VALID_PRIORITIES.join(', ')}`);
  }

  next();
};