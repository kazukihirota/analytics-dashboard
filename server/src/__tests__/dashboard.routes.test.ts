import request from 'supertest';
import express from 'express';
import { addRoutes } from '../routes';
import { DashboardService } from '../services/dashboard.service';

// Mock the DashboardService
jest.mock('../services/dashboard.service');

describe('Dashboard Routes', () => {
  let app: express.Application;
  const mockApiKey = 'test-api-key';

  beforeAll(() => {
    // Set up test environment
    process.env.API_KEY = mockApiKey;

    // Create express app
    app = express();
    app.use(express.json());
    addRoutes(app);
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should return 401 when no API key is provided', async () => {
      const response = await request(app).get('/api/dashboard/summary');
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Authentication required');
    });

    it('should return 401 when invalid API key is provided', async () => {
      const response = await request(app)
        .get('/api/dashboard/summary')
        .set('x-api-key', 'invalid-key');
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Authentication failed');
    });
  });

  describe('GET /summary', () => {
    const mockSummaryData = {
      totalParticipants: 1000,
      activeParticipants: 800,
      totalStudies: 50,
      activeStudies: 30,
      averageEligibilityRate: 75.5,
      completionRate: 85.2,
    };

    beforeEach(() => {
      (
        DashboardService.prototype.getSummaryMetrics as jest.Mock
      ).mockResolvedValue(mockSummaryData);
    });

    it('should return summary metrics when authenticated', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/summary?timeRange=7d&region=all&studyType=clinicalTrials'
        )
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockSummaryData);
    });

    it('should return 400 when studyType is missing', async () => {
      const response = await request(app)
        .get('/api/dashboard/summary?timeRange=7d&region=all')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });
  });

  describe('GET /trends', () => {
    const mockTrendData = {
      interval: 'day',
      metrics: [
        {
          name: 'studyApplications',
          data: [
            { date: '2024-01-01', value: 100 },
            { date: '2024-01-02', value: 120 },
          ],
        },
      ],
    };

    beforeEach(() => {
      (DashboardService.prototype.getTrendData as jest.Mock).mockResolvedValue(
        mockTrendData
      );
    });

    it('should return trend data when authenticated', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/trends?timeRange=7d&region=all&studyType=clinicalTrials'
        )
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTrendData);
    });

    it('should accept timeRange query parameter', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/trends?timeRange=14d&region=all&studyType=clinicalTrials'
        )
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(DashboardService.prototype.getTrendData).toHaveBeenCalledWith(
        '14d',
        'all',
        'clinicalTrials'
      );
    });

    it('should return 400 when studyType is missing', async () => {
      const response = await request(app)
        .get('/api/dashboard/trends?timeRange=7d&region=all')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });
  });

  describe('GET /comparison', () => {
    const mockComparisonData = {
      dimension: 'studyType',
      metrics: [
        { name: 'clinicalTrials', applications: 100, completions: 80 },
        { name: 'surveys', applications: 200, completions: 150 },
      ],
    };

    beforeEach(() => {
      (
        DashboardService.prototype.getComparisonData as jest.Mock
      ).mockResolvedValue(mockComparisonData);
    });

    it('should return comparison data when authenticated', async () => {
      const response = await request(app)
        .get('/api/dashboard/comparison?timeRange=7d&dimension=studyType')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockComparisonData);
    });

    it('should return 400 for invalid dimension', async () => {
      const response = await request(app)
        .get('/api/dashboard/comparison?timeRange=7d&dimension=invalid')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
      expect(response.body.message).toMatch(/Invalid dimension parameter/);
    });
  });

  describe('GET /demographics', () => {
    const validRegion = 'europe';
    const validStudyType = 'clinicalTrials';

    const mockDemographicData = {
      dimension: 'gender',
      metrics: [
        { name: 'Male', count: 500, percentage: 50.0 },
        { name: 'Female', count: 500, percentage: 50.0 },
      ],
    };

    beforeEach(() => {
      (
        DashboardService.prototype.getDemographicData as jest.Mock
      ).mockResolvedValue(mockDemographicData);
    });

    it('should return demographic data when authenticated', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=gender&timeRange=7d&region=all&studyType=clinicalTrials'
        )
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockDemographicData);
    });

    it('should return 400 for invalid dimension', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=invalid&timeRange=7d&region=all&studyType=clinicalTrials'
        )
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
      expect(response.body.message).toMatch(/Invalid dimension parameter/);
    });

    it('should return 400 when studyType is missing', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=gender&timeRange=7d&region=all'
        )
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });

    it('should return 200 for valid region on /demographics', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=gender&timeRange=7d&region=' +
            encodeURIComponent(validRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('Region query parameter validation', () => {
    const validRegion = 'europe';
    const invalidRegion = 'Atlantis';
    const validStudyType = 'clinicalTrials';
    const mockSummaryData = { totalParticipants: 1000 };
    const mockTrendData = { interval: 'day', metrics: [] };
    const mockComparisonData = { comparison: [] };
    const mockDemographicData = { dimension: 'gender', metrics: [] };

    beforeEach(() => {
      (
        DashboardService.prototype.getSummaryMetrics as jest.Mock
      ).mockResolvedValue(mockSummaryData);
      (DashboardService.prototype.getTrendData as jest.Mock).mockResolvedValue(
        mockTrendData
      );
      (
        DashboardService.prototype.getComparisonData as jest.Mock
      ).mockResolvedValue(mockComparisonData);
      (
        DashboardService.prototype.getDemographicData as jest.Mock
      ).mockResolvedValue(mockDemographicData);
    });

    it('should return 200 for valid region on /summary', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/summary?timeRange=7d&region=' +
            encodeURIComponent(validRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return 400 for invalid region on /summary', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/summary?timeRange=7d&region=' +
            encodeURIComponent(invalidRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });

    it('should return 400 when region is not provided on /summary', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/summary?timeRange=7d&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });

    it('should return 200 for valid region on /trends', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/trends?timeRange=7d&region=' +
            encodeURIComponent(validRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return 400 for invalid region on /trends', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/trends?timeRange=7d&region=' +
            encodeURIComponent(invalidRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });

    it('should return 400 when region is not provided on /trends', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/trends?timeRange=7d&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });

    it('should return 200 for valid region on /demographics', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=gender&timeRange=7d&region=' +
            encodeURIComponent(validRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return 400 for invalid region on /demographics', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=gender&timeRange=7d&region=' +
            encodeURIComponent(invalidRegion) +
            '&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });

    it('should return 400 when region is not provided on /demographics', async () => {
      const response = await request(app)
        .get(
          '/api/dashboard/demographics?dimension=gender&timeRange=7d&studyType=' +
            encodeURIComponent(validStudyType)
        )
        .set('x-api-key', mockApiKey);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });
  });
});
