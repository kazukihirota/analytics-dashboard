import { describe, it, expect, vi } from 'vitest';
import { dashboardApi } from './dashboardApi';
import type {
  SummaryMetrics,
  TrendDataByTimeRange,
  ComparisonDataByDimension,
  DemographicDataByDimension,
} from '../../../shared/types/dashboard';
import type { IResponse } from '../../../shared/types/response';
import type {
  SummaryParams,
  TrendsParams,
  ComparisonsParams,
  DemographicsParams,
} from './dashboardApi';

describe('dashboardApi', () => {
  describe('getSummaryData', () => {
    it('should fetch summary data successfully', async () => {
      const mockSummaryData: SummaryMetrics = {
        totalParticipants: 1000,
        activeParticipants: 750,
        totalStudies: 50,
        activeStudies: 35,
        averageEligibilityRate: 0.85,
        completionRate: 0.92,
      };

      const mockResponse: IResponse<SummaryMetrics> = {
        success: true,
        data: mockSummaryData,
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '7d' as const,
        region: 'northAmerica' as const,
        studyType: 'clinicalTrials' as const,
      } as SummaryParams;

      const result = await dashboardApi.getSummaryData(params);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/dashboard/summary?timeRange=7d&region=northAmerica&studyType=clinicalTrials',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-api-key': 'test-api-key',
          },
        }
      );

      expect(result).toEqual(mockSummaryData);
    });

    it('should throw error when API response is not ok', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      const params = {
        timeRange: '7d' as const,
        region: 'northAmerica' as const,
        studyType: 'clinicalTrials' as const,
      } as SummaryParams;

      await expect(dashboardApi.getSummaryData(params)).rejects.toThrow(
        'Failed to fetch dashboard data: Internal Server Error'
      );
    });

    it('should throw error when API response has no data', async () => {
      const mockResponse: IResponse<SummaryMetrics> = {
        success: false,
        data: null,
        timestamp: new Date().toISOString(),
        message: 'No data available',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '7d' as const,
        region: 'northAmerica' as const,
        studyType: 'clinicalTrials' as const,
      } as SummaryParams;

      await expect(dashboardApi.getSummaryData(params)).rejects.toThrow(
        'No data available'
      );
    });

    it('should throw generic error when API response has no data and no message', async () => {
      const mockResponse: IResponse<SummaryMetrics> = {
        success: false,
        data: null,
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '7d' as const,
        region: 'northAmerica' as const,
        studyType: 'clinicalTrials' as const,
      } as SummaryParams;

      await expect(dashboardApi.getSummaryData(params)).rejects.toThrow(
        'Failed to fetch dashboard data'
      );
    });
  });

  describe('getTrendsData', () => {
    it('should fetch trends data successfully', async () => {
      const mockTrendsData: TrendDataByTimeRange = {
        interval: 'daily',
        metrics: [
          {
            name: 'studyApplications',
            data: [
              { date: '2024-01-01', value: 10 },
              { date: '2024-01-02', value: 15 },
            ],
          },
        ],
      };

      const mockResponse: IResponse<TrendDataByTimeRange> = {
        success: true,
        data: mockTrendsData,
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '14d' as const,
        region: 'europe' as const,
        studyType: 'surveys' as const,
      } as TrendsParams;

      const result = await dashboardApi.getTrendsData(params);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/dashboard/trends?timeRange=14d&region=europe&studyType=surveys',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-api-key': 'test-api-key',
          },
        }
      );

      expect(result).toEqual(mockTrendsData);
    });

    it('should throw error when trends API response is not ok', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      const params = {
        timeRange: '14d' as const,
        region: 'europe' as const,
        studyType: 'surveys' as const,
      } as TrendsParams;

      await expect(dashboardApi.getTrendsData(params)).rejects.toThrow(
        'Failed to fetch trends data: Not Found'
      );
    });
  });

  describe('getComparisonsData', () => {
    it('should fetch comparisons data successfully', async () => {
      const mockComparisonsData: ComparisonDataByDimension = {
        dimension: 'studyType',
        metrics: [
          {
            name: 'clinicalTrials',
            applications: 100,
            completions: 85,
          },
          {
            name: 'surveys',
            applications: 200,
            completions: 180,
          },
        ],
      };

      const mockResponse: IResponse<ComparisonDataByDimension> = {
        success: true,
        data: mockComparisonsData,
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '30d' as const,
        dimension: 'studyType' as const,
      } as ComparisonsParams;

      const result = await dashboardApi.getComparisonsData(params);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/dashboard/comparison?timeRange=30d&dimension=studyType',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-api-key': 'test-api-key',
          },
        }
      );

      expect(result).toEqual(mockComparisonsData);
    });

    it('should throw error when comparisons API response is not ok', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
      });

      const params = {
        timeRange: '30d' as const,
        dimension: 'studyType' as const,
      } as ComparisonsParams;

      await expect(dashboardApi.getComparisonsData(params)).rejects.toThrow(
        'Failed to fetch comparisons data: Bad Request'
      );
    });
  });

  describe('getDemographicsData', () => {
    it('should fetch demographics data successfully', async () => {
      const mockDemographicsData: DemographicDataByDimension = {
        dimension: 'gender',
        metrics: [
          {
            name: 'Male',
            count: 500,
            percentage: 0.45,
          },
          {
            name: 'Female',
            count: 550,
            percentage: 0.55,
          },
        ],
      };

      const mockResponse: IResponse<DemographicDataByDimension> = {
        success: true,
        data: mockDemographicsData,
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '7d' as const,
        region: 'asiaPacific' as const,
        studyType: 'focusGroups' as const,
        dimension: 'gender' as const,
      } as DemographicsParams;

      const result = await dashboardApi.getDemographicsData(params);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/dashboard/demographics?dimension=gender&region=asiaPacific&timeRange=7d&studyType=focusGroups',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-api-key': 'test-api-key',
          },
        }
      );

      expect(result).toEqual(mockDemographicsData);
    });

    it('should throw error when demographics API response is not ok', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
      });

      const params = {
        timeRange: '7d' as const,
        region: 'asiaPacific' as const,
        studyType: 'focusGroups' as const,
        dimension: 'gender' as const,
      } as DemographicsParams;

      await expect(dashboardApi.getDemographicsData(params)).rejects.toThrow(
        'Failed to fetch demographics data: Unauthorized'
      );
    });
  });

  describe('API configuration', () => {
    it('should use default API URL when VITE_API_URL is not set', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('VITE_API_KEY', 'test-api-key');

      const mockResponse: IResponse<SummaryMetrics> = {
        success: true,
        data: {
          totalParticipants: 1000,
          activeParticipants: 750,
          totalStudies: 50,
          activeStudies: 35,
          averageEligibilityRate: 0.85,
          completionRate: 0.92,
        },
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '7d' as const,
        region: 'northAmerica' as const,
        studyType: 'clinicalTrials' as const,
      } as SummaryParams;

      await dashboardApi.getSummaryData(params);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('http://localhost:3001'),
        expect.any(Object)
      );

      // Restore environment variables
      vi.stubEnv('VITE_API_URL', 'http://localhost:3001');
    });

    it('should use default API key when VITE_API_KEY is not set', async () => {
      vi.unstubAllEnvs();
      vi.stubEnv('VITE_API_URL', 'http://localhost:3001');

      const mockResponse: IResponse<SummaryMetrics> = {
        success: true,
        data: {
          totalParticipants: 1000,
          activeParticipants: 750,
          totalStudies: 50,
          activeStudies: 35,
          averageEligibilityRate: 0.85,
          completionRate: 0.92,
        },
        timestamp: new Date().toISOString(),
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        timeRange: '7d' as const,
        region: 'northAmerica' as const,
        studyType: 'clinicalTrials' as const,
      } as SummaryParams;

      await dashboardApi.getSummaryData(params);

      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: {
          'Content-Type': 'application/json',
          'X-api-key': 'test-api-key',
        },
      });

      // Restore environment variables
      vi.stubEnv('VITE_API_KEY', 'test-api-key');
    });
  });
});
