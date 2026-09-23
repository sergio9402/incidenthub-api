import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const validateIdMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const numId = Number(id);

  if (!id || isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    throw new AppError(400, 'Invalid incident id');
  }

  next();
};