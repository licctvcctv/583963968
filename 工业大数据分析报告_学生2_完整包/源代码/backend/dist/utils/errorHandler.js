"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map