"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const AuthMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const expectedApiKey = process.env.API_KEY;
    if (!apiKey) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            error: 'Authentication required',
            message: 'API key is missing',
        });
        return;
    }
    if (apiKey !== expectedApiKey) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            error: 'Authentication failed',
            message: 'Invalid API key',
        });
        return;
    }
    req.isAuthenticated = true;
    next();
};
exports.AuthMiddleware = AuthMiddleware;
