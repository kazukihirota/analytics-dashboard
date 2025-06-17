import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { DashboardService } from '../services/dashboard.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { TYPES } from '../types';
import {
  TimeRange,
  ComparisonDimension,
  COMPARISON_DIMENSIONS,
  TIME_RANGES,
} from '../types/dashboard.types';
import { StatusCodes } from 'http-status-codes';

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

@injectable()
export class DashboardController {
  constructor(
    @inject(TYPES.DashboardService) private dashboardService: DashboardService
  ) {}

  private handleError(error: unknown, res: Response): void {
    if (error instanceof ValidationError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: error.name,
        message: error.message,
      });
      return;
    }

    console.error('Unexpected error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'InternalServerError',
      message: 'An unexpected error occurred',
    });
  }

  async getSummaryMetrics(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const metrics = await this.dashboardService.getSummaryMetrics();
      res.json({
        success: true,
        data: metrics,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getTrendData(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const timeRange = req.query.timeRange as TimeRange;
      if (!timeRange || !Object.values(TIME_RANGES).includes(timeRange)) {
        throw new ValidationError(
          `Invalid timeRange parameter. Must be one of: ${Object.values(
            TIME_RANGES
          ).join(', ')}`
        );
      }

      const trendData = await this.dashboardService.getTrendData(timeRange);
      res.json({
        success: true,
        data: trendData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getComparisonData(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const dimension = req.query.dimension as ComparisonDimension;
      if (
        !dimension ||
        !Object.values(COMPARISON_DIMENSIONS).includes(dimension)
      ) {
        throw new ValidationError(
          `Invalid dimension parameter. Must be one of: ${Object.values(
            COMPARISON_DIMENSIONS
          ).join(', ')}`
        );
      }

      const comparisonData = await this.dashboardService.getComparisonData(
        dimension
      );
      res.json({
        success: true,
        data: comparisonData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
