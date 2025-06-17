export interface SummaryMetrics {
  totalParticipants: number;
  activeParticipants: number;
  totalStudies: number;
  activeStudies: number;
  averageEligibilityRate: number;
  completionRate: number;
}

export type TimeRange = '7d' | '14d' | '30d';

export const TIME_RANGES = {
  SEVEN_DAYS: '7d',
  FOURTEEN_DAYS: '14d',
  THIRTY_DAYS: '30d',
} as const;

export interface DailyTrendData {
  date: string;
  value: number;
}

export interface TrendMetric {
  name: string;
  data: DailyTrendData[];
}

export interface TrendDataByTimeRange {
  interval: string;
  metrics: TrendMetric[];
}

export interface TrendData {
  timeRanges: {
    [key in TimeRange]: TrendDataByTimeRange;
  };
}

export type ComparisonDimension = 'studyType' | 'ageGroup';

export const COMPARISON_DIMENSIONS = {
  STUDY_TYPE: 'studyType',
  AGE_GROUP: 'ageGroup',
} as const;

export interface ComparisonMetric {
  categories: string[];
  values: number[];
  labels: string[];
}

export interface ComparisonDataByDimension {
  dimension: ComparisonDimension;
  metrics: ComparisonMetric[];
}

export type ComparisonData = {
  [K in ComparisonDimension]: ComparisonDataByDimension;
};
