import fs from 'fs';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

export interface DataRecord {
  [key: string]: any;
}

export interface SummaryStats {
  totalRecords: number;
  uniqueDevices: number;
  failureTypes: Record<string, number>;
  avgTemperature: number;
  avgRPM: number;
  avgVibration: number;
  avgPower: number;
}

export interface FaultDistribution {
  type: string;
  count: number;
  percentage: number;
}

export interface ParameterStats {
  name: string;
  min: number;
  max: number;
  mean: number;
  median: number;
  std: number;
}

export interface HighRiskDevice {
  device: string;
  failureProbability: number;
  lastFailure: string;
  consecutiveFailures: number;
}

export const dataService = {
  loadData: async (): Promise<DataRecord[]> => {
    return new Promise((resolve, reject) => {
      const results: DataRecord[] = [];
      const filePath = '/Users/a136/vs/583963968/student-1-system/data/ai4i2020.csv';

      createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  },

  getSummary: async (): Promise<SummaryStats> => {
    const data = await this.loadData();

    const uniqueDevices = new Set(data.map((d: any) => d['UDI'])).size;

    const failureTypes: Record<string, number> = {};
    let totalTemp = 0, totalRPM = 0, totalVib = 0, totalPower = 0;
    let validTemp = 0, validRPM = 0, validVib = 0, validPower = 0;

    data.forEach((record: any) => {
      // Count failure types
      if (record['Type'] && !failureTypes[record['Type']]) {
        failureTypes[record['Type']] = 0;
      }
      if (record['Type']) {
        failureTypes[record['Type']]++;
      }

      // Sum numeric values
      const temp = parseFloat(record['Air temperature [K]']);
      const rpm = parseFloat(record['Rotational speed [rpm]']);
      const vib = parseFloat(record['Torque [Nm]']);
      const power = parseFloat(record['Tool wear [min]']);

      if (!isNaN(temp)) { totalTemp += temp; validTemp++; }
      if (!isNaN(rpm)) { totalRPM += rpm; validRPM++; }
      if (!isNaN(vib)) { totalVib += vib; validVib++; }
      if (!isNaN(power)) { totalPower += power; validPower++; }
    });

    return {
      totalRecords: data.length,
      uniqueDevices,
      failureTypes,
      avgTemperature: validTemp > 0 ? totalTemp / validTemp : 0,
      avgRPM: validRPM > 0 ? totalRPM / validRPM : 0,
      avgVibration: validVib > 0 ? totalVib / validVib : 0,
      avgPower: validPower > 0 ? totalPower / validPower : 0
    };
  },

  getFaultDistribution: async (): Promise<FaultDistribution[]> => {
    const data = await this.loadData();

    const typeCounts: Record<string, number> = {};
    let failureCount = 0;

    data.forEach((record: any) => {
      if (record['Type']) {
        typeCounts[record['Type']] = (typeCounts[record['Type']] || 0) + 1;
        failureCount++;
      }
    });

    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count,
      percentage: failureCount > 0 ? (count / failureCount) * 100 : 0
    }));
  },

  getParameterStats: async (): Promise<ParameterStats[]> => {
    const data = await this.loadData();

    const parameters = [
      { name: 'Air temperature [K]', key: 'Air temperature [K]' },
      { name: 'Rotational speed [rpm]', key: 'Rotational speed [rpm]' },
      { name: 'Torque [Nm]', key: 'Torque [Nm]' },
      { name: 'Tool wear [min]', key: 'Tool wear [min]' }
    ];

    return parameters.map(param => {
      const values = data
        .map((d: any) => parseFloat(d[param.key]))
        .filter(v => !isNaN(v))
        .sort((a, b) => a - b);

      if (values.length === 0) {
        return {
          name: param.name,
          min: 0,
          max: 0,
          mean: 0,
          median: 0,
          std: 0
        };
      }

      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const median = values.length % 2 === 0
        ? (values[values.length / 2 - 1] + values[values.length / 2]) / 2
        : values[Math.floor(values.length / 2)];

      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
      const std = Math.sqrt(variance);

      return {
        name: param.name,
        min: values[0],
        max: values[values.length - 1],
        mean,
        median,
        std
      };
    });
  },

  getHighRiskDevices: async (): Promise<HighRiskDevice[]> => {
    const data = await this.loadData();

    const deviceFailures: Record<string, { count: number; lastFailure: string; consecutive: number }> = {};

    data.forEach((record: any) => {
      const device = record['UDI'];
      if (!device) return;

      if (!deviceFailures[device]) {
        deviceFailures[device] = {
          count: 0,
          lastFailure: '',
          consecutive: 0
        };
      }

      if (record['Type'] && record['Type'] !== 'No Failure') {
        deviceFailures[device].count++;
        deviceFailures[device].lastFailure = record['UDI'];
        deviceFailures[device].consecutive++;
      } else {
        deviceFailures[device].consecutive = 0;
      }
    });

    return Object.entries(deviceFailures)
      .filter(([_, stats]) => stats.count > 0)
      .map(([device, stats]) => ({
        device,
        failureProbability: stats.count / 1000, // Simplified calculation
        lastFailure: stats.lastFailure,
        consecutiveFailures: stats.consecutive
      }))
      .sort((a, b) => b.failureProbability - a.failureProbability)
      .slice(0, 10);
  }
};