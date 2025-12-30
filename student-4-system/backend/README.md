# Student 4 System Backend

Express backend service for student-4-system.

## Setup

```bash
npm install
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login (username: 赵六, password: 123456)

### Data
- GET `/api/data/summary` - Get summary statistics
- GET `/api/data/faults/distribution` - Get faults distribution
- GET `/api/data/parameters/stats` - Get parameter statistics

## Running

- Development: `npm run dev`
- Production: `npm run build && npm start`

Server runs on port 8004.