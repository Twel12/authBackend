import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

export default app;