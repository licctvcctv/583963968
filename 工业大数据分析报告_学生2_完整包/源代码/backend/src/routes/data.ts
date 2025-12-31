import { Router } from 'express';
import { summary, faultsDistribution, parametersStats, typeDistribution, machineData } from '../controllers/dataController';

const router = Router();

// GET /api/data/summary
router.get('/summary', summary);

// GET /api/data/faults/distribution
router.get('/faults/distribution', faultsDistribution);

// GET /api/data/parameters/stats
router.get('/parameters/stats', parametersStats);

// GET /api/data/type/distribution
router.get('/type/distribution', typeDistribution);

// GET /api/data/machine-data
router.get('/machine-data', machineData);

export { router as dataRoutes };