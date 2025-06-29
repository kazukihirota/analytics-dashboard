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
exports.DashboardRouter = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const types_1 = require("../types");
let DashboardRouter = class DashboardRouter {
    constructor(dashboardController) {
        this.dashboardController = dashboardController;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Type assertion for request handlers
        const handleRequest = (handler) => (req, res) => handler(req, res);
        this.router.get('/summary', handleRequest((req, res) => this.dashboardController.getSummaryMetrics(req, res)));
        this.router.get('/trends', handleRequest((req, res) => this.dashboardController.getTrendData(req, res)));
        this.router.get('/comparison', handleRequest((req, res) => this.dashboardController.getComparisonData(req, res)));
    }
    getRoutes() {
        return this.router;
    }
};
exports.DashboardRouter = DashboardRouter;
exports.DashboardRouter = DashboardRouter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DashboardController)),
    __metadata("design:paramtypes", [dashboard_controller_1.DashboardController])
], DashboardRouter);
