import express from 'express';
import cors from 'cors';

import { restaurantsRouter } from './src/restaurants/restaurants-router';
import { logServer } from './src/middleware/loggers';

// Environment configuration
const PORT = 3333;


// Express Initialization
const app = express();
app.use(cors());
app.use(express.json());

// API Endoints - Add more endpoints here in the future if necessary
app.get('/', (req, res) => res.send('Server is working'));
app.use('/api/restaurants', restaurantsRouter);


// Start Express server
app.listen(PORT, () => {
  logServer(`Restaurants API Server is running at https://localhost:${PORT}`);
});
