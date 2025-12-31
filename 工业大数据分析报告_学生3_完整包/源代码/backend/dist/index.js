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
const PORT = 8003;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize controllers
const dataController = new DataController_1.DataController();
const authController = new AuthController_1.AuthController();
// Routes
app.post('/api/auth/login', authController.login);
app.get('/api/data/summary', dataController.getSummary);
app.get('/api/data/faults/distribution', dataController.getFaultsDistribution);
app.get('/api/data/parameters/stats', dataController.getParameterStats);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map