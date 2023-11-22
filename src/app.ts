import express, { Application } from 'express';
const authRouter = require('./routes/authRoutes');
const app: Application = express();

app.use(express.json());
// disable cross origin request by default
// const cors = require('cors');
// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use('/api/auth', authRouter);

export default app;