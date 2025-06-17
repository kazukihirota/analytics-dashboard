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
        .get('/api/dashboard/summary')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockSummaryData);
    });
  });

  describe('GET /trends', () => {
    const mockTrendData = {
      dates: ['2024-01-01', '2024-01-02'],
      values: [100, 120],
      labels: ['Day 1', 'Day 2'],
    };

    beforeEach(() => {
      (DashboardService.prototype.getTrendData as jest.Mock).mockResolvedValue(
        mockTrendData
      );
    });

    it('should return trend data when authenticated', async () => {
      const response = await request(app)
        .get('/api/dashboard/trends')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTrendData);
    });

    it('should accept timeRange query parameter', async () => {
      const response = await request(app)
        .get('/api/dashboard/trends?timeRange=14d')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(DashboardService.prototype.getTrendData).toHaveBeenCalledWith(
        expect.objectContaining({ timeRange: '14d' })
      );
    });
  });

  describe('GET /comparison/:dimension', () => {
    const mockComparisonData = {
      categories: ['Category A', 'Category B'],
      values: [100, 200],
      labels: ['Label A', 'Label B'],
    };

    beforeEach(() => {
      (
        DashboardService.prototype.getComparisonData as jest.Mock
      ).mockResolvedValue(mockComparisonData);
    });

    it('should return comparison data when authenticated', async () => {
      const response = await request(app)
        .get('/api/dashboard/comparison/studyType')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockComparisonData);
    });

    it('should return 400 for invalid dimension', async () => {
      const response = await request(app)
        .get('/api/dashboard/comparison/invalid')
        .set('x-api-key', mockApiKey);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid dimension parameter');
    });
  });
});
