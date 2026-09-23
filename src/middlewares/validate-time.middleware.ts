import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const validateTimeMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const { estimatedMinutes, priority } = req.body;

  if (estimatedMinutes !== undefined) {
    if (typeof estimatedMinutes !== 'number' || estimatedMinutes <= 0) {
      throw new AppError(400, 'estimatedMinutes must be a number greater than 0');
    }

    if (estimatedMinutes > 480) {
      throw new AppError(400, 'estimatedMinutes cannot exceed 480 minutes');
    }

    // Reto 4: Regla especial para incidentes críticos
    if (priority === 'CRITICAL' && estimatedMinutes > 60) {
      throw new AppError(400, 'Critical incidents cannot exceed 60 minutes');
    }
  }

  next();
};