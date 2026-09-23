import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export interface AuthenticatedRequest extends Request {
  userRole?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  if (token === 'instructor-token') {
    req.userRole = 'ADMIN';
  } else if (token === 'technician-token') {
    req.userRole = 'TECHNICIAN';
  } else {
    throw new AppError(401, 'Unauthorized');
  }

  next();
};