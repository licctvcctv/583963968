import { Request, Response } from 'express';
import { AuthRequest } from '../utils/auth';

export const login = (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;

  if (username === '李四' && password === '123456') {
    res.json({
      message: 'Login successful',
      username: username
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};