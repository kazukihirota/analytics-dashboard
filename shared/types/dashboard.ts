// Time Range
export type TimeRange = '7d' | '14d' | '30d';

export const TIME_RANGES = {
  SEVEN_DAYS: '7d',
  FOURTEEN_DAYS: '14d',
  THIRTY_DAYS: '30d',
} as const;

// Region
export type Region =
  | 'all'
  | 'northAmerica'
  | 'europe'
  | 'asiaPacific'
  | 'latinAmerica'
  | 'middleEastAfrica'
  | 'oceania';

export const REGIONS = {
  ALL: 'all',
  NORTH_AMERICA: 'northAmerica',
  EUROPE: 'europe',
  ASIA_PACIFIC: 'asiaPacific',
  LATIN_AMERICA: 'latinAmerica',
  MIDDLE_EAST_AFRICA: 'middleEastAfrica',
  OCEANIA: 'oceania',
} as const;

// Trend Direction
export type TrendDirection = 'up' | 'down' | 'neutral';

export const TREND_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  NEUTRAL: 'neutral',
} as const;

// Comparison Dimension
export type ComparisonDimension = 'studyType' | 'ageGroup' | 'region';

export const COMPARISON_DIMENSIONS = {
  STUDY_TYPE: 'studyType',
  AGE_GROUP: 'ageGroup',
  REGION: 'region',
} as const;

// Demographic Dimension
export type DemographicDimension =
  | 'gender'
  | 'ageDistribution'
  | 'education'
  | 'employment';

export const DEMOGRAPHIC_DIMENSIONS = {
  GENDER: 'gender',
  AGE_DISTRIBUTION: 'ageDistribution',
  EDUCATION: 'education',
  EMPLOYMENT: 'employment',
} as const;

// Age Group
export type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';

export const AGE_GROUPS = [
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
] as const;

// Study Type
export type StudyType =
  | 'clinicalTrials'
  | 'surveys'
  | 'focusGroups'
  | 'longitudinalStudies'
  | 'interviews'
  | 'observationalStudies';

export const STUDY_TYPES = {
  CLINICAL_TRIALS: 'clinicalTrials',
  SURVEYS: 'surveys',
  FOCUS_GROUPS: 'focusGroups',
  LONGITUDINAL_STUDIES: 'longitudinalStudies',
  INTERVIEWS: 'interviews',
  OBSERVATIONAL_STUDIES: 'observationalStudies',
} as const;

// Trend Metric Name
export type TrendMetricName =
  | 'studyApplications'
  | 'studyCompletions'
  | 'newParticipants';

export const TREND_METRIC_NAMES = [
  'studyApplications',
  'studyCompletions',
  'newParticipants',
] as const;

// Summary Metrics Types

export type SummaryMetrics = {
  totalParticipants: number;
  activeParticipants: number;
  totalStudies: number;
  activeStudies: number;
  averageEligibilityRate: number;
  completionRate: number;
};

export type SummaryData = {
  [key in TimeRange]: {
    [key in Region]: {
      [key in StudyType]: SummaryMetrics;
    };
  };
};

// Trend Data Types

export type TrendData = {
  [key in TimeRange]: {
    [key in Region]: {
      [key in StudyType]: TrendDataByTimeRange;
    };
  };
};

export type TrendDataByTimeRange = {
  interval: string;
  metrics: TrendMetric[];
};

export type TrendMetric = {
  name: string;
  data: DailyTrendData[];
};

export type DailyTrendData = {
  date: string;
  value: number;
};

// Comparison Data Types

export type ComparisonData = {
  [key in TimeRange]: {
    [key in ComparisonDimension]: ComparisonDataByDimension;
  };
};

export type ComparisonDataByDimension = {
  dimension: ComparisonDimension;
  metrics: ComparisonMetric[];
};

export type ComparisonMetric = {
  name: string;
  applications: number;
  completions: number;
};

// Demographic Data Types

export type DemographicData = {
  [key in TimeRange]: {
    [key in Region]: {
      [key in StudyType]: {
        [key in DemographicDimension]: DemographicDataByDimension;
      };
    };
  };
};

export type DemographicDataByDimension = {
  dimension: DemographicDimension;
  metrics: DemographicMetric[];
};

export type DemographicMetric = {
  name: string;
  count: number;
  percentage: number;
};
