import express from 'express';
import cors from 'cors';
import { DataController } from './controllers/DataController';
import { AuthController } from './controllers/AuthController';

const app = express();
const port = 8004;

app.use(cors());
app.use(express.json());

const dataController = new DataController();
const authController = new AuthController();

// Authentication routes
app.post('/api/auth/login', authController.login.bind(authController));

// Data routes
app.get('/api/data/summary', dataController.getSummary.bind(dataController));
app.get('/api/data/faults/distribution', dataController.getFaultsDistribution.bind(dataController));
app.get('/api/data/parameters/stats', dataController.getParameterStats.bind(dataController));
app.get('/api/data/all', dataController.getAllData.bind(dataController));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});