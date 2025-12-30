import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

export interface MachineData {
  'UID': string;
  'product ID': string;
  'Type': string;
  'Air temperature [K]': number;
  'Process temperature [K]': number;
  'Rotational speed [rpm]': number;
  'Torque [Nm]': number;
  'Tool wear [min]': number;
  'Machine failure': number;
  'TWF': number;
  'HDF': number;
  'PWF': number;
  'OSF': number;
  'RNF': number;
}

export class DataModel {
  private data: MachineData[] = [];
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../../../data/ai4i2020.csv');
    this.loadData();
  }

  private loadData() {
    return new Promise<void>((resolve, reject) => {
      this.data = [];

      fs.createReadStream(this.dataPath)
        .pipe(csv())
        .on('data', (row: any) => {
          const dataRow: MachineData = {
            'UID': row.UID,
            'product ID': row['Product ID'],
            'Type': row.Type,
            'Air temperature [K]': parseFloat(row['Air temperature [K]']),
            'Process temperature [K]': parseFloat(row['Process temperature [K]']),
            'Rotational speed [rpm]': parseFloat(row['Rotational speed [rpm]']),
            'Torque [Nm]': parseFloat(row['Torque [Nm]']),
            'Tool wear [min]': parseFloat(row['Tool wear [min]']),
            'Machine failure': parseInt(row['Machine failure']),
            'TWF': parseInt(row.TWF),
            'HDF': parseInt(row.HDF),
            'PWF': parseInt(row.PWF),
            'OSF': parseInt(row.OSF),
            'RNF': parseInt(row.RNF)
          };
          this.data.push(dataRow);
        })
        .on('end', () => {
          console.log(`Loaded ${this.data.length} records`);
          resolve();
        })
        .on('error', reject);
    });
  }

  getData() {
    return this.data;
  }

  getSummary() {
    const total = this.data.length;
    const failures = this.data.filter(d => d['Machine failure'] === 1).length;
    const failureRate = (failures / total * 100).toFixed(2);

    const failureTypes = {
      TWF: this.data.filter(d => d.TWF === 1).length,
      HDF: this.data.filter(d => d.HDF === 1).length,
      PWF: this.data.filter(d => d.PWF === 1).length,
      OSF: this.data.filter(d => d.OSF === 1).length,
      RNF: this.data.filter(d => d.RNF === 1).length
    };

    return {
      total,
      failures,
      failureRate,
      failureTypes
    };
  }

  getFaultDistribution() {
    return this.getSummary().failureTypes;
  }

  getParameterStats() {
    const temperatures = this.data.map(d => d['Air temperature [K]']);
    const processTemps = this.data.map(d => d['Process temperature [K]']);
    const speeds = this.data.map(d => d['Rotational speed [rpm]']);
    const torques = this.data.map(d => d['Torque [Nm]']);
    const toolWear = this.data.map(d => d['Tool wear [min]']);

    const calculateStats = (values: number[]) => ({
      min: Math.min(...values),
      max: Math.max(...values),
      avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
    });

    return {
      airTemperature: calculateStats(temperatures),
      processTemperature: calculateStats(processTemps),
      rotationalSpeed: calculateStats(speeds),
      torque: calculateStats(torques),
      toolWear: calculateStats(toolWear)
    };
  }

  getTypeDistribution() {
    const typeL = this.data.filter(d => d.Type === 'L').length;
    const typeM = this.data.filter(d => d.Type === 'M').length;
    const typeH = this.data.filter(d => d.Type === 'H').length;
    return { L: typeL, M: typeM, H: typeH };
  }

  getMachineData() {
    return this.data;
  }
}