import express, {Application} from 'express';
import authRouter from './routes/authRoutes';
import cors from 'cors'

const app: Application = express();

app.use(express.json());
// enable cross origin request by default
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/api/auth', authRouter);

export default app;