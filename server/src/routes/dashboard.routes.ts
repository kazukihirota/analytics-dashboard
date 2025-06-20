import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { DashboardController } from '../controllers/dashboard.controller';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { TYPES } from '../types';

@injectable()
export class DashboardRouter {
  private router: Router;

  constructor(
    @inject(TYPES.DashboardController)
    private dashboardController: DashboardController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Type assertion for request handlers
    const handleRequest =
      (handler: (req: AuthenticatedRequest, res: Response) => Promise<void>) =>
      (req: Request, res: Response) =>
        handler(req as AuthenticatedRequest, res);

    this.router.get(
      '/summary',
      handleRequest((req, res) =>
        this.dashboardController.getSummaryMetrics(req, res)
      )
    );

    this.router.get(
      '/trends',
      handleRequest((req, res) =>
        this.dashboardController.getTrendData(req, res)
      )
    );

    this.router.get(
      '/comparison',
      handleRequest((req, res) =>
        this.dashboardController.getComparisonData(req, res)
      )
    );

    this.router.get(
      '/demographics',
      handleRequest((req, res) =>
        this.dashboardController.getDemographicData(req, res)
      )
    );
  }

  getRoutes() {
    return this.router;
  }
}
