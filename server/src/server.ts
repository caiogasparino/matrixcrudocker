import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from './errors/AppError';
import 'express-async-errors';

import './database';

import routes from './routes';

const app = express();

app.use(
  cors({
    origin: process.env.APP_HOST,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  })
);
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
