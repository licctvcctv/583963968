import { Request, Response } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export interface MachineData {
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
    private data: MachineData[] = [];
    private dataLoaded = false;

    private async loadData() {
        if (this.dataLoaded) return;

        return new Promise<void>((resolve, reject) => {
            const csvPath = '/Users/a136/vs/583963968/student-3-system/data/ai4i2020.csv';

            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (data: MachineData) => {
                    this.data.push(data);
                })
                .on('end', () => {
                    this.dataLoaded = true;
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    private async ensureDataLoaded() {
        if (!this.dataLoaded) {
            await this.loadData();
        }
    }

    async getSummary(req: Request, res: Response) {
        try {
            await this.ensureDataLoaded();

            const totalRecords = this.data.length;
            const failureRecords = this.data.filter(d => d['Machine failure'] === '1').length;
            const successRecords = totalRecords - failureRecords;

            const summary = {
                totalRecords,
                failureRecords,
                successRecords,
                failureRate: ((failureRecords / totalRecords) * 100).toFixed(2) + '%',
                dataTypes: [...new Set(this.data.map(d => d.Type))],
                products: [...new Set(this.data.map(d => d['Product ID']))].length
            };

            res.json(summary);
        } catch (error) {
            console.error('Error getting summary:', error);
            res.status(500).json({ error: 'Failed to get summary' });
        }
    }

    async getFaultsDistribution(req: Request, res: Response) {
        try {
            await this.ensureDataLoaded();

            const faults = {
                TWF: this.data.filter(d => d.TWF === '1').length,
                HDF: this.data.filter(d => d.HDF === '1').length,
                PWF: this.data.filter(d => d.PWF === '1').length,
                OSF: this.data.filter(d => d.OSF === '1').length,
                RNF: this.data.filter(d => d.RNF === '1').length,
                NoFailure: this.data.filter(d => d['Machine failure'] === '0').length
            };

            res.json(faults);
        } catch (error) {
            console.error('Error getting faults distribution:', error);
            res.status(500).json({ error: 'Failed to get faults distribution' });
        }
    }

    async getParameterStats(req: Request, res: Response) {
        try {
            await this.ensureDataLoaded();

            const numericFields = [
                'Air temperature [K]',
                'Process temperature [K]',
                'Rotational speed [rpm]',
                'Torque [Nm]',
                'Tool wear [min]'
            ];

            const stats: Record<string, { min: number; max: number; avg: number; count: number }> = {};

            for (const field of numericFields) {
                const values = this.data.map(d => parseFloat(d[field as keyof MachineData])).filter(v => !isNaN(v));

                if (values.length > 0) {
                    stats[field] = {
                        min: Math.min(...values),
                        max: Math.max(...values),
                        avg: values.reduce((a, b) => a + b, 0) / values.length,
                        count: values.length
                    };
                }
            }

            res.json(stats);
        } catch (error) {
            console.error('Error getting parameter stats:', error);
            res.status(500).json({ error: 'Failed to get parameter stats' });
        }
    }

    async getMachineData(req: Request, res: Response) {
        try {
            await this.ensureDataLoaded();
            
            // 转换数据类型
            const formattedData = this.data.map(d => ({
                UDI: d.UDI,
                'Product ID': d['Product ID'],
                Type: d.Type,
                'Air temperature [K]': parseFloat(d['Air temperature [K]']),
                'Process temperature [K]': parseFloat(d['Process temperature [K]']),
                'Rotational speed [rpm]': parseInt(d['Rotational speed [rpm]']),
                'Torque [Nm]': parseFloat(d['Torque [Nm]']),
                'Tool wear [min]': parseInt(d['Tool wear [min]']),
                'Machine failure': parseInt(d['Machine failure']),
                TWF: parseInt(d.TWF),
                HDF: parseInt(d.HDF),
                PWF: parseInt(d.PWF),
                OSF: parseInt(d.OSF),
                RNF: parseInt(d.RNF),
                Maintenance_Cycle: d.Maintenance_Cycle,
                Load_Level: d.Load_Level
            }));
            
            res.json(formattedData);
        } catch (error) {
            console.error('Error getting machine data:', error);
            res.status(500).json({ error: 'Failed to get machine data' });
        }
    }

    async getEquipmentHealth(req: Request, res: Response) {
        try {
            await this.ensureDataLoaded();
            
            const totalRecords = this.data.length;
            const failureRecords = this.data.filter(d => d['Machine failure'] === '1').length;
            const normalRecords = totalRecords - failureRecords;
            
            // 按类型统计
            const typeStats = {
                L: this.data.filter(d => d.Type === 'L').length,
                M: this.data.filter(d => d.Type === 'M').length,
                H: this.data.filter(d => d.Type === 'H').length
            };
            
            // 故障类型统计
            const faultStats = {
                TWF: this.data.filter(d => d.TWF === '1').length,
                HDF: this.data.filter(d => d.HDF === '1').length,
                PWF: this.data.filter(d => d.PWF === '1').length,
                OSF: this.data.filter(d => d.OSF === '1').length,
                RNF: this.data.filter(d => d.RNF === '1').length
            };
            
            // 计算健康评分（基于故障率）
            const failureRate = (failureRecords / totalRecords) * 100;
            const healthScore = Math.round(100 - failureRate * 10);
            
            res.json({
                totalRecords,
                failureRecords,
                normalRecords,
                failureRate: failureRate.toFixed(2),
                healthScore,
                typeStats,
                faultStats,
                // 模拟设备状态分布
                statusDistribution: {
                    normal: Math.round(normalRecords * 0.6),
                    warning: Math.round(normalRecords * 0.3),
                    critical: failureRecords
                }
            });
        } catch (error) {
            console.error('Error getting equipment health:', error);
            res.status(500).json({ error: 'Failed to get equipment health' });
        }
    }
}