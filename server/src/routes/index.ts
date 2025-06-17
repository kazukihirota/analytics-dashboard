import { Application, Router } from 'express';
import { DashboardRouter } from './dashboard.routes';
import { container } from '../container';
import { TYPES } from '../types';
import { AuthMiddleware } from '../middleware/auth.middleware';

export function addRoutes(app: Application): Application {
  const dashboardRouter: DashboardRouter = container.get<DashboardRouter>(
    TYPES.DashboardRouter
  );

  // Apply auth middleware to all dashboard routes
  app.use('/api/dashboard', AuthMiddleware, dashboardRouter.getRoutes());

  return app;
}
