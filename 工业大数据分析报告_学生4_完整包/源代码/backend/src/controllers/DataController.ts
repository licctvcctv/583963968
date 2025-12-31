import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';

interface RowData {
  UDI: string;
  'Product ID': string;
  Type: string;
  'Air temperature [K]': string;
  'Process temperature [K]': string;
  'Rotational speed [rpm]': string;
  'Torque [Nm]': string;
  'Tool wear [min]': string;
  'Machine failure': string;
  TWF: string;
  HDF: string;
  PWF: string;
  OSF: string;
  RNF: string;
  Maintenance_Cycle: string;
  Load_Level: string;
}

export class DataController {
  private data: RowData[] = [];

  constructor() {
    console.log('DataController initializing...');
    this.loadData().catch(console.error);
  }

  private async loadData(): Promise<void> {
    const csvPath = '/Users/a136/vs/583963968/student-4-system/data/ai4i2020.csv';

    return new Promise((resolve, reject) => {
      try {
        const stream = fs.createReadStream(csvPath);

        stream
          .pipe(csv())
          .on('data', (data) => {
            this.data.push(data as RowData);
          })
          .on('end', () => {
            console.log(`Loaded ${this.data.length} records`);
            resolve();
          })
          .on('error', (error) => {
            console.error('Error loading CSV:', error);
            reject(error);
          });
      } catch (error) {
        console.error('Error reading CSV file:', error);
        reject(error);
      }
    });
  }

  public getSummary(req: Request, res: Response): void {
    console.log('getSummary called, data array:', this.data);
    if (!this.data) {
      console.error('DataController.data is undefined');
      res.status(500).json({
        error: 'Server configuration error',
        message: 'Data controller not properly initialized'
      });
      return;
    }

    if (this.data.length === 0) {
      res.status(503).json({
        error: 'Data not loaded yet',
        message: 'Please try again in a few moments'
      });
      return;
    }

    const totalRecords = this.data.length;
    const failureRecords = this.data.filter(row => row && row['Machine failure'] === '1');
    const failureCount = failureRecords.length;
    const failureRate = totalRecords > 0 ? (failureCount / totalRecords * 100).toFixed(2) : '0';

    const productTypes = [...new Set(this.data.filter(row => row && row.Type).map(row => row.Type || 'Unknown'))];
    const loadLevels = [...new Set(this.data.filter(row => row && row.Load_Level).map(row => row.Load_Level || 'Unknown'))];

    res.json({
      totalRecords,
      failureCount,
      failureRate: `${failureRate}%`,
      productTypes,
      loadLevels
    });
  }

  public getFaultsDistribution(req: Request, res: Response): void {
    if (!this.data || this.data.length === 0) {
      res.status(503).json({
        error: 'Data not loaded yet',
        message: 'Please try again in a few moments'
      });
      return;
    }

    const failures = {
      TWF: 0,
      HDF: 0,
      PWF: 0,
      OSF: 0,
      RNF: 0,
      No_Failure: 0
    };

    this.data.forEach(row => {
      if (!row) return;
      if (row.TWF === '1') failures.TWF++;
      if (row.HDF === '1') failures.HDF++;
      if (row.PWF === '1') failures.PWF++;
      if (row.OSF === '1') failures.OSF++;
      if (row.RNF === '1') failures.RNF++;
      if (row['Machine failure'] === '0') failures.No_Failure++;
    });

    res.json(failures);
  }

  public getParameterStats(req: Request, res: Response): void {
    if (!this.data || this.data.length === 0) {
      res.status(503).json({
        error: 'Data not loaded yet',
        message: 'Please try again in a few moments'
      });
      return;
    }

    const airTemps = this.data
      .filter(row => row && row['Air temperature [K]'])
      .map(row => parseFloat(row['Air temperature [K]']))
      .filter(v => !isNaN(v));

    const processTemps = this.data
      .filter(row => row && row['Process temperature [K]'])
      .map(row => parseFloat(row['Process temperature [K]']))
      .filter(v => !isNaN(v));

    const rotationalSpeeds = this.data
      .filter(row => row && row['Rotational speed [rpm]'])
      .map(row => parseFloat(row['Rotational speed [rpm]']))
      .filter(v => !isNaN(v));

    const torques = this.data
      .filter(row => row && row['Torque [Nm]'])
      .map(row => parseFloat(row['Torque [Nm]']))
      .filter(v => !isNaN(v));

    const calculateStats = (values: number[]) => {
      if (values.length === 0) return null;
      const sorted = values.sort((a, b) => a - b);
      return {
        min: Math.min(...values),
        max: Math.max(...values),
        avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
        median: sorted.length % 2 === 0
          ? ((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2).toFixed(2)
          : sorted[Math.floor(sorted.length / 2)].toFixed(2)
      };
    };

    const stats = {
      'Air temperature [K]': calculateStats(airTemps),
      'Process temperature [K]': calculateStats(processTemps),
      'Rotational speed [rpm]': calculateStats(rotationalSpeeds),
      'Torque [Nm]': calculateStats(torques)
    };

    res.json(stats);
  }

  public getAllData(req: Request, res: Response): void {
    if (!this.data || this.data.length === 0) {
      res.status(503).json({
        error: 'Data not loaded yet',
        message: 'Please try again in a few moments'
      });
      return;
    }

    // 转换数据类型
    const formattedData = this.data.map(row => ({
      UDI: parseInt(row.UDI) || 0,
      'Product ID': row['Product ID'],
      Type: row.Type,
      'Air temperature [K]': parseFloat(row['Air temperature [K]']) || 0,
      'Process temperature [K]': parseFloat(row['Process temperature [K]']) || 0,
      'Rotational speed [rpm]': parseInt(row['Rotational speed [rpm]']) || 0,
      'Torque [Nm]': parseFloat(row['Torque [Nm]']) || 0,
      'Tool wear [min]': parseInt(row['Tool wear [min]']) || 0,
      'Machine failure': parseInt(row['Machine failure']) || 0,
      TWF: parseInt(row.TWF) || 0,
      HDF: parseInt(row.HDF) || 0,
      PWF: parseInt(row.PWF) || 0,
      OSF: parseInt(row.OSF) || 0,
      RNF: parseInt(row.RNF) || 0,
      Maintenance_Cycle: row.Maintenance_Cycle,
      Load_Level: row.Load_Level
    }));

    res.json(formattedData);
  }
}