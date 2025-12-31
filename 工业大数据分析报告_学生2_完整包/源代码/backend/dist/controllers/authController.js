"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === '李四' && password === '123456') {
        res.json({
            message: 'Login successful',
            username: username
        });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map