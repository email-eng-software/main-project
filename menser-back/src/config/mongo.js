/* eslint-disable operator-linebreak */
import mongoose from 'mongoose';

import { InternalServerError } from '../errors/baseErrors.js';
import logger from './logger.js';

mongoose.Promise = global.Promise;

export default function mongoConfig() {
  return new Promise((resolve, reject) => {
    const mongoUri = process.env.MONGO_URI;

    mongoose.set('strictQuery', true);
    mongoose
      .connect(mongoUri)
      .then(() => {
        logger.info('✅ Established connection with mongodb');
        resolve(mongoose);
      })
      .catch((err) => {
        const error = new InternalServerError(
          `❌ Failed to connect to mongoDB. Error: ${err}.`,
        );
        reject(error);
      });

    mongoose.connection.on('error', (err) => {
      throw new InternalServerError(
        `❌ An error has occurred with the MongoDB connection: ${err}.`,
      );
    });
  });
}

export const { ObjectId } = mongoose.Types;
