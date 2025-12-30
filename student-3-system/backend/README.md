# Student-3-System Backend

A Express backend service for student-3-system with TypeScript.

## Features

- Authentication endpoint
- Data analysis endpoints for machine failure data
- CSV file processing
- RESTful API design

## Endpoints

### Authentication
- `POST /api/auth/login` - Login with username: 王五, password: 123456

### Data Analysis
- `GET /api/data/summary` - Get summary statistics
- `GET /api/data/faults/distribution` - Get faults distribution
- `GET /api/data/parameters/stats` - Get parameter statistics

## Usage

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

## Data Source

The backend processes data from `/data/ai4i2020.csv` file containing machine failure data.