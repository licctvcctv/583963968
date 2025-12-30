"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
class DataController {
    constructor() {
        this.data = [];
        this.dataLoaded = false;
    }
    async loadData() {
        if (this.dataLoaded)
            return;
        return new Promise((resolve, reject) => {
            const csvPath = path_1.default.join(__dirname, '../../data/ai4i2020.csv');
            fs_1.default.createReadStream(csvPath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => {
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
    async ensureDataLoaded() {
        if (!this.dataLoaded) {
            await this.loadData();
        }
    }
    async getSummary(req, res) {
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
        }
        catch (error) {
            console.error('Error getting summary:', error);
            res.status(500).json({ error: 'Failed to get summary' });
        }
    }
    async getFaultsDistribution(req, res) {
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
        }
        catch (error) {
            console.error('Error getting faults distribution:', error);
            res.status(500).json({ error: 'Failed to get faults distribution' });
        }
    }
    async getParameterStats(req, res) {
        try {
            await this.ensureDataLoaded();
            const numericFields = [
                'Air temperature [K]',
                'Process temperature [K]',
                'Rotational speed [rpm]',
                'Torque [Nm]',
                'Tool wear [min]'
            ];
            const stats = {};
            for (const field of numericFields) {
                const values = this.data.map(d => parseFloat(d[field])).filter(v => !isNaN(v));
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
        }
        catch (error) {
            console.error('Error getting parameter stats:', error);
            res.status(500).json({ error: 'Failed to get parameter stats' });
        }
    }
}
exports.DataController = DataController;
//# sourceMappingURL=DataController.js.map