import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fileDirName from './utils/general/fileDirName.js';
import IS_DEV_END from './utils/general/isDevEnv.js';

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());

if (IS_DEV_END) app.use(morgan('dev'));
else app.set('trust proxy', 1); // trust first proxy

const { __dirname } = fileDirName(import.meta.url);
app.use(express.static(path.join(__dirname, '../../client/dist')));

export default app;
