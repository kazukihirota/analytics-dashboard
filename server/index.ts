import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { addRoutes } from './src/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Only allow access from the specified origin
let corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

addRoutes(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
