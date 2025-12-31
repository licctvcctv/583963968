"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../utils/auth");
const router = (0, express_1.Router)();
exports.authRoutes = router;
// POST /api/auth/login
router.post('/login', auth_1.authenticate, authController_1.login);
//# sourceMappingURL=auth.js.map