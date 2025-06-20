"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const inversify_1 = require("inversify");
const dashboard_service_1 = require("../services/dashboard.service");
const types_1 = require("../types");
const dashboard_1 = require("../../../shared/types/dashboard");
const http_status_codes_1 = require("http-status-codes");
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    formatResponse(data, success = true, error, message) {
        return {
            success,
            data,
            timestamp: new Date().toISOString(),
            ...(error && { error }),
            ...(message && { message }),
        };
    }
    handleError(error, res) {
        if (error instanceof ValidationError) {
            const response = this.formatResponse(null, false, error.name, error.message);
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
            return;
        }
        console.error('Unexpected error:', error);
        const response = this.formatResponse(null, false, 'InternalServerError', 'An unexpected error occurred');
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    async getSummaryMetrics(req, res) {
        try {
            const metrics = await this.dashboardService.getSummaryMetrics();
            const response = this.formatResponse(metrics);
            res.json(response);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
    async getTrendData(req, res) {
        try {
            const timeRange = req.query.timeRange;
            if (!timeRange || !Object.values(dashboard_1.TIME_RANGES).includes(timeRange)) {
                throw new ValidationError(`Invalid timeRange parameter. Must be one of: ${Object.values(dashboard_1.TIME_RANGES).join(', ')}`);
            }
            const trendData = await this.dashboardService.getTrendData(timeRange);
            const response = this.formatResponse(trendData);
            res.json(response);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
    async getComparisonData(req, res) {
        try {
            const dimension = req.query.dimension;
            if (!dimension ||
                !Object.values(dashboard_1.COMPARISON_DIMENSIONS).includes(dimension)) {
                throw new ValidationError(`Invalid dimension parameter. Must be one of: ${Object.values(dashboard_1.COMPARISON_DIMENSIONS).join(', ')}`);
            }
            const comparisonData = await this.dashboardService.getComparisonData(dimension);
            const response = this.formatResponse(comparisonData);
            res.json(response);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
};
exports.DashboardController = DashboardController;
exports.DashboardController = DashboardController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DashboardService)),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
