import {
  TIME_RANGES,
  REGIONS,
  STUDY_TYPES,
  COMPARISON_DIMENSIONS,
  DEMOGRAPHIC_DIMENSIONS,
} from '../../../shared/types/dashboard';

export const DASHBOARD_CARDS = {
  PARTICIPATION_TRENDS: {
    title: 'Participation Trends',
    description: 'Research participation trends over time',
  },
  METRICS_BAR_CHART: {
    title: 'Comparison',
    description: 'Comparison of metrics across different dimensions',
  },
  DEMOGRAPHICS_PIE_CHART: {
    title: 'Demographics',
    description: 'Demographics of research participants by dimension',
  },
  KPI_CARDS: {
    title: 'Key Metrics',
    description: 'Overview of research participation metrics',
  },
} as const;

export const DASHBOARD_HEIGHTS = {
  KPI_CARD: 'h-16 sm:h-20 lg:h-22 xl:h-30',
} as const;

export const FILTER_VALUE_MAPPINGS = {
  timeRange: {
    [TIME_RANGES.SEVEN_DAYS]: 'Last 7 days',
    [TIME_RANGES.FOURTEEN_DAYS]: 'Last 14 days',
    [TIME_RANGES.THIRTY_DAYS]: 'Last 30 days',
  },
  region: {
    [REGIONS.ALL]: 'All Regions',
    [REGIONS.NORTH_AMERICA]: 'North America',
    [REGIONS.EUROPE]: 'Europe',
    [REGIONS.ASIA_PACIFIC]: 'Asia Pacific',
    [REGIONS.LATIN_AMERICA]: 'Latin America',
    [REGIONS.MIDDLE_EAST_AFRICA]: 'Middle East & Africa',
    [REGIONS.OCEANIA]: 'Oceania',
  },
  studyType: {
    [STUDY_TYPES.CLINICAL_TRIALS]: 'Clinical Trials',
    [STUDY_TYPES.SURVEYS]: 'Surveys',
    [STUDY_TYPES.FOCUS_GROUPS]: 'Focus Groups',
    [STUDY_TYPES.LONGITUDINAL_STUDIES]: 'Longitudinal Studies',
    [STUDY_TYPES.INTERVIEWS]: 'Interviews',
    [STUDY_TYPES.OBSERVATIONAL_STUDIES]: 'Observational Studies',
  },
  comparisonDimension: {
    [COMPARISON_DIMENSIONS.STUDY_TYPE]: 'Study Type',
    [COMPARISON_DIMENSIONS.AGE_GROUP]: 'Age Group',
    [COMPARISON_DIMENSIONS.REGION]: 'Region',
  },
  demographicDimension: {
    [DEMOGRAPHIC_DIMENSIONS.GENDER]: 'Gender',
    [DEMOGRAPHIC_DIMENSIONS.AGE_DISTRIBUTION]: 'Age Distribution',
    [DEMOGRAPHIC_DIMENSIONS.EDUCATION]: 'Education',
    [DEMOGRAPHIC_DIMENSIONS.EMPLOYMENT]: 'Employment',
  },
} as const;

export type DashboardCardKey = keyof typeof DASHBOARD_CARDS;
