import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  requestInfo?: {
    timestamp: string;
    method: string;
    path: string;
  };
}

export const requestInfoMiddleware = (req: CustomRequest, _res: Response, next: NextFunction): void => {
  req.requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path
  };
  next();
};