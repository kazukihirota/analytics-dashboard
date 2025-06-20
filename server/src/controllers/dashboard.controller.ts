import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { DashboardService } from '../services/dashboard.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { TYPES } from '../types';
import { IResponse } from '../../../shared/types/response';
import { StatusCodes } from 'http-status-codes';
import {
  ValidationError,
  validateTimeRange,
  validateComparisonDimension,
  validateRegion,
  validateDemographicDimension,
  validateStudyType,
} from '../validators/paramValidator';

@injectable()
export class DashboardController {
  constructor(
    @inject(TYPES.DashboardService) private dashboardService: DashboardService
  ) {}

  private formatResponse<T>(
    data: T | null,
    success: boolean = true,
    error?: string,
    message?: string
  ): IResponse<T> {
    return {
      success,
      data,
      timestamp: new Date().toISOString(),
      ...(error && { error }),
      ...(message && { message }),
    };
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof ValidationError) {
      const response = this.formatResponse(
        null,
        false,
        error.name,
        error.message
      );
      res.status(StatusCodes.BAD_REQUEST).json(response);
      return;
    }

    console.error('Unexpected error:', error);
    const response = this.formatResponse(
      null,
      false,
      'InternalServerError',
      'An unexpected error occurred'
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }

  async getSummaryMetrics(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const timeRange = req.query.timeRange;
      validateTimeRange(timeRange);

      const region = req.query.region;
      validateRegion(region);

      const studyType = req.query.studyType;
      validateStudyType(studyType);

      const metrics = await this.dashboardService.getSummaryMetrics(
        timeRange,
        region,
        studyType
      );

      const response = this.formatResponse(metrics);
      res.json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getTrendData(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const timeRange = req.query.timeRange;
      validateTimeRange(timeRange);

      const region = req.query.region;
      validateRegion(region);

      const studyType = req.query.studyType;
      validateStudyType(studyType);

      const trendData = await this.dashboardService.getTrendData(
        timeRange,
        region,
        studyType
      );

      const response = this.formatResponse(trendData);
      res.json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getComparisonData(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const timeRange = req.query.timeRange;
      validateTimeRange(timeRange);

      const dimension = req.query.dimension;
      validateComparisonDimension(dimension);

      const comparisonData = await this.dashboardService.getComparisonData(
        timeRange,
        dimension
      );

      const response = this.formatResponse(comparisonData);
      res.json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getDemographicData(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const timeRange = req.query.timeRange;
      validateTimeRange(timeRange);

      const region = req.query.region;
      validateRegion(region);

      const studyType = req.query.studyType;
      validateStudyType(studyType);

      const dimension = req.query.dimension;
      validateDemographicDimension(dimension);

      const demographicData = await this.dashboardService.getDemographicData(
        timeRange,
        region,
        studyType,
        dimension
      );

      const response = this.formatResponse(demographicData);

      res.json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
