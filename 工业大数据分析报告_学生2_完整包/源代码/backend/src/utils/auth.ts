import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: { username: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (username === '李四' && password === '123456') {
    req.user = { username };
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};