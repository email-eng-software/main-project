/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import pretty from 'pino-pretty';
import IS_DEV_ENV from '../utils/general/isDevEnv.js';
import fileDirName from '../utils/general/fileDirName.js';

const { __dirname } = fileDirName(import.meta.url);
const destination = IS_DEV_ENV
  ? pretty({
      levelFirst: true,
      colorize: true,
      translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    })
  : pino.transport({
      target: 'pino/file',
      options: { destination: `${__dirname}/../../app.log` },
    });

const logger = pino(
  {
    base: { pid: false },
    level: process.env.PINO_LOG_LEVEL || 'info',
  },
  destination,
);

export default logger;
