import { Router, Request, Response } from 'express';
import { authService, LoginRequest, LoginResponse } from '../services/authService';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const loginData: LoginRequest = req.body;
    const result: LoginResponse = await authService.login(loginData);

    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;