import { Router } from 'express';
import { login } from '../controllers/authController';
import { authenticate } from '../utils/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', authenticate, login);

export { router as authRoutes };