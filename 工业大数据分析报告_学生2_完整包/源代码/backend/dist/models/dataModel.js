"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModel = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
class DataModel {
    constructor() {
        this.data = [];
        this.dataPath = path.join(__dirname, '../../../data/ai4i2020.csv');
        this.loadData();
    }
    loadData() {
        return new Promise((resolve, reject) => {
            this.data = [];
            fs.createReadStream(this.dataPath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                const dataRow = {
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
        const calculateStats = (values) => ({
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
}
exports.DataModel = DataModel;
//# sourceMappingURL=dataModel.js.map