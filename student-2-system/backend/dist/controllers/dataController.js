"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametersStats = exports.faultsDistribution = exports.summary = void 0;
const dataModel_1 = require("../models/dataModel");
const dataModel = new dataModel_1.DataModel();
const summary = (req, res) => {
    try {
        const summary = dataModel.getSummary();
        res.json(summary);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get summary' });
    }
};
exports.summary = summary;
const faultsDistribution = (req, res) => {
    try {
        const distribution = dataModel.getFaultDistribution();
        res.json(distribution);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get fault distribution' });
    }
};
exports.faultsDistribution = faultsDistribution;
const parametersStats = (req, res) => {
    try {
        const stats = dataModel.getParameterStats();
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get parameter statistics' });
    }
};
exports.parametersStats = parametersStats;
//# sourceMappingURL=dataController.js.map