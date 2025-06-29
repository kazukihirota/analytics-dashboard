"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const dashboard_service_1 = require("./services/dashboard.service");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const dashboard_routes_1 = require("./routes/dashboard.routes");
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.DashboardService).to(dashboard_service_1.DashboardService);
container.bind(types_1.TYPES.DashboardController).to(dashboard_controller_1.DashboardController);
container.bind(types_1.TYPES.DashboardRouter).to(dashboard_routes_1.DashboardRouter);
