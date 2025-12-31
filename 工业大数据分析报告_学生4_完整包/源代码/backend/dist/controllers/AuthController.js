"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    login(req, res) {
        const { username, password } = req.body;
        if (username === '赵六' && password === '123456') {
            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    username: '赵六'
                }
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    }
}
exports.AuthController = AuthController;
