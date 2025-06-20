import { injectable } from 'inversify';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  SummaryMetrics,
  SummaryData,
  TrendData,
  ComparisonData,
  TimeRange,
  ComparisonDimension,
  ComparisonDataByDimension,
  Region,
  StudyType,
  TrendDataByTimeRange,
  DemographicData,
  DemographicDimension,
  DemographicDataByDimension,
} from '../../../shared/types/dashboard';

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

  async getSummaryMetrics(
    timeRange: TimeRange,
    region: Region,
    studyType: StudyType
  ): Promise<SummaryMetrics> {
    const summary = await this.readJsonFile<SummaryData>('summary.json');

    return summary[timeRange][region][studyType];
  }

  async getTrendData(
    timeRange: TimeRange,
    region: Region,
    studyType: StudyType
  ): Promise<TrendDataByTimeRange> {
    const trends: TrendData = await this.readJsonFile<TrendData>('trends.json');

    return trends[timeRange][region][studyType];
  }

  async getComparisonData(
    timeRange: TimeRange,
    dimension: ComparisonDimension
  ): Promise<ComparisonDataByDimension> {
    const comparisons = await this.readJsonFile<ComparisonData>(
      'comparisons.json'
    );

    return comparisons[timeRange][dimension];
  }

  async getDemographicData(
    timeRange: TimeRange,
    region: Region,
    studyType: StudyType,
    dimension: DemographicDimension
  ): Promise<DemographicDataByDimension> {
    const demographics = await this.readJsonFile<DemographicData>(
      'demographics.json'
    );

    return demographics[timeRange][region][studyType][dimension];
  }
}
