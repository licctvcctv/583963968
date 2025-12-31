import { Request, Response } from 'express';

export class AuthController {
    private readonly validCredentials = {
        username: '王五',
        password: '123456'
    };

    login(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        if (username === this.validCredentials.username && password === this.validCredentials.password) {
            res.json({
                success: true,
                message: 'Login successful',
                user: username
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    }
}