import { injectable } from 'inversify';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  SummaryMetrics,
  TrendData,
  ComparisonData,
  TimeRange,
  TrendDataByTimeRange,
  ComparisonDimension,
  ComparisonDataByDimension,
} from '../types/dashboard.types';

@injectable()
export class DashboardService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../../data');
  }

  private async readJsonFile<T>(filename: string): Promise<T> {
    const filePath = path.join(this.dataPath, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  }

  async getSummaryMetrics(): Promise<SummaryMetrics> {
    return this.readJsonFile<SummaryMetrics>('summary.json');
  }

  async getTrendData(timeRange: TimeRange): Promise<TrendDataByTimeRange> {
    const trends: TrendData = await this.readJsonFile<TrendData>('trends.json');

    return trends.timeRanges[timeRange];
  }

  async getComparisonData(
    dimension: ComparisonDimension
  ): Promise<ComparisonDataByDimension> {
    const comparisons = await this.readJsonFile<ComparisonData>(
      'comparisons.json'
    );

    return comparisons[dimension];
  }
}
