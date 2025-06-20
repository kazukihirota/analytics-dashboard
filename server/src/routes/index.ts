import { Application } from 'express';
import { DashboardRouter } from './dashboard.routes';
import { container } from '../container';
import { TYPES } from '../types';
import { AuthMiddleware } from '../middleware/auth.middleware';

export function addRoutes(app: Application): Application {
  const dashboardRouter: DashboardRouter = container.get<DashboardRouter>(
    TYPES.DashboardRouter
  );

  app.use('/api/dashboard', AuthMiddleware, dashboardRouter.getRoutes());

  return app;
}
