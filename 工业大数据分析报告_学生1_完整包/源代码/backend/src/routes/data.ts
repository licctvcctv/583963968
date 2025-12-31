import { Router, Request, Response } from 'express';
import { dataService,
  SummaryStats,
  FaultDistribution,
  ParameterStats,
  HighRiskDevice
} from '../services/dataService';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const router = Router();

// 返回所有机器数据
router.get('/machine-data', async (req: Request, res: Response) => {
  try {
    const results: any[] = [];
    const csvPath = path.join(__dirname, '../../data/ai4i2020.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ error: 'CSV file not found' });
    }
    
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (data) => {
        // 转换数字字段
        const row = {
          ...data,
          'UDI': parseInt(data['UDI']) || 0,
          'Air temperature [K]': parseFloat(data['Air temperature [K]']) || 0,
          'Process temperature [K]': parseFloat(data['Process temperature [K]']) || 0,
          'Rotational speed [rpm]': parseInt(data['Rotational speed [rpm]']) || 0,
          'Torque [Nm]': parseFloat(data['Torque [Nm]']) || 0,
          'Tool wear [min]': parseInt(data['Tool wear [min]']) || 0,
          'Machine failure': parseInt(data['Machine failure']) || 0,
          'TWF': parseInt(data['TWF']) || 0,
          'HDF': parseInt(data['HDF']) || 0,
          'PWF': parseInt(data['PWF']) || 0,
          'OSF': parseInt(data['OSF']) || 0,
          'RNF': parseInt(data['RNF']) || 0
        };
        results.push(row);
      })
      .on('end', () => {
        res.json(results);
      })
      .on('error', (error) => {
        res.status(500).json({ error: 'Failed to parse CSV' });
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch machine data' });
  }
});

router.get('/summary', async (req: Request, res: Response) => {
  try {
    const stats: SummaryStats = await dataService.getSummary();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary data' });
  }
});

router.get('/faults/distribution', async (req: Request, res: Response) => {
  try {
    const distribution: FaultDistribution[] = await dataService.getFaultDistribution();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fault distribution' });
  }
});

router.get('/parameters/stats', async (req: Request, res: Response) => {
  try {
    const stats: ParameterStats[] = await dataService.getParameterStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parameter statistics' });
  }
});

router.get('/devices/high-risk', async (req: Request, res: Response) => {
  try {
    const devices: HighRiskDevice[] = await dataService.getHighRiskDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch high-risk devices' });
  }
});

export default router;