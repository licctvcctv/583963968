"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
class DataController {
    constructor() {
        this.data = [];
        console.log('DataController initializing...');
        this.loadData().catch(console.error);
    }
    async loadData() {
        const csvPath = '/Users/a136/vs/583963968/student-4-system/data/ai4i2020.csv';
        return new Promise((resolve, reject) => {
            try {
                const stream = fs_1.default.createReadStream(csvPath);
                stream
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (data) => {
                    this.data.push(data);
                })
                    .on('end', () => {
                    console.log(`Loaded ${this.data.length} records`);
                    resolve();
                })
                    .on('error', (error) => {
                    console.error('Error loading CSV:', error);
                    reject(error);
                });
            }
            catch (error) {
                console.error('Error reading CSV file:', error);
                reject(error);
            }
        });
    }
    getSummary(req, res) {
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
    getFaultsDistribution(req, res) {
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
            if (!row)
                return;
            if (row.TWF === '1')
                failures.TWF++;
            if (row.HDF === '1')
                failures.HDF++;
            if (row.PWF === '1')
                failures.PWF++;
            if (row.OSF === '1')
                failures.OSF++;
            if (row.RNF === '1')
                failures.RNF++;
            if (row['Machine failure'] === '0')
                failures.No_Failure++;
        });
        res.json(failures);
    }
    getParameterStats(req, res) {
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
        const calculateStats = (values) => {
            if (values.length === 0)
                return null;
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
}
exports.DataController = DataController;
