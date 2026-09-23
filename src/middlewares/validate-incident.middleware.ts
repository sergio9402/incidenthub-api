import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const validateIncidentMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

  if (!title || !description || !reporter || !location || !priority || estimatedMinutes === undefined) {
    throw new AppError(400, 'Missing required fields in body');
  }

  next();
};