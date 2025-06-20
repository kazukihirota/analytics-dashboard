"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = addRoutes;
const container_1 = require("../container");
const types_1 = require("../types");
const auth_middleware_1 = require("../middleware/auth.middleware");
function addRoutes(app) {
    const dashboardRouter = container_1.container.get(types_1.TYPES.DashboardRouter);
    app.use('/api/dashboard', auth_middleware_1.AuthMiddleware, dashboardRouter.getRoutes());
    return app;
}
