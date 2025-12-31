"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor() {
        this.validCredentials = {
            username: '王五',
            password: '123456'
        };
    }
    login(req, res) {
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
//# sourceMappingURL=AuthController.js.map