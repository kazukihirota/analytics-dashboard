import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface AuthenticatedRequest extends Request {
  isAuthenticated: boolean;
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers['x-api-key'] as string;
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Authentication required',
      message: 'API key is missing',
    });
    return;
  }

  if (apiKey !== expectedApiKey) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Authentication failed',
      message: 'Invalid API key',
    });
    return;
  }

  (req as AuthenticatedRequest).isAuthenticated = true;
  next();
};
