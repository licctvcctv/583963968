import { Request, Response } from 'express';

export class AuthController {
  public login(req: Request, res: Response): void {
    const { username, password } = req.body;

    if (username === '赵六' && password === '123456') {
      res.json({
        success: true,
        message: 'Login successful',
        user: {
          username: '赵六'
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  }
}