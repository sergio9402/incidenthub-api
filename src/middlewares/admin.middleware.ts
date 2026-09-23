import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { AppError } from '../errors/app-error';

export const adminMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
  if (req.userRole !== 'ADMIN') {
    throw new AppError(403, 'Forbidden');
  }
  next();
};