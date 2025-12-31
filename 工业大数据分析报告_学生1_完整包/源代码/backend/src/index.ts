import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import dataRoutes from './routes/data';

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;