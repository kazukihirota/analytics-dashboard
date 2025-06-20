"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_status_codes_1 = require("http-status-codes");
const routes_1 = require("./src/routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Only allow access from the specified origin
let corsOptions = {
    origin: process.env.CORS_ORIGIN,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
(0, routes_1.addRoutes)(app);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
