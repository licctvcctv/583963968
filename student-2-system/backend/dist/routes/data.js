"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRoutes = void 0;
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
const router = (0, express_1.Router)();
exports.dataRoutes = router;
// GET /api/data/summary
router.get('/summary', dataController_1.summary);
// GET /api/data/faults/distribution
router.get('/faults/distribution', dataController_1.faultsDistribution);
// GET /api/data/parameters/stats
router.get('/parameters/stats', dataController_1.parametersStats);
//# sourceMappingURL=data.js.map