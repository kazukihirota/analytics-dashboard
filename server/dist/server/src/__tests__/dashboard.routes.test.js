"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
const dashboard_service_1 = require("../services/dashboard.service");
// Mock the DashboardService
jest.mock('../services/dashboard.service');
describe('Dashboard Routes', () => {
    let app;
    const mockApiKey = 'test-api-key';
    beforeAll(() => {
        // Set up test environment
        process.env.API_KEY = mockApiKey;
        // Create express app
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        (0, routes_1.addRoutes)(app);
    });
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });
    describe('Authentication', () => {
        it('should return 401 when no API key is provided', async () => {
            const response = await (0, supertest_1.default)(app).get('/api/dashboard/summary');
            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Authentication required');
        });
        it('should return 401 when invalid API key is provided', async () => {
            const response = await (0, supertest_1.default)(app)
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
            dashboard_service_1.DashboardService.prototype.getSummaryMetrics.mockResolvedValue(mockSummaryData);
        });
        it('should return summary metrics when authenticated', async () => {
            const response = await (0, supertest_1.default)(app)
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
            dashboard_service_1.DashboardService.prototype.getTrendData.mockResolvedValue(mockTrendData);
        });
        it('should return trend data when authenticated', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/dashboard/trends')
                .set('x-api-key', mockApiKey);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toEqual(mockTrendData);
        });
        it('should accept timeRange query parameter', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/dashboard/trends?timeRange=14d')
                .set('x-api-key', mockApiKey);
            expect(response.status).toBe(200);
            expect(dashboard_service_1.DashboardService.prototype.getTrendData).toHaveBeenCalledWith(expect.objectContaining({ timeRange: '14d' }));
        });
    });
    describe('GET /comparison/:dimension', () => {
        const mockComparisonData = {
            categories: ['Category A', 'Category B'],
            values: [100, 200],
            labels: ['Label A', 'Label B'],
        };
        beforeEach(() => {
            dashboard_service_1.DashboardService.prototype.getComparisonData.mockResolvedValue(mockComparisonData);
        });
        it('should return comparison data when authenticated', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/dashboard/comparison/studyType')
                .set('x-api-key', mockApiKey);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toEqual(mockComparisonData);
        });
        it('should return 400 for invalid dimension', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/dashboard/comparison/invalid')
                .set('x-api-key', mockApiKey);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Invalid dimension parameter');
        });
    });
});
