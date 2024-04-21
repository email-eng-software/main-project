import express from 'express';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

export default app;
