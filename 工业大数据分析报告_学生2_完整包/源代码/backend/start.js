const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

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
// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === '李四' && password === '123456') {
    res.json({
      message: 'Login successful',
      username: username
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Load data
let data = [];
const dataPath = path.join(__dirname, '../data/ai4i2020.csv');

fs.createReadStream(dataPath)
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log(`Loaded ${data.length} records`);
  });

// GET /api/data/summary
app.get('/api/data/summary', (req, res) => {
  if (data.length === 0) {
    return res.status(503).json({ error: 'Data not loaded yet' });
  }

  const total = data.length;
  const failures = data.filter(d => d['Machine failure'] === '1').length;
  const failureRate = (failures / total * 100).toFixed(2);

  const failureTypes = {
    TWF: data.filter(d => d.TWF === '1').length,
    HDF: data.filter(d => d.HDF === '1').length,
    PWF: data.filter(d => d.PWF === '1').length,
    OSF: data.filter(d => d.OSF === '1').length,
    RNF: data.filter(d => d.RNF === '1').length
  };

  res.json({
    total,
    failures,
    failureRate,
    failureTypes
  });
});

// GET /api/data/faults/distribution
app.get('/api/data/faults/distribution', (req, res) => {
  if (data.length === 0) {
    return res.status(503).json({ error: 'Data not loaded yet' });
  }

  const distribution = {
    TWF: data.filter(d => d.TWF === '1').length,
    HDF: data.filter(d => d.HDF === '1').length,
    PWF: data.filter(d => d.PWF === '1').length,
    OSF: data.filter(d => d.OSF === '1').length,
    RNF: data.filter(d => d.RNF === '1').length
  };

  res.json(distribution);
});

// GET /api/data/parameters/stats
app.get('/api/data/parameters/stats', (req, res) => {
  if (data.length === 0) {
    return res.status(503).json({ error: 'Data not loaded yet' });
  }

  const temperatures = data.map(d => parseFloat(d['Air temperature [K]']));
  const processTemps = data.map(d => parseFloat(d['Process temperature [K]']));
  const speeds = data.map(d => parseFloat(d['Rotational speed [rpm]']));
  const torques = data.map(d => parseFloat(d['Torque [Nm]']));
  const toolWear = data.map(d => parseFloat(d['Tool wear [min]']));

  const calculateStats = (values) => ({
    min: Math.min(...values),
    max: Math.max(...values),
    avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
  });

  res.json({
    airTemperature: calculateStats(temperatures),
    processTemperature: calculateStats(processTemps),
    rotationalSpeed: calculateStats(speeds),
    torque: calculateStats(torques),
    toolWear: calculateStats(toolWear)
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});