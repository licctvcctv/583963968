import { Request, Response } from 'express';
import { DataModel } from '../models/dataModel';

const dataModel = new DataModel();

export const summary = (req: Request, res: Response) => {
  try {
    const summary = dataModel.getSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get summary' });
  }
};

export const faultsDistribution = (req: Request, res: Response) => {
  try {
    const distribution = dataModel.getFaultDistribution();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get fault distribution' });
  }
};

export const parametersStats = (req: Request, res: Response) => {
  try {
    const stats = dataModel.getParameterStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get parameter statistics' });
  }
};

export const typeDistribution = (req: Request, res: Response) => {
  try {
    const distribution = dataModel.getTypeDistribution();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get type distribution' });
  }
};

export const machineData = (req: Request, res: Response) => {
  try {
    const data = dataModel.getMachineData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get machine data' });
  }
};