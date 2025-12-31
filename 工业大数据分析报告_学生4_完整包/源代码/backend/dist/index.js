"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DataController_1 = require("./controllers/DataController");
const AuthController_1 = require("./controllers/AuthController");
const app = (0, express_1.default)();
const port = 8004;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const dataController = new DataController_1.DataController();
const authController = new AuthController_1.AuthController();
// Authentication routes
app.post('/api/auth/login', authController.login.bind(authController));
// Data routes
app.get('/api/data/summary', dataController.getSummary.bind(dataController));
app.get('/api/data/faults/distribution', dataController.getFaultsDistribution.bind(dataController));
app.get('/api/data/parameters/stats', dataController.getParameterStats.bind(dataController));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
