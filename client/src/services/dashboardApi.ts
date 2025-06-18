import type {
  SummaryMetrics,
  TrendDataByTimeRange,
  ComparisonDataByDimension,
  DemographicDataByDimension,
  DemographicDimension,
  Region,
  TimeRange,
  ComparisonDimension,
  StudyType,
} from '../../../shared/types/dashboard';
import type { IResponse } from '../../../shared/types/response';

export interface SummaryParams {
  timeRange: TimeRange;
  region: Region;
  studyType: StudyType;
}

export interface TrendsParams {
  timeRange: TimeRange;
  region: Region;
  studyType: StudyType;
}

export interface ComparisonsParams {
  timeRange: TimeRange;
  dimension: ComparisonDimension;
}

export interface DemographicsParams {
  timeRange: TimeRange;
  region: Region;
  studyType: StudyType;
  dimension: DemographicDimension;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_KEY = import.meta.env.VITE_API_KEY || 'test-api-key'; // TODO: Remove this in production, this is only for demonstration purposes

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-api-key': API_KEY,
});

export const dashboardApi = {
  async getSummaryData(params: SummaryParams): Promise<SummaryMetrics> {
    const queryParams = new URLSearchParams();

    queryParams.append('timeRange', params.timeRange);
    queryParams.append('region', params.region);
    queryParams.append('studyType', params.studyType);

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/summary?${queryParams}`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    const apiResponse: IResponse<SummaryMetrics> = await response.json();
    if (!apiResponse.data) {
      throw new Error(apiResponse.message || 'Failed to fetch dashboard data');
    }

    return apiResponse.data;
  },

  async getTrendsData(params: TrendsParams) {
    const queryParams = new URLSearchParams();

    queryParams.append('timeRange', params.timeRange);
    queryParams.append('region', params.region);
    queryParams.append('studyType', params.studyType);

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/trends?${queryParams}`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch trends data: ${response.statusText}`);
    }

    const apiResponse: IResponse<TrendDataByTimeRange> = await response.json();

    if (!apiResponse.data) {
      throw new Error(apiResponse.message || 'Failed to fetch trends data');
    }

    return apiResponse.data;
  },

  async getComparisonsData(params: ComparisonsParams) {
    const queryParams = new URLSearchParams();

    queryParams.append('timeRange', params.timeRange);
    queryParams.append('dimension', params.dimension);

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/comparison?${queryParams}`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch comparisons data: ${response.statusText}`
      );
    }

    const apiResponse: IResponse<ComparisonDataByDimension> =
      await response.json();

    if (!apiResponse.data) {
      throw new Error(
        apiResponse.message || 'Failed to fetch comparisons data'
      );
    }

    return apiResponse.data;
  },

  async getDemographicsData(params: DemographicsParams) {
    const queryParams = new URLSearchParams();

    queryParams.append('dimension', params.dimension);
    queryParams.append('region', params.region);
    queryParams.append('timeRange', params.timeRange);
    queryParams.append('studyType', params.studyType);

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/demographics?${queryParams}`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch demographics data: ${response.statusText}`
      );
    }

    const apiResponse: IResponse<DemographicDataByDimension> =
      await response.json();

    if (!apiResponse.data) {
      throw new Error(
        apiResponse.message || 'Failed to fetch demographics data'
      );
    }

    return apiResponse.data;
  },
};
