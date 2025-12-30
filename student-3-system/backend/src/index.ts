import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { DataController } from './controllers/DataController';
import { AuthController } from './controllers/AuthController';

const app = express();
const PORT = 8003;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize controllers
const dataController = new DataController();
const authController = new AuthController();

// Routes
app.post('/api/auth/login', (req, res) => authController.login(req, res));
app.get('/api/data/summary', (req, res) => dataController.getSummary(req, res));
app.get('/api/data/faults/distribution', (req, res) => dataController.getFaultsDistribution(req, res));
app.get('/api/data/parameters/stats', (req, res) => dataController.getParameterStats(req, res));
app.get('/api/data/machine-data', (req, res) => dataController.getMachineData(req, res));
app.get('/api/data/equipment-health', (req, res) => dataController.getEquipmentHealth(req, res));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
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