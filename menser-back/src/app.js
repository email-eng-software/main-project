import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import fileDirName from './utils/general/fileDirName.js';
import IS_DEV_ENV from './utils/general/isDevEnv.js';
import deleteFilesOnError from './middleware/deleteFilesOnError.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import corsOptions from './config/cors.js';

const app = express();
const { __dirname } = fileDirName(import.meta.url);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());

if (IS_DEV_ENV) app.use(morgan('dev'));
else app.set('trust proxy', 1); // trust first proxy

app.use(express.static(path.join(__dirname, '../../menser-front/build')));

// Server routes
app.use('/api', routes);
// import * as awsS3 from './config/awsS3.js';
// app.use('/api/buckets', async (req, res) => {
//   // await awsS3.createBucket(process.env.AWS_BUCKET_NAME);
//   const buckets = await awsS3.listBuckets();
//   res.status(200).json({ buckets });
// });

// Needs to be after the routes
app.use(deleteFilesOnError);
app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default app;
