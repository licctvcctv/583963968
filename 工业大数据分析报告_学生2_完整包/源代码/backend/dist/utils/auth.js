"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    if (username === '李四' && password === '123456') {
        req.user = { username };
        next();
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map