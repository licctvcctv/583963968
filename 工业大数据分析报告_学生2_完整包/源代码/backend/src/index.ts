import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authRoutes } from './routes/auth';
import { dataRoutes } from './routes/data';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = 8002;

app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;