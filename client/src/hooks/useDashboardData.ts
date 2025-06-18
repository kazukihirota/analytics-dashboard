import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/services/dashboardApi';
import {
  type TrendsParams,
  type ComparisonsParams,
  type DemographicsParams,
  type SummaryParams,
} from '@/services/dashboardApi';
import type {
  ComparisonDataByDimension,
  ComparisonDimension,
  DemographicDataByDimension,
  DemographicDimension,
  Region,
  SummaryMetrics,
  TimeRange,
  TrendDataByTimeRange,
  StudyType,
} from '../../../shared/types/dashboard';
import type { UseQueryResult } from '@tanstack/react-query';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  summary: (timeRange: TimeRange, region: Region, studyType: StudyType) =>
    [...dashboardKeys.all, 'summary', timeRange, region, studyType] as const,
  trends: (timeRange: TimeRange, region: Region, studyType: StudyType) =>
    [...dashboardKeys.all, 'trends', timeRange, region, studyType] as const,
  comparisons: (timeRange: TimeRange, dimension: ComparisonDimension) =>
    [...dashboardKeys.all, 'comparisons', timeRange, dimension] as const,
  demographics: (
    timeRange: TimeRange,
    region: Region,
    studyType: StudyType,
    dimension: DemographicDimension
  ) =>
    [
      ...dashboardKeys.all,
      'demographics',
      timeRange,
      region,
      studyType,
      dimension,
    ] as const,
};

const queryConfig = {
  refetchInterval: 5 * 60 * 1000, // Refetch the data every 5 minutes
  gcTime: 5 * 60 * 1000, // Keep the data in the cache for 5 minutes
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
};

export const useDashboardSummary = (
  params: SummaryParams
): UseQueryResult<SummaryMetrics, Error> => {
  return useQuery({
    queryKey: dashboardKeys.summary(
      params.timeRange,
      params.region,
      params.studyType
    ),
    queryFn: () => dashboardApi.getSummaryData(params),
    ...queryConfig,
  });
};

export const useDashboardTrends = (
  params: TrendsParams
): UseQueryResult<TrendDataByTimeRange, Error> => {
  return useQuery({
    queryKey: dashboardKeys.trends(
      params.timeRange,
      params.region,
      params.studyType
    ),
    queryFn: () => dashboardApi.getTrendsData(params),
    ...queryConfig,
  });
};

export const useDashboardComparisons = (
  params: ComparisonsParams
): UseQueryResult<ComparisonDataByDimension, Error> => {
  return useQuery({
    queryKey: dashboardKeys.comparisons(params.timeRange, params.dimension),
    queryFn: () => dashboardApi.getComparisonsData(params),
    ...queryConfig,
  });
};

export const useDashboardDemographics = (
  params: DemographicsParams
): UseQueryResult<DemographicDataByDimension, Error> => {
  return useQuery({
    queryKey: dashboardKeys.demographics(
      params.timeRange,
      params.region,
      params.studyType,
      params.dimension
    ),
    queryFn: () => dashboardApi.getDemographicsData(params),
    ...queryConfig,
  });
};
